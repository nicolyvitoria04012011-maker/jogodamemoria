import React, { useState, useEffect, useCallback } from 'react';
import { GameState, PlayerConfig, PlayerState, ThemeId, GameCard } from './types';
import { GAME_THEMES } from './data/themesAndAvatars';
import {
  createDeck,
  checkPairMatch,
  getNextPlayerIndex,
  recordPairFound,
  isRoundCompleted,
  evaluateRoundProgression,
} from './logic/gameLogic';
import { soundFx } from './utils/audio';
import { ThemeBackground } from './components/ThemeBackground';
import { SetupScreen } from './components/SetupScreen';
import { Scoreboard } from './components/Scoreboard';
import { MemoryCard } from './components/MemoryCard';
import { RoundSummaryModal } from './components/RoundSummaryModal';
import { GameOverScreen } from './components/GameOverScreen';
import { UnitTestsModal } from './components/UnitTestsModal';
import { Volume2, VolumeX, RotateCcw, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    phase: 'setup',
    players: [],
    currentPlayerIndex: 0,
    currentRound: 1,
    themeId: 'ocean',
    pairCount: 8,
    cards: [],
    flippedCardIndices: [],
    isLocked: false,
    messageBanner: null,
  });

  const [isMuted, setIsMuted] = useState<boolean>(() => soundFx.isMuted);
  const [showTestModal, setShowTestModal] = useState<boolean>(false);
  const [showQuitConfirm, setShowQuitConfirm] = useState<boolean>(false);

  const activeTheme = GAME_THEMES.find((t) => t.id === gameState.themeId) || GAME_THEMES[0];

  const handleToggleMute = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  // Start new match from setup screen
  const handleStartGame = (
    playerConfigs: PlayerConfig[],
    themeId: ThemeId,
    pairCount: number
  ) => {
    const initialPlayers: PlayerState[] = playerConfigs.map((cfg) => ({
      ...cfg,
      roundScores: [0, 0, 0],
      totalScore: 0,
      pairsFoundTotal: 0,
      currentStreak: 0,
    }));

    const freshDeck = createDeck(themeId, pairCount);

    setGameState({
      phase: 'playing',
      players: initialPlayers,
      currentPlayerIndex: 0,
      currentRound: 1,
      themeId,
      pairCount,
      cards: freshDeck,
      flippedCardIndices: [],
      isLocked: false,
      messageBanner: `Começando a Rodada 1! Vez de ${initialPlayers[0].name}`,
    });

    setTimeout(() => {
      setGameState((prev) => ({ ...prev, messageBanner: null }));
    }, 2500);
  };

  // Start next round (Round 2 or 3)
  const handleNextRound = () => {
    const nextRound = (gameState.currentRound + 1) as 2 | 3;
    const freshDeck = createDeck(gameState.themeId, gameState.pairCount);

    soundFx.playRoundWin();

    // Reset streaks for round start, maintain scores
    const resetPlayers = gameState.players.map((p) => ({
      ...p,
      currentStreak: 0,
    }));

    setGameState((prev) => ({
      ...prev,
      phase: 'playing',
      currentRound: nextRound,
      cards: freshDeck,
      flippedCardIndices: [],
      isLocked: false,
      players: resetPlayers,
      // The starting player rotates so everyone gets to go first in different rounds
      currentPlayerIndex: (nextRound - 1) % prev.players.length,
      messageBanner: `Rodada ${nextRound} iniciada! Vez de ${resetPlayers[(nextRound - 1) % resetPlayers.length].name}`,
    }));

    setTimeout(() => {
      setGameState((prev) => ({ ...prev, messageBanner: null }));
    }, 2500);
  };

  // Card Flip Handler
  const handleCardClick = (cardIndex: number) => {
    if (gameState.isLocked) return;
    const card = gameState.cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    soundFx.playCardFlip();

    const newFlipped = [...gameState.flippedCardIndices, cardIndex];

    // Mark clicked card as flipped
    const updatedCards = gameState.cards.map((c, i) =>
      i === cardIndex ? { ...c, isFlipped: true } : c
    );

    if (newFlipped.length === 1) {
      setGameState((prev) => ({
        ...prev,
        cards: updatedCards,
        flippedCardIndices: newFlipped,
        isLocked: false,
      }));
      return;
    }

    if (newFlipped.length === 2) {
      // Lock board to evaluate pair
      setGameState((prev) => ({
        ...prev,
        cards: updatedCards,
        flippedCardIndices: newFlipped,
        isLocked: true,
      }));

      const firstIndex = newFlipped[0];
      const secondIndex = newFlipped[1];
      const firstCard = updatedCards[firstIndex];
      const secondCard = updatedCards[secondIndex];

      const isMatch = checkPairMatch(firstCard, secondCard);

      if (isMatch) {
        // MATCH FOUND!
        setTimeout(() => {
          soundFx.playPairMatch();

          // Small joyful particle burst on match
          confetti({
            particleCount: 25,
            spread: 45,
            origin: { y: 0.6 },
            colors: [firstCard.color, '#fbbf24', '#ffffff'],
          });

          // Mark cards as matched
          const matchedCards = updatedCards.map((c, idx) => {
            if (idx === firstIndex || idx === secondIndex) {
              return {
                ...c,
                isFlipped: false,
                isMatched: true,
                matchedByPlayerId: gameState.players[gameState.currentPlayerIndex].id,
              };
            }
            return c;
          });

          // Update player scores
          const updatedPlayers = recordPairFound(
            gameState.players,
            gameState.currentPlayerIndex,
            gameState.currentRound
          );

          const currentPlayerName = updatedPlayers[gameState.currentPlayerIndex].name;
          const isRoundOver = isRoundCompleted(matchedCards);

          if (isRoundOver) {
            // Round is complete!
            soundFx.playRoundWin();
            const progression = evaluateRoundProgression(gameState.currentRound);

            if (progression.isGameOver) {
              // Match ended after Round 3!
              setTimeout(() => {
                soundFx.playGameOverFanfare();
                setGameState((prev) => ({
                  ...prev,
                  cards: matchedCards,
                  players: updatedPlayers,
                  flippedCardIndices: [],
                  isLocked: false,
                  phase: 'game_over',
                }));
              }, 800);
            } else {
              // Round 1 or 2 summary
              setTimeout(() => {
                setGameState((prev) => ({
                  ...prev,
                  cards: matchedCards,
                  players: updatedPlayers,
                  flippedCardIndices: [],
                  isLocked: false,
                  phase: 'round_summary',
                }));
              }, 800);
            }
          } else {
            // Round continues. Player continues playing!
            setGameState((prev) => ({
              ...prev,
              cards: matchedCards,
              players: updatedPlayers,
              flippedCardIndices: [],
              isLocked: false,
              messageBanner: `✨ Par encontrado! ${currentPlayerName} joga novamente!`,
            }));

            setTimeout(() => {
              setGameState((prev) => ({ ...prev, messageBanner: null }));
            }, 2000);
          }
        }, 600);
      } else {
        // MISMATCH - Flip cards back and pass turn
        setTimeout(() => {
          soundFx.playMismatch();

          const unflippedCards = updatedCards.map((c, idx) => {
            if (idx === firstIndex || idx === secondIndex) {
              return { ...c, isFlipped: false };
            }
            return c;
          });

          const nextPlayerIdx = getNextPlayerIndex(
            gameState.currentPlayerIndex,
            gameState.players.length,
            false
          );

          soundFx.playTurnChange();

          const nextPlayerName = gameState.players[nextPlayerIdx].name;

          setGameState((prev) => ({
            ...prev,
            cards: unflippedCards,
            flippedCardIndices: [],
            currentPlayerIndex: nextPlayerIdx,
            isLocked: false,
            messageBanner: `Passou a vez! Agora é a vez de ${nextPlayerName}`,
          }));

          setTimeout(() => {
            setGameState((prev) => ({ ...prev, messageBanner: null }));
          }, 1800);
        }, 1100);
      }
    }
  };

  const handleReturnToSetup = () => {
    setShowQuitConfirm(false);
    setGameState((prev) => ({
      ...prev,
      phase: 'setup',
      flippedCardIndices: [],
      isLocked: false,
    }));
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between text-slate-100 overflow-x-hidden">
      {/* Dynamic Theme Atmospheric Background */}
      <ThemeBackground themeId={gameState.themeId} />

      {/* Main Content Router based on Phase */}
      <main className="flex-1 w-full flex flex-col justify-center">
        {gameState.phase === 'setup' && (
          <SetupScreen
            onStartGame={handleStartGame}
            isMuted={isMuted}
            onToggleMute={handleToggleMute}
            onOpenTestModal={() => setShowTestModal(true)}
          />
        )}

        {gameState.phase === 'playing' && (
          <div className="w-full max-w-5xl mx-auto px-4 py-6 md:py-8 space-y-6">
            {/* Top Navigation Controls Bar */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowQuitConfirm(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 shadow-sm"
                  id="btn-quit-match"
                >
                  <RotateCcw className="w-4 h-4 text-amber-400" />
                  <span>Voltar / Configurar</span>
                </button>

                <button
                  onClick={() => setShowTestModal(true)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-800/60 text-xs font-semibold text-indigo-300 hover:text-white transition-all shadow-sm"
                  title="Verificar testes unitários de lógica"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Testes</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleMute}
                  className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-all shadow-sm"
                  title={isMuted ? 'Ativar som' : 'Silenciar som'}
                  id="btn-sound-toggle-game"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Scoreboard and Current Turn Indicator */}
            <Scoreboard
              players={gameState.players}
              currentPlayerIndex={gameState.currentPlayerIndex}
              currentRound={gameState.currentRound}
              theme={activeTheme}
              messageBanner={gameState.messageBanner}
            />

            {/* Memory Game Cards Board */}
            <div
              className={`p-4 sm:p-6 rounded-3xl border backdrop-blur-md transition-all shadow-2xl ${activeTheme.boardBg}`}
            >
              <div
                className={`grid gap-2.5 sm:gap-4 mx-auto ${
                  gameState.pairCount === 6
                    ? 'grid-cols-3 sm:grid-cols-4 max-w-2xl'
                    : 'grid-cols-4 max-w-3xl'
                }`}
                id="memory-board-grid"
              >
                {gameState.cards.map((card, idx) => (
                  <MemoryCard
                    key={card.uniqueId}
                    card={card}
                    index={idx}
                    theme={activeTheme}
                    onFlip={handleCardClick}
                    isLocked={gameState.isLocked}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Round Summary Modal between rounds 1 and 2, and 2 and 3 */}
        {gameState.phase === 'round_summary' && gameState.currentRound < 3 && (
          <RoundSummaryModal
            currentRound={gameState.currentRound as 1 | 2}
            players={gameState.players}
            theme={activeTheme}
            onNextRound={handleNextRound}
          />
        )}

        {/* Final Game Over Screen after Round 3 */}
        {gameState.phase === 'game_over' && (
          <GameOverScreen
            players={gameState.players}
            theme={activeTheme}
            onNewGame={handleReturnToSetup}
          />
        )}
      </main>

      {/* Quit / Restart Confirmation Modal */}
      {showQuitConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl text-center space-y-4">
            <h3 className="text-xl font-black text-white">Reiniciar Partida?</h3>
            <p className="text-sm text-slate-300">
              O progresso da partida atual será perdido e você voltará para a tela de seleção de
              jogadores e tema.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-200 text-sm transition-all"
              >
                Continuar Jogo
              </button>
              <button
                onClick={handleReturnToSetup}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 font-bold text-white text-sm transition-all"
              >
                Sim, Reiniciar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Unit Tests Modal */}
      <UnitTestsModal isOpen={showTestModal} onClose={() => setShowTestModal(false)} />

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-300 border-t border-slate-900/60 backdrop-blur-sm">
        <p>
          Jogo da Memória Felina • 2 a 4 Jogadores • 3 Rodadas • Web Audio API & Motion
        </p>
      </footer>
    </div>
  );
}
