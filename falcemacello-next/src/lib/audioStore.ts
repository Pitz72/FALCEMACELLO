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
  
  // Actions
  setTracks: (tracks: Track[]) => void;
  setCurrentTrackIndex: (index: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
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

  setTracks: (tracks) => set({ tracks }),
  setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setIsMuted: (isMuted) => set({ isMuted }),
  setVolume: (volume) => set({ volume }),
  
  nextTrack: () => set((state) => ({
    currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length
  })),
  
  prevTrack: () => set((state) => ({
    currentTrackIndex: (state.currentTrackIndex - 1 + state.tracks.length) % state.tracks.length
  })),
}));
