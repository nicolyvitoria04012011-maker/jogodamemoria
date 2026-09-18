export type CatColorId = 
  | 'orange' 
  | 'black' 
  | 'white' 
  | 'pink' 
  | 'purple' 
  | 'blue' 
  | 'mint' 
  | 'caramel';

export interface CatAvatarDef {
  id: CatColorId;
  name: string;
  furColor: string;
  secondaryFur: string;
  innerEarColor: string;
  eyeColor: string;
  collarColor: string;
  accentBadge: string;
  stripeColor?: string;
  tagColor: string;
}

export type ThemeId = 'ocean' | 'forest' | 'sweets' | 'space' | 'nature' | 'city';

export interface ThemeCardItemDef {
  id: string;
  name: string;
  emoji: string;
  iconName: string;
  color: string;
}

export interface GameThemeDef {
  id: ThemeId;
  name: string;
  subtitle: string;
  description: string;
  emoji: string;
  primaryColor: string;
  accentColor: string;
  bgGradient: string;
  boardBg: string;
  cardBackGradient: string;
  cardBorder: string;
  particleType: 'bubbles' | 'leaves' | 'sprinkles' | 'stars' | 'petals' | 'sparks';
  items: ThemeCardItemDef[];
}

export interface PlayerConfig {
  id: string;
  name: string;
  avatarId: CatColorId;
}

export interface PlayerState extends PlayerConfig {
  roundScores: [number, number, number];
  totalScore: number;
  pairsFoundTotal: number;
  currentStreak: number;
}

export interface GameCard {
  uniqueId: string;
  themeItemId: string;
  name: string;
  emoji: string;
  iconName: string;
  color: string;
  isFlipped: boolean;
  isMatched: boolean;
  matchedByPlayerId?: string;
}

export type GamePhase = 'setup' | 'playing' | 'round_summary' | 'game_over';

export interface GameState {
  phase: GamePhase;
  players: PlayerState[];
  currentPlayerIndex: number;
  currentRound: 1 | 2 | 3;
  themeId: ThemeId;
  pairCount: number; // 6 pairs (12 cards) or 8 pairs (16 cards)
  cards: GameCard[];
  flippedCardIndices: number[];
  isLocked: boolean;
  messageBanner: string | null;
  roundWinnerId?: string | null;
  overallWinnerIds?: string[];
}
