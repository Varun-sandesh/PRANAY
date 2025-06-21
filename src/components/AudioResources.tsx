import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, SkipForward, SkipBack, Youtube } from 'lucide-react';

interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  type: 'meditation' | 'nature' | 'music';
  url: string;
}

const AudioResources: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const tracks: AudioTrack[] = [
    {
      id: '1',
      title: 'Ocean Waves Meditation',
      duration: '10:00',
      type: 'meditation',
      url: '/audio/ocean-waves.mp3'
    },
    {
      id: '2',
      title: 'Forest Sounds',
      duration: '15:00',
      type: 'nature',
      url: '/audio/forest-sounds.mp3'
    },
    {
      id: '3',
      title: 'Calming Piano',
      duration: '8:30',
      type: 'music',
      url: '/audio/calming-piano.mp3'
    }
  ];

  const youtubeVideos = [
    {
      id: 'ZToicYcHIOU',
      title: '10 Minute Guided Meditation',
      thumbnail: 'https://img.youtube.com/vi/ZToicYcHIOU/maxresdefault.jpg'
    },
    {
      id: 'inpok4MKVLM',
      title: 'Breathing Exercise for Anxiety',
      thumbnail: 'https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg'
    },
    {
      id: 'O-6f5wQXSu8',
      title: 'Sleep Meditation',
      thumbnail: 'https://img.youtube.com/vi/O-6f5wQXSu8/maxresdefault.jpg'
    }
  ];

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    // In a real app, you would load and play the actual audio file
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // In a real app, you would control the actual audio playback
  };

  const getTrackIcon = (type: string) => {
    const icons = {
      meditation: '🧘',
      nature: '🌿',
      music: '🎵'
    };
    return icons[type as keyof typeof icons] || '🎵';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 dark:from-gray-900 dark:to-purple-900 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-200 mb-2">
            Audio & Mindfulness Resources
          </h1>
          <p className="text-indigo-600 dark:text-indigo-300">
            Relax and unwind with our curated collection of calming sounds and guided meditations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Audio Player */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200 mb-6">
              Audio Library
            </h2>

            {/* Current Track Display */}
            {currentTrack && (
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {currentTrack.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {currentTrack.duration}
                    </p>
                  </div>
                  <span className="text-2xl">{getTrackIcon(currentTrack.type)}</span>
                </div>

                {/* Player Controls */}
                <div className="flex items-center justify-center space-x-4">
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <SkipBack className="h-5 w-5" />
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <SkipForward className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>2:30</span>
                    <span>{currentTrack.duration}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Track List */}
            <div className="space-y-3">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                    currentTrack?.id === track.id
                      ? 'bg-purple-50 dark:bg-purple-900 border-purple-200 dark:border-purple-700'
                      : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => playTrack(track)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{getTrackIcon(track.type)}</span>
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">
                          {track.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {track.duration}
                        </p>
                      </div>
                    </div>
                    <Play className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Videos */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Youtube className="h-6 w-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                Guided Meditations
              </h2>
            </div>

            <div className="space-y-4">
              {youtubeVideos.map((video) => (
                <div
                  key={video.id}
                  className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-600 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">
                      {video.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioResources;