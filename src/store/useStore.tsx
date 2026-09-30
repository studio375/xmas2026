import { Character, ClueVariable } from "@/helpers/gameData";
import { create } from "zustand";

export const useStore = create((set) => ({
   gameStep: 'choose player',
   setGameStep: (gameStep:any) => set({gameStep}),
   selectedPlayer: null,
   setSelectedPlayer: (selectedPlayer:Character) => set({selectedPlayer}),
   Clues: [],
   setClues: (clues:ClueVariable[]) => set({clues}),
   clueIndex: 0,
   setClueIndex: (clueIndex:number) => set({clueIndex}),
   floorStart: 0,
   setFloorStart: (floorStart:number) => set({floorStart})
}));