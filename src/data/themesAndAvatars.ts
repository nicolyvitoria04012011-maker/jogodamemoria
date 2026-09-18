import { CatAvatarDef, GameThemeDef } from '../types';

export const CAT_AVATARS: CatAvatarDef[] = [
  {
    id: 'orange',
    name: 'Laranja Tigrado',
    furColor: '#f97316', // orange-500
    secondaryFur: '#ea580c', // orange-600
    innerEarColor: '#fda4af', // rose-300
    eyeColor: '#10b981', // emerald-500
    collarColor: '#3b82f6', // blue-500
    accentBadge: 'bg-orange-500',
    stripeColor: '#c2410c',
    tagColor: '#fbbf24',
  },
  {
    id: 'black',
    name: 'Preto Meia-Noite',
    furColor: '#1e293b', // slate-800
    secondaryFur: '#0f172a', // slate-900
    innerEarColor: '#f43f5e', // rose-500
    eyeColor: '#eab308', // yellow-500 (glowing golden eyes)
    collarColor: '#a855f7', // purple-500
    accentBadge: 'bg-slate-800',
    stripeColor: '#090d16',
    tagColor: '#ec4899',
  },
  {
    id: 'white',
    name: 'Branco Neve',
    furColor: '#f8fafc', // slate-50
    secondaryFur: '#e2e8f0', // slate-200
    innerEarColor: '#f472b6', // pink-400
    eyeColor: '#06b6d4', // cyan-500 (ice blue eyes)
    collarColor: '#ec4899', // pink-500
    accentBadge: 'bg-slate-200',
    tagColor: '#8b5cf6',
  },
  {
    id: 'pink',
    name: 'Rosa Algodão',
    furColor: '#f472b6', // pink-400
    secondaryFur: '#db2777', // pink-600
    innerEarColor: '#fce7f3', // pink-100
    eyeColor: '#3b82f6', // blue-500
    collarColor: '#10b981', // emerald-500
    accentBadge: 'bg-pink-400',
    stripeColor: '#be185d',
    tagColor: '#fbbf24',
  },
  {
    id: 'purple',
    name: 'Roxo Cósmico',
    furColor: '#8b5cf6', // purple-500
    secondaryFur: '#7c3aed', // violet-600
    innerEarColor: '#fbcfe8', // pink-200
    eyeColor: '#fbbf24', // amber-400
    collarColor: '#06b6d4', // cyan-500
    accentBadge: 'bg-purple-500',
    stripeColor: '#6d28d9',
    tagColor: '#f43f5e',
  },
  {
    id: 'blue',
    name: 'Azul Celeste',
    furColor: '#0ea5e9', // sky-500
    secondaryFur: '#0284c7', // sky-600
    innerEarColor: '#bae6fd', // sky-200
    eyeColor: '#f59e0b', // amber-500
    collarColor: '#f97316', // orange-500
    accentBadge: 'bg-sky-500',
    stripeColor: '#0369a1',
    tagColor: '#10b981',
  },
  {
    id: 'mint',
    name: 'Verde Menta',
    furColor: '#10b981', // emerald-500
    secondaryFur: '#059669', // emerald-600
    innerEarColor: '#a7f3d0', // emerald-200
    eyeColor: '#8b5cf6', // purple-500
    collarColor: '#f43f5e', // rose-500
    accentBadge: 'bg-emerald-500',
    stripeColor: '#047857',
    tagColor: '#eab308',
  },
  {
    id: 'caramel',
    name: 'Dourado Caramelo',
    furColor: '#f59e0b', // amber-500
    secondaryFur: '#d97706', // amber-600
    innerEarColor: '#fef3c7', // amber-100
    eyeColor: '#0284c7', // sky-600
    collarColor: '#ef4444', // red-500
    accentBadge: 'bg-amber-500',
    stripeColor: '#b45309',
    tagColor: '#10b981',
  },
];

