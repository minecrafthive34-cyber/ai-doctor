type SoundName = 'click' | 'success' | 'error' | 'toggle_on' | 'toggle_off' | 'favorite';

const soundFiles: Record<SoundName, string> = {
  click: 'https://cdn.pixabay.com/audio/2022/03/15/audio_243179a454.mp3',
  success: 'https://cdn.pixabay.com/audio/2022/11/17/audio_8228531b61.mp3',
  error: 'https://cdn.pixabay.com/audio/2022/03/10/audio_b804555462.mp3',
  toggle_on: 'https://cdn.pixabay.com/audio/2021/08/04/audio_a54b358359.mp3',
  toggle_off: 'https://cdn.pixabay.com/audio/2021/08/04/audio_c384a86272.mp3',
  favorite: 'https://cdn.pixabay.com/audio/2022/01/21/audio_ea3b2f8151.mp3',
};

let audioContext: AudioContext | null = null;
const audioBuffers: Partial<Record<SoundName, AudioBuffer>> = {};
let isSoundEnabled = true;

const initAudioContext = () => {
  if (audioContext) return;
  try {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch (e) {
    console.error("Web Audio API is not supported in this browser.", e);
  }
};

const loadSound = async (name: SoundName, url: string) => {
  if (!audioContext || audioBuffers[name]) return;
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBuffers[name] = audioBuffer;
  } catch (e) {
    console.error(`Failed to load sound: ${name}`, e);
  }
};

export const userInteractionForAudio = () => {
    initAudioContext();
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
            // Preload sounds after context is running
            Object.entries(soundFiles).forEach(([name, url]) => {
                loadSound(name as SoundName, url);
            });
        });
    }
};

export const playSound = (name: SoundName) => {
  if (!isSoundEnabled || !audioContext || !audioBuffers[name]) {
    return;
  }
  
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }

  const source = audioContext.createBufferSource();
  source.buffer = audioBuffers[name]!;
  source.connect(audioContext.destination);
  source.start(0);
};

export const setSoundEnabled = (enabled: boolean) => {
  isSoundEnabled = enabled;
};
