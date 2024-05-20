import React, { useState, useRef, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';


const playMouseClickSound = () => {
  const mouseclick = new Audio('https://uploads.sitepoint.com/wp-content/uploads/2023/06/1687569402mixkit-fast-double-click-on-mouse-275.wav');
  mouseclick.play();
};

const songs =[
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/1.mp3',
    displayName: 'Yıldız Tozu',
    artist: 'Ozbi',
    cover: 'https://images.genius.com/ee202c6f724ffd4cf61bd01a205eeb47.1000x1000x1.jpg',
  },
     {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/2.mp3',
    displayName: 'You\'re Somebody Else',
    artist: 'flora cash',
    cover: 'https://pbs.twimg.com/media/D2NZH-2U4AAL9Xs.jpg',
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/3.mp3',
    displayName: 'Powerless',
    artist: 'Linkin Park',
    cover: 'https://images.genius.com/c5a58cdaab9f3199214f0e3c26abbd0e.1000x1000x1.jpg',
  },
  {
    path: 'https://raw.githubusercontent.com/ustabasiibrahim/music-player/master/assets/music/4.mp3',
    displayName: 'Seni Dert Etmeler',
    artist: 'Madrigal',
    cover: 'https://img.freepik.com/free-photo/fresh-yellow-daisy-single-flower-close-up-beauty-generated-by-ai_188544-15543.jpg',
  },


  {
   

   
    path: 'https://audio.jukehost.co.uk/m9rKFdjU7Zy3j29TTv96fwSiFCLd4DJt.mp3',
    cover: 'https://iili.io/HDjIDep.png',
    
   
  },
  {
   
    cover: 'https://iili.io/H1hGdV2.jpg',
    path: 'https://audio.jukehost.co.uk/XMq8hSwgPKbHkY4srMhPWEFqHSigxcNQ.mp3',
  
  },
  {
   
    cover: 'https://iili.io/H1hGJol.jpg',
    path: 'https://audio.jukehost.co.uk/FamrE48qfWUNWmskzgBfiFW5mbaSUCG7.mp3',
   
  },

  {
  
    cover: 'https://iili.io/H1hEyNf.jpg',
    path: 'https://audio.jukehost.co.uk/kmMdEcT0mVFDBlkcf1ZoydqaM19deMJ1.mp3',

  },

  {
    
    cover: 'https://iili.io/H1hGFK7.jpg',
    path: 'https://audio.jukehost.co.uk/9t8OuMg1bqsR0JtyADcqKaXbTaLvGOkl.mp3',
  
  },
  {
   
    cover: 'https://iili.io/H1hGKl9.jpg',
    path: 'https://audio.jukehost.co.uk/cXSnf1QxAl4N7keT52hTID5wZC8Nmfu1.mp3',
  
  },
  {
    
    cover: 'https://iili.io/H1hG2PS.jpg',
    path: 'https://audio.jukehost.co.uk/k1H7J0lBSzjvK8pGe5pb3lPJeBCfcJUz.mp3',
  
  },
  {
   
    cover: 'https://iili.io/H1hGfSe.jpg',
    path: 'https://audio.jukehost.co.uk/w5el9uHEuw5yFJ1dPjeP5lMO78BbtRdr.mp3',
    
  },
  {
    
    cover: 'https://iili.io/H1hGCAb.jpg',
    path: 'https://audio.jukehost.co.uk/hhWaUJpcCrCCPi1S2wWup9uL1uVNjvOb.mp3',
   
  },
  {
   
    cover: 'https://iili.io/H1hGBHu.jpg',
    path: 'https://audio.jukehost.co.uk/X2kcaQZROQIikDD5P65ZetiaqdrZNX77.mp3',
   
  }
];

function getRandomLikes() {
  return Math.floor(Math.random() * (50 - 1000 + 1)) + 1000;
}

