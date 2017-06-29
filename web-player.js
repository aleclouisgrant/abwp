document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

// if you want to test if a function is being called, you can 
// put this line somewhere in the function: 
//new Audio("ding.mp3").play();

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

    volSlider = document.getElementById("volume-slider");

    webPlayer.controls = false;
    volSlider.style.visibility = 'hidden';
}

function videoHoverIn() {
    var playerControls = document.getElementsByClassName("player-controls");
    for (var i = 0; i < playerControls.length; i++) {
        playerControls[i].style.display = 'block';
    }
}

function videoHoverOut() {
    var playerControls = document.getElementsByClassName("player-controls");
    for (var i = 0; i < playerControls.length; i++) {
        playerControls[i].style.display = 'none';
    }
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

function volSliderIn() { //TODO: pls fix jar
    volSlider.style.visbility = 'visible';
    new Audio("ding.mp3").play();
}
function volSliderOut() {
    volSlider.style.visibility = 'hidden';
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
