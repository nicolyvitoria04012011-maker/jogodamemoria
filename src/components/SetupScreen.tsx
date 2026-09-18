import React, { useState } from 'react';
import { Sparkles, Users, Palette, Play, Volume2, VolumeX, HelpCircle, Check, Flame } from 'lucide-react';
import { CAT_AVATARS, GAME_THEMES } from '../data/themesAndAvatars';
import { CatColorId, PlayerConfig, ThemeId } from '../types';
import { CatAvatar } from './CatAvatar';
import { soundFx } from '../utils/audio';

interface SetupScreenProps {
  onStartGame: (players: PlayerConfig[], themeId: ThemeId, pairCount: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenTestModal: () => void;
}

const DEFAULT_NAMES = ['Gatinho Flash', 'Gatinha Mel', 'Capitão Bigodes', 'Princesa Patinhas'];
const DEFAULT_AVATARS: CatColorId[] = ['orange', 'black', 'pink', 'blue'];

export const SetupScreen: React.FC<SetupScreenProps> = ({
  onStartGame,
  isMuted,
  onToggleMute,
  onOpenTestModal,
}) => {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [players, setPlayers] = useState<PlayerConfig[]>([
    { id: 'p1', name: DEFAULT_NAMES[0], avatarId: DEFAULT_AVATARS[0] },
    { id: 'p2', name: DEFAULT_NAMES[1], avatarId: DEFAULT_AVATARS[1] },
    { id: 'p3', name: DEFAULT_NAMES[2], avatarId: DEFAULT_AVATARS[2] },
    { id: 'p4', name: DEFAULT_NAMES[3], avatarId: DEFAULT_AVATARS[3] },
  ]);
  const [selectedThemeId, setSelectedThemeId] = useState<ThemeId>('ocean');
  const [pairCount, setPairCount] = useState<number>(8);
  const [showRules, setShowRules] = useState<boolean>(false);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);
    soundFx.playCardFlip();
  };

  const handleNameChange = (index: number, newName: string) => {
    setPlayers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: newName };
      return copy;
    });
  };

  const handleAvatarChange = (index: number, avatarId: CatColorId) => {
    soundFx.playCardFlip();
    setPlayers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], avatarId };
      return copy;
    });
  };

  const handleThemeSelect = (themeId: ThemeId) => {
    soundFx.playCardFlip();
    setSelectedThemeId(themeId);
  };

  const handleStart = () => {
    soundFx.playRoundWin();
    const activePlayers = players.slice(0, playerCount).map((p, i) => ({
      ...p,
      name: p.name.trim() || `Jogador ${i + 1}`,
    }));
    onStartGame(activePlayers, selectedThemeId, pairCount);
  };

  const currentTheme = GAME_THEMES.find((t) => t.id === selectedThemeId) || GAME_THEMES[0];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-12">
      {/* Top Header Bar */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center shadow-lg shadow-pink-500/20 text-2xl">
            🐱
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-purple-300">
              Jogo da Memória Felina
            </h1>
            <p className="text-sm text-slate-300">
              Desafio de 3 rodadas para 2 a 4 jogadores • Quem acertar joga de novo!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition-all shadow-sm"
            title={isMuted ? 'Ativar som' : 'Silenciar som'}
            id="btn-sound-toggle-setup"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
          </button>

          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium transition-all shadow-sm"
            id="btn-rules-toggle"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Como Jogar</span>
          </button>

          <button
            onClick={onOpenTestModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-900/60 hover:bg-indigo-800/60 border border-indigo-700/60 text-indigo-200 hover:text-white text-xs font-semibold transition-all shadow-sm"
            id="btn-open-tests"
            title="Verificar testes unitários de lógica"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Testes Unitários</span>
          </button>
        </div>
      </header>

      {/* Rules Explanatory Dropdown */}
      {showRules && (
        <div className="mb-8 p-5 rounded-2xl bg-slate-900/90 border border-amber-500/30 backdrop-blur-md shadow-xl text-slate-200 animate-fadeIn">
          <h3 className="font-bold text-lg text-amber-300 flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            Regras Oficiais da Partida
          </h3>
          <ul className="grid sm:grid-cols-3 gap-3 text-sm">
            <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <strong className="block text-amber-200 mb-1">1. Rodadas</strong>
              A partida tem exatamente <span className="text-pink-400 font-bold">3 rodadas</span> consecutivas com embaralhamento dinâmico.
            </li>
            <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <strong className="block text-amber-200 mb-1">2. Turnos & Pares</strong>
              Vire 2 cartas. Se formar um par, você <span className="text-emerald-400 font-bold">marca ponto e joga novamente</span>! Se errar, passa a vez.
            </li>
            <li className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <strong className="block text-amber-200 mb-1">3. Grande Campeão</strong>
              Ao final das 3 rodadas, somamos todas as pontuações para consagrar o grande campeão no pódio!
            </li>
          </ul>
        </div>
      )}

      {/* Main Setup Container */}
      <div className="space-y-8">
        {/* Step 1: Number of Players */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                1
              </span>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-400" />
                  Quantidade de Jogadores
                </h2>
                <p className="text-xs text-slate-400">Escolha de 2 a 4 competidores para a disputa</p>
              </div>
            </div>

            {/* 2 to 4 player selector buttons */}
            <div className="flex items-center p-1 rounded-2xl bg-slate-950/80 border border-slate-800">
              {[2, 3, 4].map((count) => (
                <button
                  key={count}
                  onClick={() => handlePlayerCountChange(count)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                    playerCount === count
                      ? 'bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-lg shadow-pink-500/25 scale-105'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  id={`btn-player-count-${count}`}
                >
                  {count} Jogadores
                </button>
              ))}
            </div>
          </div>

          {/* Player Cards: Name & Cat Avatar selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players.slice(0, playerCount).map((player, index) => {
              const activeCat = CAT_AVATARS.find((c) => c.id === player.avatarId) || CAT_AVATARS[0];
              return (
                <div
                  key={player.id}
                  className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 hover:border-slate-600 transition-all flex flex-col gap-3 shadow-md"
                  id={`player-config-card-${index}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                      Jogador {index + 1}
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full border border-slate-800">
                      {activeCat.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Big Avatar Preview */}
                    <div className="flex-shrink-0 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-700">
                      <CatAvatar avatarId={player.avatarId} size="lg" />
                    </div>

                    {/* Name Input */}
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-slate-400 mb-1">
                        Nome do Gatinho:
                      </label>
                      <input
                        type="text"
                        maxLength={18}
                        value={player.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        placeholder={`Jogador ${index + 1}`}
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 font-semibold focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all text-sm"
                        id={`input-player-name-${index}`}
                      />
                    </div>
                  </div>

                  {/* Avatar Color Palette Selection (At least 6 colors, here 8 options!) */}
                  <div>
                    <span className="block text-xs font-medium text-slate-400 mb-2">
                      Escolha o gatinho de cor diferente:
                    </span>
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                      {CAT_AVATARS.map((cat) => {
                        const isSelected = player.avatarId === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleAvatarChange(index, cat.id)}
                            className={`p-1.5 rounded-xl border transition-all flex flex-col items-center flex-shrink-0 ${
                              isSelected
                                ? 'bg-slate-700 border-pink-400 ring-2 ring-pink-400/50 scale-105'
                                : 'bg-slate-900/60 border-slate-700/60 hover:border-slate-500 opacity-75 hover:opacity-100'
                            }`}
                            title={cat.name}
                            id={`btn-select-avatar-${index}-${cat.id}`}
                          >
                            <CatAvatar avatarId={cat.id} size="sm" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Step 2: Theme Selection */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center font-bold text-sm">
              2
            </span>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                Tema Visual da Partida
              </h2>
              <p className="text-xs text-slate-400">
                O tema altera o plano de fundo, estilo das cartas e atmosfera completa do jogo
              </p>
            </div>
          </div>

          {/* Theme Cards Grid (6 distinct themes) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GAME_THEMES.map((theme) => {
              const isSelected = selectedThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className={`p-4 rounded-2xl text-left transition-all duration-200 border flex flex-col justify-between relative overflow-hidden group ${
                    isSelected
                      ? 'bg-slate-800/90 border-pink-400 shadow-lg shadow-pink-500/20 scale-[1.03] ring-2 ring-pink-500/50'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                  id={`theme-card-${theme.id}`}
                >
                  {/* Theme Accent Border bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5"
                    style={{ backgroundColor: theme.primaryColor }}
                  />

                  <div>
                    <span className="text-3xl block mb-2 group-hover:scale-110 transition-transform">
                      {theme.emoji}
                    </span>
                    <h3 className="font-bold text-sm text-white mb-0.5">{theme.name}</h3>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {theme.subtitle}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold text-pink-300 uppercase tracking-wider">
                      <Check className="w-3 h-3 text-pink-400" /> Selecionado
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* Step 3: Deck Size / Game Balance */}
        <section className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 backdrop-blur-md shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
              3
            </span>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-purple-400" />
                Tamanho do Tabuleiro
              </h2>
              <p className="text-xs text-slate-400">
                Defina a quantidade de cartas por rodada (3 rodadas garantidas!)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPairCount(6);
                soundFx.playCardFlip();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                pairCount === 6
                  ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              id="btn-pairs-6"
            >
              12 Cartas (6 pares) • Mais Rápido
            </button>
            <button
              onClick={() => {
                setPairCount(8);
                soundFx.playCardFlip();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                pairCount === 8
                  ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              id="btn-pairs-8"
            >
              16 Cartas (8 pares) • Padrão 4x4
            </button>
          </div>
        </section>

        {/* Start Game Action Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            Tema selecionado:{' '}
            <span className="font-bold text-white">
              {currentTheme.emoji} {currentTheme.name}
            </span>{' '}
            • <span className="text-amber-400 font-semibold">{playerCount} Jogadores</span> • 3 Rodadas
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-black text-lg tracking-wide shadow-xl shadow-pink-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            id="btn-start-game"
          >
            <span>Iniciar Partida (3 Rodadas)</span>
            <Play className="w-5 h-5 fill-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