function getRandomIndex() {
  return Math.floor(Math.random() * songs.length);
}

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(getRandomIndex());
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCounts, setLikesCounts] = useState<{ [key: number]: number }>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };

  const playRandomSong = () => {
    const randomIndex = getRandomIndex();
    setCurrentSongIndex(randomIndex);
    setIsLiked(false);
    if (!Object.prototype.hasOwnProperty.call(likesCounts, randomIndex)) {
      setLikesCounts((prevLikesCounts) => ({
        ...prevLikesCounts,
        [randomIndex]: getRandomLikes()
      }));
    }
  };

  const playPreviousSong = () => {
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsLiked(false);
    if (!Object.prototype.hasOwnProperty.call(likesCounts, prevIndex)) {
      setLikesCounts((prevLikesCounts) => ({
        ...prevLikesCounts,
        [prevIndex]: getRandomLikes()
      }));
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCounts((prevLikesCounts) => ({
      ...prevLikesCounts,
      [currentSongIndex]: isLiked ? prevLikesCounts[currentSongIndex] - 1 : prevLikesCounts[currentSongIndex] + 1
    }));
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (!Object.prototype.hasOwnProperty.call(likesCounts, currentSongIndex)) {
      setLikesCounts((prevLikesCounts) => ({
        ...prevLikesCounts,
        [currentSongIndex]: getRandomLikes()
      }));
    }
  }, [currentSongIndex, likesCounts]);

  return (
    <div 
    role="button"
    tabIndex={0} // This allows the element to receive keyboard focus
    onMouseDown={playMouseClickSound}
     className="App" style={{ backgroundColor: 'black', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <img
        src={songs[currentSongIndex].cover}
        alt="Song Cover"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <audio
        ref={audioRef}
        src={songs[currentSongIndex].path}
        autoPlay
        controls={false}
      >
        {/* Empty track element for captions */}
        <track kind="captions" />
      </audio>
      <div style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer' }}>
        <FaHeart
          className="jhgihihih"
          size={30}
          color={isLiked ? 'red' : 'white'}
          onClick={toggleLike}
          style={{ marginRight: 5 }}
        />
        <span style={{ color: 'white' }}>{likesCounts[currentSongIndex]}</span>
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)' }}>
        <button type="button" onClick={togglePlayPause} style={{ width: 50, height: 50, borderRadius: '50%', border: 'none', backgroundColor: 'white', cursor: 'pointer' }}>
          {isPlaying ? (
           <svg
           version="1.1"
           id="Uploaded to svgrepo.com"
           xmlns="http://www.w3.org/2000/svg"
           xmlnsXlink="http://www.w3.org/1999/xlink"
           viewBox="0 0 32 32"
           xmlSpace="preserve"
           fill="#000000"
         >
           <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
           <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
           <g id="SVGRepo_iconCarrier">
             <style type="text/css">
               {`
                 .pictogram_een{fill:#ffffff;}
                 .pictogram_twee{fill:#ffffff;}
                 .pictogram_vijf{fill:#01A59C;}
                 .pictogram_zes{fill:#0C6667;}
                 .st0{fill:#E54D2E;}
                 .st1{fill:#F27261;}
                 .st2{fill:none;}
                 .st3{clip-path:url(#SVGID_2_);fill:#F27261;}
                 .st4{clip-path:url(#SVGID_2_);fill:none;}
                 .st5{clip-path:url(#SVGID_6_);fill:#F4D6B0;}
                 .st6{clip-path:url(#SVGID_8_);fill:#F27261;}
                 .st7{clip-path:url(#SVGID_8_);fill:none;}
                 .st8{clip-path:url(#SVGID_10_);fill:#F27261;}
                 .st9{clip-path:url(#SVGID_10_);fill:none;}
                 .st10{fill:#F4D6B0;}
               `}
             </style>
             <g>
               <path className="pictogram_twee" d="M16,28C9.373,28,4,22.627,4,16S9.373,4,16,4V28z"/>
               <path className="pictogram_een" d="M16,28c6.627,0,12-5.373,12-12S22.627,4,16,4V28z"/>
               <path className="pictogram_vijf" d="M28,16c0-6.627-5.373-12-12-12V0c8.837,0,16,7.163,16,16s-7.163,16-16,16v-4 C22.627,28,28,22.627,28,16z"/>
               <path className="pictogram_zes" d="M16,28v4C7.163,32,0,24.837,0,16S7.163,0,16,0v4C9.373,4,4,9.373,4,16C4,22.627,9.373,28,16,28z M21,20v-8c0-0.828-0.671-1.5-1.5-1.5S18,11.172,18,12v8c0,0.828,0.671,1.5,1.5,1.5S21,20.828,21,20z M14,20v-8 c0-0.828-0.671-1.5-1.5-1.5S11,11.172,11,12v8c0,0.828,0.671,1.5,1.5,1.5S14,20.828,14,20z"/>
             </g>
           </g>
         </svg>
          ) : (
            <svg
    version="1.1"
    id="Uploaded to svgrepo.com"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
    fill="#000000"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier">
      <style type="text/css">
        {`
          .pictogram_een{fill:#ffffff;}
          .pictogram_twee{fill:#ffffff;}
          .pictogram_vijf{fill:#01A59C;}
          .pictogram_zes{fill:#0C6667;}
          .st0{fill:#E54D2E;}
          .st1{fill:#F27261;}
          .st2{fill:none;}
          .st3{clip-path:url(#SVGID_2_);fill:#F27261;}
          .st4{clip-path:url(#SVGID_2_);fill:none;}
          .st5{clip-path:url(#SVGID_6_);fill:#F4D6B0;}
          .st6{clip-path:url(#SVGID_8_);fill:#F27261;}
          .st7{clip-path:url(#SVGID_8_);fill:none;}
          .st8{clip-path:url(#SVGID_10_);fill:#F27261;}
          .st9{clip-path:url(#SVGID_10_);fill:none;}
          .st10{fill:#F4D6B0;}
        `}
      </style>
      <g>
        <path className="pictogram_twee" d="M16,28C9.373,28,4,22.627,4,16S9.373,4,16,4V28z"/>
        <path className="pictogram_een" d="M16,28c6.627,0,12-5.373,12-12S22.627,4,16,4V28z"/>
        <path className="pictogram_zes" d="M4,16C4,9.373,9.373,4,16,4V0C7.163,0,0,7.163,0,16s7.163,16,16,16v-4C9.373,28,4,22.627,4,16z"/>
        <path className="pictogram_vijf" d="M28,16c0-6.627-5.373-12-12-12V0c8.837,0,16,7.163,16,16s-7.163,16-16,16v-4 C22.627,28,28,22.627,28,16z"/>
        <g>
          <g>
            <path className="pictogram_zes" d="M14.232,21c-0.384,0-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121l2.476-2.476 l-2.476-2.476c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0l4.597,4.597l-4.597,4.597C15,20.854,14.616,21,14.232,21z"/>
          </g>
          <g>
            <path className="pictogram_zes" d="M14.232,21c-0.384,0-0.768-0.146-1.061-0.439c-0.586-0.586-0.586-1.535,0-2.121l2.476-2.476 l-2.476-2.476c-0.586-0.586-0.586-1.535,0-2.121s1.535-0.586,2.121,0l4.597,4.597l-4.597,4.597C15,20.854,14.616,21,14.232,21z"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
          )}
        </button>
      </div>
      <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <button  type="button" id='nextbuttonsongs' onClick={playPreviousSong} style={{ color: 'white', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Back</button>
      </div>
      <div style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <button type="button" id='nextbuttonsongs' onClick={playRandomSong} style={{ color: 'white', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>Next</button>
      </div>
    </div>
  );
}

export default App;
