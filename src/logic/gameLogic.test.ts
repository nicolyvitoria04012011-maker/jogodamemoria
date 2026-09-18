import { describe, expect, it } from 'vitest';
import { GameCard, PlayerState } from '../types';
import {
  calculateRankings,
  checkPairMatch,
  createDeck,
  evaluateRoundProgression,
  getNextPlayerIndex,
  getOverallWinners,
  getRoundWinners,
  isRoundCompleted,
  recordPairFound,
} from './gameLogic';

describe('Game Logic - Memory Game Rules & Specifications', () => {
  // Mock player data for testing
  const createMockPlayers = (): PlayerState[] => [
    {
      id: 'p1',
      name: 'Miau Laranja',
      avatarId: 'orange',
      roundScores: [0, 0, 0],
      totalScore: 0,
      pairsFoundTotal: 0,
      currentStreak: 0,
    },
    {
      id: 'p2',
      name: 'Miau Sombra',
      avatarId: 'black',
      roundScores: [0, 0, 0],
      totalScore: 0,
      pairsFoundTotal: 0,
      currentStreak: 0,
    },
    {
      id: 'p3',
      name: 'Miau Algodão',
      avatarId: 'pink',
      roundScores: [0, 0, 0],
      totalScore: 0,
      pairsFoundTotal: 0,
      currentStreak: 0,
    },
  ];

  describe('1. Verificação de Pares (checkPairMatch)', () => {
    it('deve confirmar que cartas com mesmo themeItemId e uniqueIds diferentes formam um par', () => {
      const cardA: GameCard = {
        uniqueId: 'ocean-1-a',
        themeItemId: 'ocean-1',
        name: 'Golfinho Saltador',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };
      const cardB: GameCard = {
        uniqueId: 'ocean-1-b',
        themeItemId: 'ocean-1',
        name: 'Golfinho Saltador',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };

      expect(checkPairMatch(cardA, cardB)).toBe(true);
    });

    it('deve rejeitar cartas com themeItemIds distintos', () => {
      const cardA: GameCard = {
        uniqueId: 'ocean-1-a',
        themeItemId: 'ocean-1',
        name: 'Golfinho Saltador',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };
      const cardB: GameCard = {
        uniqueId: 'ocean-2-a',
        themeItemId: 'ocean-2',
        name: 'Tubarão Valente',
        emoji: '🦈',
        iconName: 'Fish',
        color: '#94a3b8',
        isFlipped: true,
        isMatched: false,
      };

      expect(checkPairMatch(cardA, cardB)).toBe(false);
    });

    it('deve rejeitar se a mesma carta for comparada com ela mesma', () => {
      const cardA: GameCard = {
        uniqueId: 'ocean-1-a',
        themeItemId: 'ocean-1',
        name: 'Golfinho Saltador',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };

      expect(checkPairMatch(cardA, cardA)).toBe(false);
    });
  });

  describe('2. Alternância de Turnos (getNextPlayerIndex)', () => {
    it('quando o jogador acerta um par (didMatch = true), ele deve continuar jogando (mesmo índice)', () => {
      const totalPlayers = 3;
      const currentPlayerIndex = 1;
      const nextIndex = getNextPlayerIndex(currentPlayerIndex, totalPlayers, true);

      expect(nextIndex).toBe(1);
    });

    it('quando o jogador erra o par (didMatch = false), o turno passa para o próximo jogador', () => {
      const totalPlayers = 3;
      const currentPlayerIndex = 0;
      const nextIndex = getNextPlayerIndex(currentPlayerIndex, totalPlayers, false);

      expect(nextIndex).toBe(1);
    });

    it('ao atingir o último jogador e errar, deve rotacionar de volta para o jogador 0 (ciclo de 2 a 4 jogadores)', () => {
      const totalPlayers = 4;
      const currentPlayerIndex = 3;
      const nextIndex = getNextPlayerIndex(currentPlayerIndex, totalPlayers, false);

      expect(nextIndex).toBe(0);
    });

    it('para 2 jogadores, alterna corretamente entre 0 e 1 em caso de erro', () => {
      expect(getNextPlayerIndex(0, 2, false)).toBe(1);
      expect(getNextPlayerIndex(1, 2, false)).toBe(0);
    });
  });

  describe('3. Cálculo de Pontuação e Sequência (recordPairFound)', () => {
    it('deve somar 1 ponto na rodada atual e no totalScore do jogador que acertou', () => {
      const players = createMockPlayers();
      const currentRound = 1;
      const updated = recordPairFound(players, 0, currentRound);

      expect(updated[0].roundScores[0]).toBe(1);
      expect(updated[0].roundScores[1]).toBe(0);
      expect(updated[0].roundScores[2]).toBe(0);
      expect(updated[0].totalScore).toBe(1);
      expect(updated[0].pairsFoundTotal).toBe(1);
      expect(updated[0].currentStreak).toBe(1);

      // Os outros jogadores permanecem com pontuação inalterada
      expect(updated[1].totalScore).toBe(0);
      expect(updated[2].totalScore).toBe(0);
    });

    it('deve registrar pontuação na rodada 2 e rodada 3 nos índices corretos', () => {
      let players = createMockPlayers();
      // Rodada 2: jogador 1 acerta 2 pares
      players = recordPairFound(players, 1, 2);
      players = recordPairFound(players, 1, 2);

      expect(players[1].roundScores[1]).toBe(2);
      expect(players[1].totalScore).toBe(2);
      expect(players[1].currentStreak).toBe(2);

      // Rodada 3: jogador 1 acerta mais 1 par
      players = recordPairFound(players, 1, 3);
      expect(players[1].roundScores[2]).toBe(1);
      expect(players[1].totalScore).toBe(3);
    });
  });

  describe('4. Criação do Baralho e Fim de Rodada (createDeck & isRoundCompleted)', () => {
    it('deve gerar a quantidade correta de cartas emparelhadas (ex: 8 pares = 16 cartas)', () => {
      const deck = createDeck('ocean', 8);
      expect(deck.length).toBe(16);

      // Cada tema deve ter exatamente duas cópias de cada item
      const itemCounts: Record<string, number> = {};
      deck.forEach((card) => {
        itemCounts[card.themeItemId] = (itemCounts[card.themeItemId] || 0) + 1;
      });

      expect(Object.keys(itemCounts).length).toBe(8);
      Object.values(itemCounts).forEach((count) => {
        expect(count).toBe(2);
      });
    });

    it('isRoundCompleted deve retornar true somente quando todas as cartas estiverem com isMatched = true', () => {
      const deck = createDeck('forest', 4);
      expect(isRoundCompleted(deck)).toBe(false);

      const matchedDeck = deck.map((c) => ({ ...c, isMatched: true }));
      expect(isRoundCompleted(matchedDeck)).toBe(true);

      const partiallyMatched = deck.map((c, i) => ({ ...c, isMatched: i < deck.length - 1 }));
      expect(isRoundCompleted(partiallyMatched)).toBe(false);
    });
  });

  describe('5. Vencedores de Rodada e Classificação Geral', () => {
    it('determina corretamente o vencedor da rodada', () => {
      const players = createMockPlayers();
      players[0].roundScores[0] = 3;
      players[1].roundScores[0] = 5; // Vencedor da rodada 1
      players[2].roundScores[0] = 2;

      const roundWinners = getRoundWinners(players, 1);
      expect(roundWinners.length).toBe(1);
      expect(roundWinners[0].id).toBe('p2');
    });

    it('identifica empates na rodada', () => {
      const players = createMockPlayers();
      players[0].roundScores[1] = 4;
      players[1].roundScores[1] = 4; // Empate entre p1 e p2
      players[2].roundScores[1] = 2;

      const roundWinners = getRoundWinners(players, 2);
      expect(roundWinners.length).toBe(2);
      expect(roundWinners.map((p) => p.id)).toEqual(['p1', 'p2']);
    });

    it('ordena o ranking geral com base na pontuação total acumulada', () => {
      const players = createMockPlayers();
      players[0].totalScore = 6;
      players[1].totalScore = 10;
      players[2].totalScore = 8;

      const rankings = calculateRankings(players);
      expect(rankings[0].id).toBe('p2'); // 10 pts
      expect(rankings[1].id).toBe('p3'); // 8 pts
      expect(rankings[2].id).toBe('p1'); // 6 pts
    });

    it('retorna os vencedores finais do jogo', () => {
      const players = createMockPlayers();
      players[0].totalScore = 12;
      players[1].totalScore = 8;
      players[2].totalScore = 12; // Empate no 1º lugar entre p1 e p3

      const overallWinners = getOverallWinners(players);
      expect(overallWinners.length).toBe(2);
      expect(overallWinners.map((p) => p.id)).toEqual(['p1', 'p3']);
    });
  });

  describe('6. Regra de Exatamente 3 Rodadas (evaluateRoundProgression)', () => {
    it('rodada 1 avança para rodada 2 e não é game over', () => {
      const result = evaluateRoundProgression(1);
      expect(result.nextRound).toBe(2);
      expect(result.isGameOver).toBe(false);
    });

    it('rodada 2 avança para rodada 3 e não é game over', () => {
      const result = evaluateRoundProgression(2);
      expect(result.nextRound).toBe(3);
      expect(result.isGameOver).toBe(false);
    });

    it('rodada 3 finaliza a partida com isGameOver = true', () => {
      const result = evaluateRoundProgression(3);
      expect(result.nextRound).toBe(3);
      expect(result.isGameOver).toBe(true);
    });
  });
});
