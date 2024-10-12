import React, { useState, useRef } from 'react';
import YouTube from 'react-youtube';

// Type for the YouTube player instance
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
}

const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

const songs = [
  {
    youtubeId: 'o7c5LxzmZvs',
    displayName: 'Yıldız Tozu',
    artist: 'Ozbi',
    cover: 'https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg',
  },
  {
    youtubeId: 'XO8wew38VM8',
    displayName: 'Yıldız Tozu',
    artist: 'Ozbi',
    cover: 'https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg',
  },
  // Add more songs here
];

function getRandomLikes() {
  return Math.floor(Math.random() * (50 - 1000 + 1)) + 1000;
}

function getRandomIndex() {
  return Math.floor(Math.random() * songs.length);
}

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(getRandomIndex());
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(false); // Using isLiked now
  const [likesCounts, setLikesCounts] = useState<{ [key: number]: number }>({});
  
  // Specify the type of the playerRef
  const playerRef = useRef<YouTubePlayer | null>(null); 

  const togglePlayPause = () => {
    setIsPlaying((prevState) => {
      const newState = !prevState;
      if (playerRef.current) {
        newState ? playerRef.current.playVideo() : playerRef.current.pauseVideo();
      }
      return newState;
    });
  };

  const playRandomSong = () => {
    const randomIndex = getRandomIndex();
    setCurrentSongIndex(randomIndex);
    setIsLiked(false);

    if (!likesCounts[randomIndex]) {
      setLikesCounts((prevLikesCounts) => ({
        ...prevLikesCounts,
        [randomIndex]: getRandomLikes(),
      }));
    }
  };

  const toggleLike = () => {
    setIsLiked((prevLiked) => {
      setLikesCounts((prevLikesCounts) => ({
        ...prevLikesCounts,
        [currentSongIndex]: prevLiked
          ? prevLikesCounts[currentSongIndex] - 1
          : prevLikesCounts[currentSongIndex] + 1,
      }));
      return !prevLiked;
    });
  };

  const handlePlayerReady = (event: any) => {
    playerRef.current = event.target; // Save player instance to reference
    if (isPlaying) {
      event.target.playVideo();
    } else {
      event.target.pauseVideo();
    }
  };

  const handleVideoEnd = () => {
    playRandomSong();
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsLiked(false);
  };

  const handlePreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsLiked(false);
  };

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      playsinline: 1,
      start: 0,
      origin: typeof window !== "undefined" ? window.location.origin : "",
    },
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onMouseDown={playMouseClickSound}
      className="App"
      style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Video Wrapper */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <YouTube
          videoId={songs[currentSongIndex].youtubeId}
          opts={opts}
          onReady={handlePlayerReady}
          onEnd={handleVideoEnd}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Like Button & Count */}
      <div className='blackwebnarsi'>
        <button onClick={toggleLike}>
          {isLiked ? 'Unlike' : 'Like'} {likesCounts[currentSongIndex] || 0}
        </button>
      </div>

      {/* Play/Pause Button */}
      <div className='posebuttonmusic' style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <button
          type="button"
          onClick={togglePlayPause}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      {/* Next Button */}
      <div className='nextbuttonsong'>
        <button
          type="button"
          onClick={handleNextSong}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            marginLeft: 10,
          }}
        >
          Next
        </button>
      </div>

      {/* Back Button */}
      <div className='backbuttonmusic'>
        <button
          type="button"
          onClick={handlePreviousSong}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            marginRight: 10,
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default App;
