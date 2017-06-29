document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

var webPlayer;
var playButton;
var volButton;
var fullscreenButton;

var playButtonImg;
var volButtonImg;
var fullscreenButtonImg;

var volSlider;

var isFullScreened = false;
var vol = 1;

function initializeWebPlayer() {
    webPlayer = document.getElementById("player-video");
    playButton = document.getElementById("play-button");
    volButton = document.getElementById("vol-button");
    fullscreenButton = document.getElementById("fullscreen-button");

    playButtonImg = document.getElementById("play-button-img");
    volButtonImg = document.getElementById("vol-button-img");
    fullscreenButtonImg = document.getElementById("fullscreen-button-img");

    webPlayer.controls = false;
}

function togglePlayPause() { 
    if (webPlayer.paused) {
        webPlayer.play();
        playButtonImg.src = "Graphics/pause.png";
        playButton.title = "Pause";
    }
    else { 
        webPlayer.pause(); 
        playButtonImg.src = "Graphics/play.png";
        playButton.title = "Play";
    }
} 

function toggleMute() {
    if (webPlayer.muted){
        webPlayer.muted = false;
        webPlayer.volume = vol;
        volButton.title = "Mute";
        volButtonImg.src = "Graphics/vol.png"
    }
    else {
        webPlayer.muted = true;
        webPlayer.volume = 0;
        volButton.title = "Unmute";
        volButtonImg.src = "Graphics/muted.png"
    }
}

function toggleFullscreen() {
    if (webPlayer.requestFullscreen) {
      webPlayer.enterFullscreen();
    } else if (webPlayer.msRequestFullscreen) {
      webPlayer.msRequestFullscreen();
    } else if (webPlayer.mozRequestFullScreen) {
      webPlayer.mozRequestFullScreen();
    } else if (webPlayer.webkitRequestFullscreen) {
        webPlayer.webkitRequestFullscreen();
    }
}
