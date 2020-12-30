const audio = document.querySelector("audio");
const songsList = document.querySelector("#songs-list");
const playButton = document.querySelector(".play-button");
const currentSong = document.querySelector("#current-song");

// Songs
const songs = [];

for (songName of ["a", "b", "c"]) {
  const songID = Math.random().toString(36).substring(7);

  const song = {
    songID,
    songName,
    song: new Audio(`${songName}.mp3`),
  };
  songs.push(song);
  createSongItem(song);
}

var runningTime;

function playSong(event) {
  const clickedSong = songs.filter((song) => {
    return event.target.parentNode.parentNode.classList[0] === song.songID;
  });

  if (event.target.classList[1] === "fa-pause") {
    clickedSong[0].song.pause();
    event.target.className = "fa fa-play";
    clearInterval(runningTime);
  } else {
    songs.map((song) => {
      song.song.pause();
    });

    Array.from(songsList.childNodes).map((songItem) => {
      songItem.childNodes[2].firstChild.className = "fa fa-play";
    });

    clickedSong[0].song.play();

    function s() {
      console.log(clickedSong[0].song.currentTime);
    }

    runningTime = setInterval(s, 1000);

    currentSong.childNodes[1].innerHTML = `${clickedSong[0].songName}`;

    event.target.className = "fa fa-pause";
  }
}

function createSongItem(song) {
  const { songID, songName } = song;

  songsList.innerHTML += `<div class='${songID} song-item'><p>${songName}</p>
            <button onclick="playSong(event)"><i class="fa fa-play" aria-hidden="true"></i>
            </button>
            <div class="song-cover"><img src=${songName + ".jpg"} /></div>
        </div>`;
}
