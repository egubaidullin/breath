export type Language = 'en' | 'ru';

export interface UserProfile {
  name: string;
}

export interface SessionRecord {
  id: string;
  date: string; // ISO string
  rounds: number;
  holdDurations: number[]; // seconds, one per round
  longestHold: number; // seconds
}

export interface UserProgress {
  longestHoldOverall: number; // seconds
  totalSessionsCompleted: number;
  sessions: SessionRecord[];
}

export interface LocalizationStrings {
  [key: string]: string | LocalizationStrings;
}

export interface AllLocalizationStrings {
  en: LocalizationStrings;
  ru: LocalizationStrings;
}

export type BreathingPhase = 
  | 'idle'
  | 'configuring'
  | 'breathing'
  | 'holding'
  | 'recovery'
  | 'finished';

export interface SessionState {
  phase: BreathingPhase;
  currentRound: number;
  totalRounds: number;
  currentBreath: number;
  breathsPerRound: number;
  holdTime: number; // in seconds for current hold
  recoveryTime: number; // in seconds for current recovery
  currentSessionRecords: { holdDurations: number[] };
}
