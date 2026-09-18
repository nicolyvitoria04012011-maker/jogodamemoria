import { GAME_THEMES } from '../data/themesAndAvatars';
import { GameCard, PlayerState, ThemeId } from '../types';

/**
 * Fisher-Yates array shuffle
 */
export function shuffleArray<T>(array: T[], randomFn = Math.random): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(randomFn() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Creates and shuffles a deck of pairs for the specified theme and pair count
 */
export function createDeck(themeId: ThemeId, pairCount: number = 8, randomFn = Math.random): GameCard[] {
  const theme = GAME_THEMES.find((t) => t.id === themeId) || GAME_THEMES[0];
  const items = theme.items.slice(0, Math.min(pairCount, theme.items.length));

  const cards: GameCard[] = [];

  items.forEach((item) => {
    // Card copy A
    cards.push({
      uniqueId: `${item.id}-a`,
      themeItemId: item.id,
      name: item.name,
      emoji: item.emoji,
      iconName: item.iconName,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
    // Card copy B
    cards.push({
      uniqueId: `${item.id}-b`,
      themeItemId: item.id,
      name: item.name,
      emoji: item.emoji,
      iconName: item.iconName,
      color: item.color,
      isFlipped: false,
      isMatched: false,
    });
  });

  return shuffleArray(cards, randomFn);
}

/**
 * Checks if two flipped cards form a valid matching pair
 */
export function checkPairMatch(cardA: GameCard, cardB: GameCard): boolean {
  if (!cardA || !cardB) return false;
  if (cardA.uniqueId === cardB.uniqueId) return false;
  return cardA.themeItemId === cardB.themeItemId;
}

/**
 * Calculates next player index based on whether a pair was found:
 * - If pair matched: player scores and PLAYS AGAIN (same index)
 * - If not matched: turn passes to next player ((current + 1) % total)
 */
export function getNextPlayerIndex(
  currentPlayerIndex: number,
  totalPlayers: number,
  didMatch: boolean
): number {
  if (totalPlayers <= 0) return 0;
  if (didMatch) {
    return currentPlayerIndex;
  }
  return (currentPlayerIndex + 1) % totalPlayers;
}

/**
 * Updates player scores after finding a pair
 */
export function recordPairFound(
  players: PlayerState[],
  playerIndex: number,
  currentRound: 1 | 2 | 3
): PlayerState[] {
  return players.map((player, idx) => {
    if (idx !== playerIndex) {
      return {
        ...player,
        currentStreak: 0,
      };
    }

    const roundIdx = currentRound - 1;
    const newRoundScores: [number, number, number] = [...player.roundScores];
    newRoundScores[roundIdx] = newRoundScores[roundIdx] + 1;

    return {
      ...player,
      roundScores: newRoundScores,
      totalScore: player.totalScore + 1,
      pairsFoundTotal: player.pairsFoundTotal + 1,
      currentStreak: player.currentStreak + 1,
    };
  });
}

/**
 * Checks if all cards on the board have been matched
 */
export function isRoundCompleted(cards: GameCard[]): boolean {
  if (cards.length === 0) return false;
  return cards.every((card) => card.isMatched);
}

/**
 * Finds the player(s) with the highest score in the specified round
 */
export function getRoundWinners(players: PlayerState[], currentRound: 1 | 2 | 3): PlayerState[] {
  if (players.length === 0) return [];
  const roundIdx = currentRound - 1;
  const maxScore = Math.max(...players.map((p) => p.roundScores[roundIdx]));
  return players.filter((p) => p.roundScores[roundIdx] === maxScore);
}

/**
 * Determines overall match winners and rankings after round 3
 */
export function calculateRankings(players: PlayerState[]): PlayerState[] {
  return [...players].sort((a, b) => {
    // Primary: Total score descending
    if (b.totalScore !== a.totalScore) {
      return b.totalScore - a.totalScore;
    }
    // Secondary tie-breaker: Total pairs found
    return b.pairsFoundTotal - a.pairsFoundTotal;
  });
}

/**
 * Gets overall winners (handles single winner or tie)
 */
export function getOverallWinners(players: PlayerState[]): PlayerState[] {
  if (players.length === 0) return [];
  const maxScore = Math.max(...players.map((p) => p.totalScore));
  return players.filter((p) => p.totalScore === maxScore);
}

/**
 * Advances the round or determines game over (exactly 3 rounds)
 */
export function evaluateRoundProgression(currentRound: 1 | 2 | 3): {
  nextRound: 1 | 2 | 3;
  isGameOver: boolean;
} {
  if (currentRound >= 3) {
    return {
      nextRound: 3,
      isGameOver: true,
    };
  }
  return {
    nextRound: (currentRound + 1) as 2 | 3,
    isGameOver: false,
  };
}
