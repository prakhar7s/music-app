import { songsNameList } from "./songs-name.js";

// targets
const songsList = document.querySelector("#songs-list");
const playingSongName = document.querySelector("#song-name");
const playingSongMovie = document.querySelector(".song-movie");
const playingSongCover = document.querySelector(".song-cover-image");
const pointer = document.querySelector("#pointer");

// Songs
const songs = [];

var songName;

for (songName of songsNameList) {
  const songID = Math.random().toString(36).substring(7);

  const song = {
    songID,
    songName,
    song: new Audio(`./assets/mp3/${songName}.mp3`),
    interwal: null,
  };
  songs.push(song);
  createSongItem(song);
}

// bind it to windows bacause using module based javascript
window.playSong = playSong;

function playSong(event) {
  // clicked song
  const clickedSong = songs.filter((song) => {
    return event.target.parentNode.parentNode.classList[0] === song.songID;
  });

  // if song is playing
  if (event.target.classList[1] === "fa-pause") {
    clickedSong[0].song.pause();
    event.target.className = "fa fa-play"; //change icon
    clearInterval(clickedSong[0].interwal); //clear the interwal
  } else {
    // if song is not playing
    // pause all song
    songs.map((song) => {
      song.song.pause();
      clearInterval(song.interwal); //clear all interwals
      song.interwal = null;
    });

    // clear playing styles from all songs
    Array.from(songsList.childNodes).map((songItem) => {
      songItem.childNodes[2].firstChild.className = "fa fa-play";
      songItem.classList.remove("active");
    });

    // apply playing styles only to clicked song
    event.target.parentNode.parentNode.classList.add("active");

    //play the song
    clickedSong[0].song.play();

    // add pause icon because song is playing
    event.target.className = "fa fa-pause";

    clickedSong[0].interwal = setInterval(function () {
      const { currentTime, duration } = clickedSong[0].song;
      pointer.style.left = `${(100 / duration) * currentTime}%`;

      if (currentTime >= duration) {
        clearInterval(clickedSong[0].interwal);
      }
    }, 1000);

    // add all info in player about the clicked song
    const songName = clickedSong[0].songName.replaceAll("-", " ");
    playingSongName.innerHTML = `${songName}`;
    playingSongMovie.innerHTML = `${songName}`;

    playingSongCover.src = `${
      "./assets/cover/" + clickedSong[0].songName + ".jpg"
    }`;
  }
}

function createSongItem(song) {
  const { songID, songName } = song;

  songsList.innerHTML += `<div class='${songID} song-item'><p class="song-list-name">${songName}</p>
            <button onclick="playSong(event)"><i class="fa fa-play" aria-hidden="true"></i>
            </button>
            <div class="song-cover"><img src=${
              "./assets/cover/" + songName + ".jpg"
            } /></div>
        </div>`;
}
