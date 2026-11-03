import type { Character, ClueVariable } from "@/helpers/gameData";
import { create } from "zustand";

interface GameSession {
   gameStep: 'choose player' | 'start';
   showComponents: 'clues'[];
   menuOpen: boolean;
   selectedPlayer: Character | null;
   clues: ClueVariable[];
   clueIndex: number;
   guilty: Character | null;
}

interface GameState extends GameSession {
   setShowComponents: (components: 'clues'[]) => void;
   setMenuOpen: (open: boolean) => void;
   setClueIndex: (index: number) => void;
   startGame: (player: Character, guilty: Character, clues: ClueVariable[]) => void;
   resetGame: () => void;
}

const initialState: GameSession = {
   gameStep: 'choose player',
   showComponents: [],
   menuOpen: false,
   selectedPlayer: null,
   clues: [],
   clueIndex: 0,
   guilty: null,
};

export const useStore = create<GameState>((set) => ({
   ...initialState,
   setShowComponents: (showComponents) => set({showComponents}),
   setMenuOpen: (menuOpen) => set({menuOpen}),
   setClueIndex: (clueIndex) => set({clueIndex}),
   startGame: (selectedPlayer, guilty, clues) => set({
      ...initialState,
      gameStep: 'start',
      selectedPlayer,
      guilty,
      clues,
   }),
   resetGame: () => set(initialState),
}));