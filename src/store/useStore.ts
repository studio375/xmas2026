import type { Character, ClueVariable } from "@/helpers/gameData";
import type { Difficulty } from "@/helpers/gameConfig";
import { create } from "zustand";

export type SuspectStatus = 'neutral' | 'excluded' | 'suspected';
type GameOverlay = 'clues' | 'suspected';
type GameStep = 'intro' | 'start' | 'chooseGuilty' | 'revealGuilty';

interface GameSession {
   gameStep: GameStep;
   showComponents: GameOverlay[];
   suspectStatuses: Partial<Record<number, SuspectStatus>>; //crea come un oggetto con chiavi numeriche e valori di tipo SuspectStatus. Es. { 1: 'neutral', 2: 'excluded' }
   menuOpen: boolean;
   selectedPlayer: Character | null;
   clues: ClueVariable[];
   clueIndex: number;
   guilty: Character | null;
   difficulty: Difficulty;
   selectedGuilty: Character | null;
}

interface GameState extends GameSession {
   setShowComponents: (components: GameOverlay[]) => void;
   setGameStep: (gameStep: GameStep) => void;
   setDifficulty: (difficulty: Difficulty) => void;
   cycleSuspect: (characterId: number) => void;
   setMenuOpen: (open: boolean) => void;
   setClueIndex: (index: number) => void;
   startGame: (player: Character, guilty: Character, clues: ClueVariable[]) => void;
   restartGame: () => void;
   resetGame: () => void;
   setSelectedGuilty: (character: Character | null) => void;
}

const initialState: GameSession = {
   gameStep: 'intro',
   showComponents: [],
   suspectStatuses: {},
   menuOpen: false,
   selectedPlayer: null,
   clues: [],
   clueIndex: 0,
   guilty: null,
   difficulty: 'medium',
   selectedGuilty: null,
};

export const useStore = create<GameState>((set) => ({
   ...initialState,
   setShowComponents: (showComponents) => set({showComponents}),
   setDifficulty: (difficulty) => set({difficulty}),
   setSelectedGuilty: (selectedGuilty) => set({selectedGuilty}),
   cycleSuspect: (characterId) => set(state => { //state è la variabile di set che sta è a disposizione per leggere lo stato corrente della variabile suspectStatuses
      const current = state.suspectStatuses[characterId] ?? 'neutral';
      const next: SuspectStatus = current === 'neutral' ? 'excluded' : current === 'excluded' ? 'suspected' : 'neutral';
      return {suspectStatuses: {...state.suspectStatuses, [characterId]: next}};
   }),
   setMenuOpen: (menuOpen) => set({menuOpen}),
   setClueIndex: (clueIndex) => set({clueIndex}),
   startGame: (selectedPlayer, guilty, clues) => set(state => ({
      ...initialState,
      gameStep: 'start',
      selectedPlayer,
      guilty,
      clues,
      difficulty: state.difficulty,
   })),
   resetGame: () => set(initialState),
   setGameStep: (gameStep) => set({gameStep}),
   restartGame: () => set(state => ({
      ...initialState,
      selectedPlayer: state.guilty,
      gameStep: 'revealGuilty',
   })),
}));