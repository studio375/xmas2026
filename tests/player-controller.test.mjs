import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const arcadePath = new URL('../node_modules/phaser/src/physics/arcade/', import.meta.url);
const getOverlapY = require(fileURLToPath(new URL('GetOverlapY.js', arcadePath)));
const { STATIC_BODY, DYNAMIC_BODY } = require(fileURLToPath(new URL('const.js', arcadePath)));
const config = { playerSpeed: 300, jumpVelocity: -600 };
const source = readFileSync(new URL('../src/game/entities/PlayerController.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
});
const exports = {};
runInNewContext(outputText, {
    exports,
    require: name => {
        if (name === 'phaser') return {};
        if (name === '@/helpers/gameConfig') return { GAME_CONFIG: config };
        if (name === '@/helpers/assets') return { ASSET_KEYS: {} };
        throw new Error(`Unexpected dependency: ${name}`);
    },
});

function body(physicsType, dy) {
    return {
        physicsType, _dy: dy, y: 90, bottom: 100,
        deltaAbsY: () => Math.abs(dy),
        checkCollision: { up: true, down: true },
        touching: { none: true, up: false, down: false },
        blocked: { none: true, up: false, down: false },
    };
}

function controller(playerBody, { jump = true, down = false } = {}) {
    const player = new exports.PlayerController({}, {});
    const released = { isDown: false };
    player.cursors = { left: released, right: released, up: { isDown: jump }, space: released, down: { isDown: down } };
    player.keyA = player.keyD = player.keyW = player.keyS = released;
    player.sprite = {
        body: playerBody,
        anims: { currentAnim: { key: 'turn' }, play() {} },
        velocityY: 100,
        setVelocityX() {},
        setVelocityY(value) { this.velocityY = value; },
    };
    return player;
}

test('overlapping a dynamic object sets touching but must not enable jumping or prevent descent', () => {
    const playerBody = body(DYNAMIC_BODY, 2);
    const collectibleBody = body(DYNAMIC_BODY, 0);
    getOverlapY(playerBody, collectibleBody, true, 4);
    assert.equal(playerBody.touching.down, true);
    assert.equal(playerBody.blocked.down, false);

    const player = controller(playerBody);
    player.update();
    assert.equal(player.sprite.velocityY, 100);

    const descending = controller(playerBody, { jump: false, down: true });
    descending.update();
    assert.equal(descending.sprite.velocityY, 500);
});

test('a solid static surface enables jumping and prevents fast descent', () => {
    const playerBody = body(DYNAMIC_BODY, 2);
    const surface = body(STATIC_BODY, 0);
    surface.y = 98;
    getOverlapY(playerBody, surface, false, 4);
    assert.equal(playerBody.blocked.down, true);
    const player = controller(playerBody);
    player.update();
    assert.equal(player.sprite.velocityY, config.jumpVelocity);

    const descending = controller(playerBody, { jump: false, down: true });
    descending.update();
    assert.equal(descending.sprite.velocityY, 100);
});

test('the lower world boundary enables jumping even without a touching flag', () => {
    const playerBody = body(DYNAMIC_BODY, 0);
    playerBody.blocked.down = true;
    const player = controller(playerBody);
    player.update();
    assert.equal(player.sprite.velocityY, config.jumpVelocity);
});
