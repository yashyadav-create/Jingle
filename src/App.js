import React, { useState, useRef } from 'react';
import Player from './components/Player';
import Song from './components/Song';
import './styles/app.scss';
import data from "./data";
import Library from './components/Library';
import Nav from './components/Nav'
function App() {
  //reference
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  //state for chekcing whether our library is open or not
  const [libraryStatus, setLibraryStatus] = useState(false);
  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({ ...songInfo, currentTime: current, duration: duration })
  };
  const songEndhandler = async () =>{
    let currentIndex=songs.findIndex((song) => song.id === currentSong.id);
       await setCurrentSong(songs[(currentIndex+1) % songs.length]);
       if(isPlaying) audioRef.current.play();
    
  }
  return (

    <div className={`App ${libraryStatus?'library-active':''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
      setSongs={setSongs}
        songs={songs}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong} />
      <audio onEnded={songEndhandler} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
