import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/helpers/objectsPosition.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
});
const exports = {};
runInNewContext(outputText, {exports});
const map = exports.GAME_POSITIONS;
const imageWidth = path => readFileSync(new URL(`../public/assets/${path}`, import.meta.url)).readUInt32BE(16);
const worldWidth = map.floorTiles * imageWidth('platforms/terreno_03.png');
const platformWidths = {
    ground: imageWidth('platforms/platform_01.png'),
    ground2: imageWidth('platforms/platform_02.png'),
};
const cubeWidth = imageWidth('cubes/cube.png');

test('extended terrain is 8778 pixels wide and contains every platform and cube', () => {
    assert.equal(worldWidth, 8778);
    for (const platform of map.platforms) {
        assert.ok(platform.x >= 0 && platform.x + platformWidths[platform.key] <= worldWidth,
            `Platform at ${platform.x} exceeds the world bounds`);
    }
    for (const cube of map.cubes) {
        assert.ok(cube.x >= 0 && cube.x + cubeWidth <= worldWidth,
            `Cube at ${cube.x} exceeds the world bounds`);
    }
});

test('new map sections contain platforms and collectible cubes without duplicate positions', () => {
    const positions = map.cubes.map(cube => `${cube.x},${cube.y}`);
    assert.equal(new Set(positions).size, positions.length);
    for (const [left, right] of [[4389, 5800], [5800, 7350], [7350, 8778]]) {
        assert.ok(map.platforms.some(platform => platform.x >= left && platform.x < right));
        assert.ok(map.cubes.some(cube => cube.hasProp && cube.x >= left && cube.x < right));
    }
    assert.ok(map.cubes.filter(cube => cube.hasProp).length >= 24,
        'The map should provide enough props for eight groups of three');
});
