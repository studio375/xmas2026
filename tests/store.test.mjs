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
    assert.equal(state.gameStep, 'intro');
    assert.equal(state.selectedPlayer, null);
    assert.equal(state.guilty, null);
    assert.equal(state.menuOpen, false);
    assert.equal(state.clueIndex, 0);
    assert.deepEqual(state.clues, []);
    assert.deepEqual(state.showComponents, []);
    assert.equal(typeof state.startGame, 'function');
});

test('selected difficulty is kept when a game starts and resets to medium on restart', () => {
    useStore.getState().setDifficulty('hard');
    useStore.getState().startGame(player, guilty, clues);
    assert.equal(useStore.getState().difficulty, 'hard');

    useStore.getState().resetGame();
    assert.equal(useStore.getState().difficulty, 'medium');
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

test('suspect annotations cycle independently and survive closing the notebook', () => {
    useStore.getState().startGame(player, guilty, clues);
    useStore.getState().setShowComponents(['suspected']);
    useStore.getState().cycleSuspect(guilty.id);
    assert.equal(useStore.getState().suspectStatuses[guilty.id], 'excluded');
    const previous = useStore.getState().suspectStatuses;
    useStore.getState().cycleSuspect(3);
    assert.equal(previous[3], undefined);
    assert.equal(useStore.getState().suspectStatuses[3], 'excluded');
    useStore.getState().setShowComponents([]);
    useStore.getState().setShowComponents(['suspected']);
    assert.equal(useStore.getState().suspectStatuses[guilty.id], 'excluded');
    useStore.getState().cycleSuspect(guilty.id);
    assert.equal(useStore.getState().suspectStatuses[guilty.id], 'suspected');
    useStore.getState().cycleSuspect(guilty.id);
    assert.equal(useStore.getState().suspectStatuses[guilty.id], 'neutral');
    assert.equal(useStore.getState().suspectStatuses[3], 'excluded');
});

test('new games and restart clear suspect annotations', () => {
    useStore.getState().cycleSuspect(guilty.id);
    useStore.getState().resetGame();
    assert.deepEqual(useStore.getState().suspectStatuses, {});
    useStore.getState().cycleSuspect(guilty.id);
    useStore.getState().startGame(player, guilty, clues);
    assert.deepEqual(useStore.getState().suspectStatuses, {});
});
