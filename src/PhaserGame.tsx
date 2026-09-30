import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import StartGame from './game/main';
import { EventBus } from './game/EventBus';
import { useStore } from './store/useStore';

export interface IRefPhaserGame
{
    game: Phaser.Game | null;
    scene: Phaser.Scene | null;
}


export const PhaserGame = forwardRef<IRefPhaserGame>(function PhaserGame({}, ref)
{
    const game = useRef<Phaser.Game | null>(null!);
    const [currentScene, setCurrentScene] = useState<Phaser.Scene | null>(null);
    const {selectedPlayer} : any = useStore();

    //valorizzo il ref del forward ref come un oggetto con dentro l'istanza del gioco e l'istanza della scena
    useImperativeHandle(ref, () => ({
        game: game.current,
        scene: currentScene,
    }), [currentScene]);


    useLayoutEffect(() => {
        //al primo caricamento game.current prende il valore dell'istanza del gioco con tutte le impostazioni
        if (game.current === null) {
            game.current = StartGame("game-container");
        }
        return () => {
            game.current?.destroy(true);
            game.current = null;
        }
    }, []);

    useEffect(() => {
        //quando una scena è pronta: salvo la scena nello state (che a sua volta aggiorna il ref tramite useImperativeHandle)
        const handleSceneReady = (scene_instance: Phaser.Scene) => {
            setCurrentScene(scene_instance);
        };
        EventBus.on('current-scene-ready', handleSceneReady);
        return () => {
            EventBus.removeListener('current-scene-ready', handleSceneReady);
        }
    }, []);


    useEffect(() => {
        //quando seleziono un player, (ri)avvio la scena 'Game' passandole il personaggio selezionato tramite init()
        if (!game.current || !selectedPlayer) return;
            game.current.scene.start('Game', { selectedPlayerObject: selectedPlayer });
    }, [selectedPlayer]);

    return (
        <div id="game-container"></div>
    );

});
