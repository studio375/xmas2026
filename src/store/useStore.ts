import type { Character, ClueVariable } from "@/helpers/gameData";
import { create } from "zustand";

export type SuspectStatus = 'neutral' | 'excluded' | 'suspected';
type GameOverlay = 'clues' | 'suspected';

interface GameSession {
   gameStep: 'choose player' | 'start';
   showComponents: GameOverlay[];
   suspectStatuses: Partial<Record<number, SuspectStatus>>;
   menuOpen: boolean;
   selectedPlayer: Character | null;
   clues: ClueVariable[];
   clueIndex: number;
   guilty: Character | null;
}

interface GameState extends GameSession {
   setShowComponents: (components: GameOverlay[]) => void;
   cycleSuspect: (characterId: number) => void;
   setMenuOpen: (open: boolean) => void;
   setClueIndex: (index: number) => void;
   startGame: (player: Character, guilty: Character, clues: ClueVariable[]) => void;
   resetGame: () => void;
}

const initialState: GameSession = {
   gameStep: 'choose player',
   showComponents: [],
   suspectStatuses: {},
   menuOpen: false,
   selectedPlayer: null,
   clues: [],
   clueIndex: 0,
   guilty: null,
};

export const useStore = create<GameState>((set) => ({
   ...initialState,
   setShowComponents: (showComponents) => set({showComponents}),
   cycleSuspect: (characterId) => set(state => {
      const current = state.suspectStatuses[characterId] ?? 'neutral';
      const next: SuspectStatus = current === 'neutral' ? 'excluded' : current === 'excluded' ? 'suspected' : 'neutral';
      return {suspectStatuses: {...state.suspectStatuses, [characterId]: next}};
   }),
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