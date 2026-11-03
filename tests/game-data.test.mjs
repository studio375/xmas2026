import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';
import ts from 'typescript';

const source = readFileSync(new URL('../src/helpers/gameData.tsx', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2017 },
});
const exports = {};
runInNewContext(outputText, { exports });
const { GAME_DATA } = exports;

test('every possible culprit has at least three distinct compatible clues', () => {
    for (const character of GAME_DATA.characters) {
        const compatible = GAME_DATA.clues.filter(clue => clue.suspected.includes(character.id));
        assert.ok(new Set(compatible.map(clue => clue.id)).size >= 3,
            `${character.name} must have at least three compatible clues`);
    }
});

test('Cri is included in all three placeholder clues', () => {
    const cri = GAME_DATA.characters.find(character => character.name === 'Cri');
    assert.ok(cri);
    for (const id of [5, 6, 7]) {
        assert.ok(GAME_DATA.clues.find(clue => clue.id === id)?.suspected.includes(cri.id),
            `Placeholder clue ${id} must include Cri`);
    }
});
