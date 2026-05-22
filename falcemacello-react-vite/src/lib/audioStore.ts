import { create } from 'zustand';

interface Track {
  title: string;
  url: string;
  duration: string;
}

interface AudioState {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  
  // Effetti sonori e progressi
  soundEffectsEnabled: boolean;
  currentTime: number;
  duration: number;
  audioAnalyzer: AnalyserNode | null;
  
  // Actions
  setTracks: (tracks: Track[]) => void;
  setCurrentTrackIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  setSoundEffectsEnabled: (enabled: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setAudioAnalyzer: (analyzer: AnalyserNode | null) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  tracks: [
    {
        title: "La voglia di (mastered)",
        url: "/audio/la-voglia-di-mastered.mp3",
        duration: "3:45",
    },
    {
        title: "La Ninnananna della Cenere e del Silenzio",
        url: "/audio/la-ninnananna-della-cenere-e-del-silenzio.mp3",
        duration: "4:12",
    },
    {
        title: "La Più Bella Canzone",
        url: "/audio/la-piu-bella-canzone.mp3",
        duration: "3:58",
    },
  ],
  currentTrackIndex: 0,
  isPlaying: false,
  isMuted: false,
  volume: 1,
  
  soundEffectsEnabled: true,
  currentTime: 0,
  duration: 0,
  audioAnalyzer: null,

  setTracks: (tracks) => set({ tracks }),
  setCurrentTrackIndex: (index) => set({ currentTrackIndex: index, currentTime: 0 }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
  
  setSoundEffectsEnabled: (soundEffectsEnabled) => set({ soundEffectsEnabled }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setAudioAnalyzer: (audioAnalyzer) => set({ audioAnalyzer }),
  
  nextTrack: () => set((state) => ({
    currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length,
    currentTime: 0
  })),
  
  prevTrack: () => set((state) => ({
    currentTrackIndex: (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length,
    currentTime: 0
  })),
}));
