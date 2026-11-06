import assert from 'node:assert/strict';
import { test } from 'node:test';
import { GAME_CONFIG } from '../src/helpers/gameConfig.ts';

test('difficulty sets the required collectible threshold for a bomb', () => {
    assert.deepEqual(GAME_CONFIG.bombEveryX, {
        easy: 3,
        medium: 2,
        hard: 1,
    });
});
