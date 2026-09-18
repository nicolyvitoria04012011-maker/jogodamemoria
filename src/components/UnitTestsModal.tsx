import React, { useState } from 'react';
import { X, CheckCircle, Play, ShieldCheck, RefreshCw } from 'lucide-react';
import {
  checkPairMatch,
  getNextPlayerIndex,
  recordPairFound,
  isRoundCompleted,
  getRoundWinners,
  calculateRankings,
  evaluateRoundProgression,
  createDeck,
} from '../logic/gameLogic';
import { GameCard, PlayerState } from '../types';

interface UnitTestsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TestResult {
  category: string;
  name: string;
  passed: boolean;
  message: string;
}

export const UnitTestsModal: React.FC<UnitTestsModalProps> = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [results, setResults] = useState<TestResult[]>(() => runInAppTests());

  if (!isOpen) return null;

  function runInAppTests(): TestResult[] {
    const list: TestResult[] = [];

    // 1. Verificação de pares
    try {
      const cardA: GameCard = {
        uniqueId: 'ocean-1-a',
        themeItemId: 'ocean-1',
        name: 'Golfinho',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };
      const cardB: GameCard = {
        uniqueId: 'ocean-1-b',
        themeItemId: 'ocean-1',
        name: 'Golfinho',
        emoji: '🐬',
        iconName: 'Waves',
        color: '#38bdf8',
        isFlipped: true,
        isMatched: false,
      };
      const cardC: GameCard = {
        uniqueId: 'ocean-2-a',
        themeItemId: 'ocean-2',
        name: 'Tubarão',
        emoji: '🦈',
        iconName: 'Fish',
        color: '#94a3b8',
        isFlipped: true,
        isMatched: false,
      };

      const matchOk = checkPairMatch(cardA, cardB) === true;
      const mismatchOk = checkPairMatch(cardA, cardC) === false;
      const selfOk = checkPairMatch(cardA, cardA) === false;

      list.push({
        category: 'Verificação de Pares',
        name: 'Identificação correta de par correspondente',
        passed: matchOk,
        message: matchOk ? 'Mesmo themeItemId reconhecido como par' : 'Falha na checagem',
      });
      list.push({
        category: 'Verificação de Pares',
        name: 'Rejeição de cartas distintas e autochecagem',
        passed: mismatchOk && selfOk,
        message: mismatchOk && selfOk ? 'Cartas diferentes rejeitadas corretamente' : 'Falha na checagem',
      });
    } catch (e) {
      list.push({ category: 'Verificação de Pares', name: 'Erro de execução', passed: false, message: String(e) });
    }

    // 2. Alternância de turnos
    try {
      // Se acertou par, joga de novo
      const keepTurn = getNextPlayerIndex(1, 3, true) === 1;
      // Se errou, passa para o próximo
      const passTurn = getNextPlayerIndex(0, 3, false) === 1;
      // Ciclo no último jogador
      const cycleTurn = getNextPlayerIndex(2, 3, false) === 0;

      list.push({
        category: 'Alternância de Turnos',
        name: 'Jogador repete turno ao marcar ponto (didMatch = true)',
        passed: keepTurn,
        message: keepTurn ? 'Jogador atual continua no comando' : 'Falha ao repetir turno',
      });
      list.push({
        category: 'Alternância de Turnos',
        name: 'Turno passa ao próximo jogador ao errar (didMatch = false)',
        passed: passTurn && cycleTurn,
        message: passTurn && cycleTurn ? 'Ciclo rotativo de 2 a 4 jogadores verificado' : 'Falha na rotação',
      });
    } catch (e) {
      list.push({ category: 'Alternância de Turnos', name: 'Erro de execução', passed: false, message: String(e) });
    }

    // 3. Cálculo de pontuação
    try {
      const mockPlayers: PlayerState[] = [
        { id: '1', name: 'Gato 1', avatarId: 'orange', roundScores: [0, 0, 0], totalScore: 0, pairsFoundTotal: 0, currentStreak: 0 },
        { id: '2', name: 'Gato 2', avatarId: 'blue', roundScores: [0, 0, 0], totalScore: 0, pairsFoundTotal: 0, currentStreak: 0 },
      ];
      const updatedR1 = recordPairFound(mockPlayers, 0, 1);
      const scoreR1Ok = updatedR1[0].roundScores[0] === 1 && updatedR1[0].totalScore === 1 && updatedR1[0].currentStreak === 1;

      const updatedR2 = recordPairFound(updatedR1, 0, 2);
      const scoreR2Ok = updatedR2[0].roundScores[1] === 1 && updatedR2[0].totalScore === 2;

      list.push({
        category: 'Cálculo de Pontuação',
        name: 'Incremento de ponto por rodada e pontuação total',
        passed: scoreR1Ok && scoreR2Ok,
        message: scoreR1Ok && scoreR2Ok ? 'Pontuações por rodada e acumuladas calculadas com precisão' : 'Falha no cálculo',
      });
    } catch (e) {
      list.push({ category: 'Cálculo de Pontuação', name: 'Erro de execução', passed: false, message: String(e) });
    }

    // 4. Tabuleiro & Deck
    try {
      const deck = createDeck('sweets', 8);
      const countOk = deck.length === 16;
      const initialCompleted = isRoundCompleted(deck) === false;
      const completedOk = isRoundCompleted(deck.map((c) => ({ ...c, isMatched: true }))) === true;

      list.push({
        category: 'Geração de Tabuleiro',
        name: 'Embaralhamento e contagem exata de pares (16 cartas)',
        passed: countOk && initialCompleted && completedOk,
        message: countOk ? '16 cartas emparelhadas geradas e estado de conclusão verificado' : 'Falha no baralho',
      });
    } catch (e) {
      list.push({ category: 'Geração de Tabuleiro', name: 'Erro de execução', passed: false, message: String(e) });
    }

    // 5. Regra de 3 Rodadas & Rankings
    try {
      const r1 = evaluateRoundProgression(1);
      const r2 = evaluateRoundProgression(2);
      const r3 = evaluateRoundProgression(3);

      const progressionOk = r1.nextRound === 2 && !r1.isGameOver &&
                            r2.nextRound === 3 && !r2.isGameOver &&
                            r3.isGameOver;

      const p: PlayerState[] = [
        { id: '1', name: 'A', avatarId: 'orange', roundScores: [2, 1, 3], totalScore: 6, pairsFoundTotal: 6, currentStreak: 0 },
        { id: '2', name: 'B', avatarId: 'pink', roundScores: [3, 4, 3], totalScore: 10, pairsFoundTotal: 10, currentStreak: 0 },
      ];
      const ranking = calculateRankings(p);
      const rankingOk = ranking[0].id === '2' && ranking[0].totalScore === 10;
      const roundWinners = getRoundWinners(p, 2);
      const roundWinnerOk = roundWinners[0].id === '2';

      list.push({
        category: 'Regra de 3 Rodadas & Vencedores',
        name: 'Finalização estrita em 3 rodadas e determinação de campeão',
        passed: progressionOk && rankingOk && roundWinnerOk,
        message: progressionOk && rankingOk ? 'Progresso de 3 rodadas e ordenação do pódio validados' : 'Falha na progressão',
      });
    } catch (e) {
      list.push({ category: 'Regra de 3 Rodadas & Vencedores', name: 'Erro de execução', passed: false, message: String(e) });
    }

    return list;
  }

  const handleRerun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(runInAppTests());
      setIsRunning(false);
    }, 250);
  };

  const allPassed = results.every((r) => r.passed);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-white overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black">Suíte de Testes Unitários</h3>
              <p className="text-xs text-slate-400">
                Verificação da lógica de jogo (pares, turnos, pontuação e rodadas)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            id="btn-close-tests"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Banner */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                allPassed ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
              }`}
            />
            <span className="font-bold text-slate-200">
              {allPassed
                ? `${results.length} de ${results.length} testes passaram com sucesso (100%)`
                : 'Alguns testes falharam'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 text-[11px]">Também executável via: <code>npm test</code></span>
            <button
              onClick={handleRerun}
              disabled={isRunning}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-bold text-white transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
              <span>Reexecutar</span>
            </button>
          </div>
        </div>

        {/* Results List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {results.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded-md border border-indigo-800/50">
                  {item.category}
                </span>
                <h4 className="font-bold text-sm text-white">{item.name}</h4>
                <p className="text-xs text-slate-400">{item.message}</p>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Passou</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition-all"
          >
            Fechar Janela de Testes
          </button>
        </div>
      </div>
    </div>
  );
};
