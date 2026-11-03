import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { useStore } from '../src/store/useStore.ts';

const player = { id: 1, name: 'Rams' };
const guilty = { id: 2, name: 'Sbobby' };
const clues = [{ id: 1, text: 'Indizio', suspected: [2], exclusivityLevel: 1 }];

beforeEach(() => useStore.getState().resetGame());

test('starting a game publishes a complete investigation in one update', () => {
    const updates = [];
    const unsubscribe = useStore.subscribe(state => updates.push(state));
    useStore.getState().startGame(player, guilty, clues);
    unsubscribe();

    assert.equal(updates.length, 1);
    assert.equal(updates[0].gameStep, 'start');
    assert.equal(updates[0].selectedPlayer, player);
    assert.equal(updates[0].guilty, guilty);
    assert.deepEqual(updates[0].clues, clues);
});

test('resetting clears the investigation, progress and open overlays', () => {
    useStore.getState().startGame(player, guilty, clues);
    useStore.getState().setClueIndex(1);
    useStore.getState().setMenuOpen(true);
    useStore.getState().setShowComponents(['clues']);
    useStore.getState().resetGame();

    const state = useStore.getState();
    assert.equal(state.gameStep, 'choose player');
    assert.equal(state.selectedPlayer, null);
    assert.equal(state.guilty, null);
    assert.equal(state.menuOpen, false);
    assert.equal(state.clueIndex, 0);
    assert.deepEqual(state.clues, []);
    assert.deepEqual(state.showComponents, []);
    assert.equal(typeof state.startGame, 'function');
});

test('starting another game resets old progress without mutating supplied clues', () => {
    useStore.getState().startGame(player, guilty, clues);
    useStore.getState().setClueIndex(1);
    useStore.getState().setMenuOpen(true);
    useStore.getState().setShowComponents(['clues']);
    useStore.getState().startGame(guilty, player, []);

    const state = useStore.getState();
    assert.equal(state.selectedPlayer, guilty);
    assert.equal(state.guilty, player);
    assert.equal(state.clueIndex, 0);
    assert.equal(state.menuOpen, false);
    assert.deepEqual(state.showComponents, []);
    assert.deepEqual(state.clues, []);
    assert.equal(clues.length, 1);
});
