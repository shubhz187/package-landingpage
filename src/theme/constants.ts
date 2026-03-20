export const COLORS = {
  bg: '#000000',
  bgDeep: '#0a0a1a',
  bgCard: 'rgba(255, 255, 255, 0.03)',
  bgCardHover: 'rgba(255, 255, 255, 0.06)',
  teal: '#00D4AA',
  tealLight: '#33FFCC',
  tealDim: 'rgba(0, 212, 170, 0.15)',
  tealGlow: 'rgba(0, 212, 170, 0.4)',
  amber: '#FFBF00',
  green: '#00E676',
  greenDim: 'rgba(0, 230, 118, 0.15)',
  red: '#FF3D00',
  redDim: 'rgba(255, 61, 0, 0.15)',
  blue: '#448AFF',
  blueDim: 'rgba(68, 138, 255, 0.15)',
  orange: '#FF8C00',
  orangeDim: 'rgba(255, 140, 0, 0.15)',
  purple: '#B388FF',
  purpleDim: 'rgba(179, 136, 255, 0.15)',
  cyan: '#00BCD4',
  white: '#FFFFFF',
  textPrimary: '#E0E0E0',
  textSecondary: '#9E9E9E',
  textDim: '#616161',
  border: 'rgba(255, 255, 255, 0.08)',
  borderTeal: 'rgba(0, 212, 170, 0.3)',
  circuit: 'rgba(0, 212, 170, 0.06)',
  circuitLine: 'rgba(0, 212, 170, 0.12)',
} as const;

export const TOTAL_FRAMES = 7500;
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const SCENES = {
  scene01: { start: 0, duration: 600 },
  scene02: { start: 600, duration: 750 },
  scene03: { start: 1350, duration: 1050 },
  scene04: { start: 2400, duration: 900 },
  scene05: { start: 3300, duration: 750 },
  scene06: { start: 4050, duration: 600 },
  scene07: { start: 4650, duration: 1500 },
  scene08: { start: 6150, duration: 600 },
  scene09: { start: 6750, duration: 750 },
} as const;

export const DEPLOY_STAGES = [
  { id: 'lambda', label: 'Lambda Functions', icon: 'lambda' },
  { id: 'lex', label: 'Lex Bots', icon: 'lex' },
  { id: 'hours', label: 'Hours of Operation', icon: 'hours' },
  { id: 'prompts', label: 'Prompts', icon: 'prompt' },
  { id: 'queues', label: 'Queues', icon: 'queue' },
  { id: 'routing', label: 'Routing Profiles', icon: 'routing' },
  { id: 'flows', label: 'Contact Flows', icon: 'connect-flow' },
] as const;

export const DATALAKE_STAGES = [
  { id: 'ram-share', label: 'Share Analytics via RAM', icon: 'ram' },
  { id: 'ram-accept', label: 'Accept RAM Invitation', icon: 'ram' },
  { id: 'quicksight', label: 'Create QuickSight', icon: 'quicksight' },
  { id: 'lakeformation', label: 'Lake Formation Perms', icon: 'lakeformation' },
] as const;

export const SERVICE_TYPES = [
  { type: 'lambda', label: 'Lambda', color: '#FF8C00', icon: 'lambda' },
  { type: 'lex', label: 'Lex Bot', color: '#448AFF', icon: 'lex' },
  { type: 'queue', label: 'Queue', color: '#B388FF', icon: 'queue' },
  { type: 'prompt', label: 'Prompt', color: '#FFBF00', icon: 'prompt' },
  { type: 'hours', label: 'Hours of Op', color: '#FF3D00', icon: 'hours' },
  { type: 'connect-flow', label: 'Contact Flow', color: '#00E676', icon: 'connect-flow' },
  { type: 'module', label: 'Module', color: '#00BCD4', icon: 'module' },
] as const;

export const EXTRACTORS = [
  { id: 'lambda', label: 'LambdaSnapshotExtractor', output: 'config JSON + code ZIP', color: '#FF8C00' },
  { id: 'lex', label: 'LexSnapshotExtractor', output: 'bot export ZIP', color: '#448AFF' },
  { id: 'queue', label: 'QueueSnapshotExtractor', output: 'queue config JSON', color: '#B388FF' },
  { id: 'prompt', label: 'PromptSnapshotExtractor', output: 'metadata JSON + WAV', color: '#FFBF00' },
  { id: 'hours', label: 'HoursOfOperationExtractor', output: 'schedule JSON', color: '#FF3D00' },
  { id: 'module', label: 'ModuleSnapshotExtractor', output: 'module config', color: '#00BCD4' },
] as const;

export const ACCOUNTS = {
  source: {
    label: 'SOURCE',
    accountId: '111111111111',
    instanceId: '183babc4-ab9e-458e-96e0-08ace6ca048b',
    color: '#448AFF',
  },
  target: {
    label: 'TARGET',
    accountId: '222222222222',
    instanceId: '9540a0b6-2aa3-4d8a-b39a-0603137ba5ff',
    color: '#00E676',
  },
} as const;

export const SAMPLE_ARNS = {
  lambda: 'arn:aws:lambda:us-east-1:111111111111:function:lookupCustomer',
  lex: 'arn:aws:lex:us-east-1:111111111111:bot-alias/ABCDEF/GHIJKL',
  flow: 'arn:aws:connect:us-east-1:111111111111:instance/183babc4/contact-flow/6c0921ae',
  queue: 'arn:aws:connect:us-east-1:111111111111:instance/183babc4/queue/f4b30567',
  prompt: 'arn:aws:connect:us-east-1:111111111111:instance/183babc4/prompt/d0aae932',
  hours: 'arn:aws:connect:us-east-1:111111111111:instance/183babc4/operating-hours/c4a3ac02',
} as const;

export const TARGET_ARNS = {
  lambda: 'arn:aws:lambda:us-east-1:222222222222:function:lookupCustomer',
  lex: 'arn:aws:lex:us-east-1:222222222222:bot-alias/XYZABC/NEWALIS',
  flow: 'arn:aws:connect:us-east-1:222222222222:instance/9540a0b6/contact-flow/6c0921ae',
  queue: 'arn:aws:connect:us-east-1:222222222222:instance/9540a0b6/queue/f4b30567',
  prompt: 'arn:aws:connect:us-east-1:222222222222:instance/9540a0b6/prompt/d0aae932',
  hours: 'arn:aws:connect:us-east-1:222222222222:instance/9540a0b6/operating-hours/c4a3ac02',
} as const;

export const FLOW_TIERS = [
  { id: 'basic', label: 'Basic', desc: 'Resources only', color: '#448AFF' },
  { id: 'enhanced', label: 'Enhanced', desc: 'Isolated S3 + instance', color: '#FFBF00' },
  { id: 'advanced', label: 'Advanced', desc: 'Resources + Flows + Data Lake', color: '#00D4AA' },
] as const;

export const SPRING_CONFIG = {
  damping: 15,
  mass: 0.5,
  stiffness: 80,
} as const;

export const SPRING_FAST = {
  damping: 20,
  mass: 0.3,
  stiffness: 120,
} as const;
