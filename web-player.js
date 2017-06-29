document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

var webPlayer;
var audioPlayer;

var playButton;
var volButton;
var audioSourceButton;
var fullscreenButton;

var playButtonImg;
var volButtonImg;
var fullscreenButtonImg;

var volSlider;

var isFullScreened = false;
var vol = 1;

function initializeWebPlayer() {
    webPlayer = document.getElementById("player-video");
    audioPlayer = document.getElementById("player-audio");

    playButton = document.getElementById("play-button");
    volButton = document.getElementById("vol-button");
    audioSourceButton = document.getElementById("audio-source-button");
    fullscreenButton = document.getElementById("fullscreen-button");

    playButtonImg = document.getElementById("play-button-img");
    volButtonImg = document.getElementById("vol-button-img");
    fullscreenButtonImg = document.getElementById("fullscreen-button-img");

    webPlayer.controls = false;
}

function togglePlayPause() { 
    if (webPlayer.paused) { //play
        webPlayer.play();
        playButtonImg.src = "Graphics/pause.png";
        playButton.title = "Pause";

        audioPlayer.play();
    }
    else { //pause 
        webPlayer.pause(); 
        playButtonImg.src = "Graphics/play.png";
        playButton.title = "Play";
        
        audioPlayer.pause();
    }
} 

function toggleMute() {
    if (webPlayer.muted) { //unmute

        webPlayer.muted = false;
        webPlayer.volume = vol;
        volButton.title = "Mute";
        volButtonImg.src = "Graphics/vol.png"

        //syncs audio
        audioPlayer.currentTime = webPlayer.currentTime;
        audioPlayer.play();
    }
    else { //mute
        webPlayer.muted = true;
        webPlayer.volume = 0;
        volButton.title = "Unmute";
        volButtonImg.src = "Graphics/muted.png"

        //pause audio
        audioPlayer.pause();
    }
}

function toggleAudio() {
    if (audioPlayer.paused) { //unmute
        audioPlayer.currentTime = webPlayer.currentTime;
        audioPlayer.play();
    } 
    else { //mute
        audioPlayer.pause();
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