export const GAME_THEMES: GameThemeDef[] = [
  {
    id: 'ocean',
    name: 'Oceano Profundo',
    subtitle: 'Mergulhe com criaturas marinhas',
    description: 'Tons azuis cristalinos, corais e habitantes das profundezas marinhas.',
    emoji: '🌊',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    bgGradient: 'from-sky-950 via-cyan-950 to-blue-950',
    boardBg: 'bg-blue-950/80 border-cyan-500/30 shadow-cyan-900/40',
    cardBackGradient: 'from-cyan-600 via-blue-600 to-indigo-700',
    cardBorder: 'border-cyan-400/40',
    particleType: 'bubbles',
    items: [
      { id: 'ocean-1', name: 'Golfinho Saltador', emoji: '🐬', iconName: 'Waves', color: '#38bdf8' },
      { id: 'ocean-2', name: 'Tubarão Valente', emoji: '🦈', iconName: 'Fish', color: '#94a3b8' },
      { id: 'ocean-3', name: 'Polvo Misterioso', emoji: '🐙', iconName: 'Sparkles', color: '#f43f5e' },
      { id: 'ocean-4', name: 'Tartaruga Marinha', emoji: '🐢', iconName: 'Shield', color: '#10b981' },
      { id: 'ocean-5', name: 'Peixe-Palhaço', emoji: '🐠', iconName: 'Flame', color: '#f97316' },
      { id: 'ocean-6', name: 'Estrela-do-Mar', emoji: '⭐', iconName: 'Star', color: '#eab308' },
      { id: 'ocean-7', name: 'Concha de Pérola', emoji: '🐚', iconName: 'CircleDot', color: '#ec4899' },
      { id: 'ocean-8', name: 'Água-Viva Brilhante', emoji: '🪼', iconName: 'Zap', color: '#c084fc' },
    ],
  },
  {
    id: 'forest',
    name: 'Floresta Mágica',
    subtitle: 'Mistérios e encantos do bosque',
    description: 'Verdes exuberantes, animais fofos e segredos da floresta ancestral.',
    emoji: '🌲',
    primaryColor: '#059669',
    accentColor: '#34d399',
    bgGradient: 'from-emerald-950 via-teal-950 to-green-950',
    boardBg: 'bg-emerald-950/80 border-emerald-500/30 shadow-emerald-900/40',
    cardBackGradient: 'from-emerald-600 via-green-600 to-teal-700',
    cardBorder: 'border-emerald-400/40',
    particleType: 'leaves',
    items: [
      { id: 'forest-1', name: 'Raposa Astuta', emoji: '🦊', iconName: 'Flame', color: '#f97316' },
      { id: 'forest-2', name: 'Coruja Guardiã', emoji: '🦉', iconName: 'Eye', color: '#a78bfa' },
      { id: 'forest-3', name: 'Cogumelo Mágico', emoji: '🍄', iconName: 'Sparkles', color: '#ef4444' },
      { id: 'forest-4', name: 'Urso Pardo', emoji: '🐻', iconName: 'Shield', color: '#d97706' },
      { id: 'forest-5', name: 'Cervo Real', emoji: '🦌', iconName: 'Crown', color: '#f59e0b' },
      { id: 'forest-6', name: 'Esquilo Saltitante', emoji: '🐿️', iconName: 'Zap', color: '#ea580c' },
      { id: 'forest-7', name: 'Folha de Outono', emoji: '🍁', iconName: 'Leaf', color: '#f43f5e' },
      { id: 'forest-8', name: 'Bolota de Ouro', emoji: '🌰', iconName: 'Gem', color: '#eab308' },
    ],
  },
  {
    id: 'sweets',
    name: 'Reino dos Doces',
    subtitle: 'Açúcar, confeitos e diversão',
    description: 'Cores doces e vibrantes, guloseimas açucaradas e sobremesas deliciosas.',
    emoji: '🧁',
    primaryColor: '#db2777',
    accentColor: '#f472b6',
    bgGradient: 'from-pink-950 via-fuchsia-950 to-rose-950',
    boardBg: 'bg-fuchsia-950/80 border-pink-500/30 shadow-pink-900/40',
    cardBackGradient: 'from-pink-500 via-fuchsia-600 to-rose-600',
    cardBorder: 'border-pink-400/40',
    particleType: 'sprinkles',
    items: [
      { id: 'sweets-1', name: 'Cupcake Festivo', emoji: '🧁', iconName: 'Heart', color: '#f472b6' },
      { id: 'sweets-2', name: 'Donut Glaceado', emoji: '🍩', iconName: 'Circle', color: '#ec4899' },
      { id: 'sweets-3', name: 'Pirulito Espiral', emoji: '🍭', iconName: 'Sparkles', color: '#38bdf8' },
      { id: 'sweets-4', name: 'Sorvete Casquinha', emoji: '🍦', iconName: 'Cloud', color: '#fbbf24' },
      { id: 'sweets-5', name: 'Barra de Chocolate', emoji: '🍫', iconName: 'Square', color: '#b45309' },
      { id: 'sweets-6', name: 'Bala Colorida', emoji: '🍬', iconName: 'Zap', color: '#a855f7' },
      { id: 'sweets-7', name: 'Picolé de Frutas', emoji: '🍧', iconName: 'Sun', color: '#10b981' },
      { id: 'sweets-8', name: 'Fatia de Melancia', emoji: '🍉', iconName: 'Smile', color: '#ef4444' },
    ],
  },
  {
    id: 'space',
    name: 'Espaço Cósmico',
    subtitle: 'Viagem interestelar entre galáxias',
    description: 'Galáxias roxas, planetas misteriosos e estrelas incandescentes.',
    emoji: '🚀',
    primaryColor: '#7c3aed',
    accentColor: '#a78bfa',
    bgGradient: 'from-slate-950 via-purple-950 to-indigo-950',
    boardBg: 'bg-purple-950/80 border-purple-500/30 shadow-purple-900/40',
    cardBackGradient: 'from-indigo-600 via-purple-600 to-pink-600',
    cardBorder: 'border-purple-400/40',
    particleType: 'stars',
    items: [
      { id: 'space-1', name: 'Foguete Estelar', emoji: '🚀', iconName: 'Rocket', color: '#f43f5e' },
      { id: 'space-2', name: 'Planeta Anelado', emoji: '🪐', iconName: 'Globe', color: '#f59e0b' },
      { id: 'space-3', name: 'Capacete de Astronauta', emoji: '👨‍🚀', iconName: 'User', color: '#38bdf8' },
      { id: 'space-4', name: 'Disco Voador OVNI', emoji: '🛸', iconName: 'Compass', color: '#10b981' },
      { id: 'space-5', name: 'Estrela Reluzente', emoji: '⭐', iconName: 'Star', color: '#fbbf24' },
      { id: 'space-6', name: 'Meteoro Flamejante', emoji: '☄️', iconName: 'Flame', color: '#ea580c' },
      { id: 'space-7', name: 'Satélite Espacial', emoji: '🛰️', iconName: 'Radio', color: '#cbd5e1' },
      { id: 'space-8', name: 'Galáxia Espiral', emoji: '🌌', iconName: 'Sparkles', color: '#c084fc' },
    ],
  },
  {
    id: 'nature',
    name: 'Natureza Viva',
    subtitle: 'Cores florais e energia solar',
    description: 'Flores desabrochando, abelhas e a beleza radiante do ar livre.',
    emoji: '🌻',
    primaryColor: '#eab308',
    accentColor: '#facc15',
    bgGradient: 'from-emerald-950 via-lime-950 to-yellow-950',
    boardBg: 'bg-lime-950/80 border-yellow-500/30 shadow-yellow-900/40',
    cardBackGradient: 'from-amber-500 via-yellow-500 to-emerald-600',
    cardBorder: 'border-yellow-400/40',
    particleType: 'petals',
    items: [
      { id: 'nature-1', name: 'Girassol Dourado', emoji: '🌻', iconName: 'Sun', color: '#eab308' },
      { id: 'nature-2', name: 'Borboleta Imperial', emoji: '🦋', iconName: 'Sparkles', color: '#06b6d4' },
      { id: 'nature-3', name: 'Joaninha Pintada', emoji: '🐞', iconName: 'CircleDot', color: '#ef4444' },
      { id: 'nature-4', name: 'Abelha Operária', emoji: '🐝', iconName: 'Zap', color: '#f59e0b' },
      { id: 'nature-5', name: 'Arco-Íris Radiante', emoji: '🌈', iconName: 'Palette', color: '#a855f7' },
      { id: 'nature-6', name: 'Trevo de 4 Folhas', emoji: '🍀', iconName: 'CheckCircle', color: '#10b981' },
      { id: 'nature-7', name: 'Rosa Delicada', emoji: '🌹', iconName: 'Heart', color: '#f43f5e' },
      { id: 'nature-8', name: 'Sol da Manhã', emoji: '☀️', iconName: 'SunMedium', color: '#fbbf24' },
    ],
  },
  {
    id: 'city',
    name: 'Cidade Neon',
    subtitle: 'Metrópole vibrante que nunca dorme',
    description: 'Luzes neon, transportes modernos e arranha-céus futuristas.',
    emoji: '🌆',
    primaryColor: '#f97316',
    accentColor: '#fb923c',
    bgGradient: 'from-slate-950 via-zinc-950 to-neutral-950',
    boardBg: 'bg-slate-900/80 border-orange-500/30 shadow-orange-900/40',
    cardBackGradient: 'from-orange-500 via-rose-600 to-indigo-700',
    cardBorder: 'border-orange-400/40',
    particleType: 'sparks',
    items: [
      { id: 'city-1', name: 'Arranha-Céu Iluminado', emoji: '🏙️', iconName: 'Building', color: '#38bdf8' },
      { id: 'city-2', name: 'Carro Esportivo', emoji: '🚗', iconName: 'Car', color: '#ef4444' },
      { id: 'city-3', name: 'Metrô Moderno', emoji: '🚇', iconName: 'Train', color: '#10b981' },
      { id: 'city-4', name: 'Semáforo da Avenida', emoji: '🚥', iconName: 'TrafficCone', color: '#f59e0b' },
      { id: 'city-5', name: 'Bicicleta Urbana', emoji: '🚲', iconName: 'Bike', color: '#06b6d4' },
      { id: 'city-6', name: 'Ponte Monumental', emoji: '🌉', iconName: 'Anchor', color: '#a855f7' },
      { id: 'city-7', name: 'Roda-Gigante Neon', emoji: '🎡', iconName: 'Circle', color: '#ec4899' },
      { id: 'city-8', name: 'Música de Rua', emoji: '🎧', iconName: 'Headphones', color: '#fbbf24' },
    ],
  },
];
