import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';
import { useStore } from './store/useStore';

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}


export const PhaserGame = forwardRef<IRefPhaserGame, { paused: boolean }>(function PhaserGame({ paused }, ref)
{
    const game = useRef<Phaser.Game | null>(null);
    const [currentScene, setCurrentScene] = useState<Phaser.Scene | null>(null);
    const selectedPlayer = useStore(state => state.selectedPlayer);

    //valorizzo il ref del forward ref come un oggetto con dentro l'istanza del gioco e l'istanza della scena
    useImperativeHandle(ref, () => ({
        game: game.current,
        scene: currentScene,
    }), [currentScene]);


    useLayoutEffect(() => {
        const handleSceneReady = (scene: Phaser.Scene) => setCurrentScene(scene);
        EventBus.on('current-scene-ready', handleSceneReady);
        //al primo caricamento game.current prende il valore dell'istanza del gioco con tutte le impostazioni
        if (game.current === null && selectedPlayer) {
            game.current = StartGame("game-container", selectedPlayer);
        }
        return () => {
            EventBus.removeListener('current-scene-ready', handleSceneReady);
            game.current?.resume();
            game.current?.destroy(true);
            game.current = null;
        }
    }, [selectedPlayer]);

    useEffect(() => {
        if (!game.current || !currentScene) return;
        currentScene.input.keyboard?.resetKeys();
        if (paused) game.current.pause();
        else game.current.resume();
    }, [paused, currentScene]);

    return (
        <div id="game-container"></div>
    );

});
