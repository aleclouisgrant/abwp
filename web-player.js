document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

var webPlayer;
var playButton;
var volButton;
var fullscreenButton;

var vol = 1;

function initializeWebPlayer() {
    webPlayer = document.getElementById("player-video"); 
    playButton = document.getElementById("play-button");
    volButton = document.getElementById("vol-button");
    fullscreenButton = document.getElementById("fullscreen-button");

    webPlayer.controls = false;
}

function togglePlayPause() { 
    if (webPlayer.paused) 
        webPlayer.play(); 
    else 
        webPlayer.pause(); 
} 

function toggleMute() {
    if (webPlayer.muted){
        webPlayer.muted = false;
        webPlayer.volume = vol;
        volButton.innerHTML = "Mute";
    }
    else {
        webPlayer.muted = true;
        webPlayer.volume = 0;
        volButton.innerHTML = "Unmute";
    }
}

function toggleFullscreen() {
    
}
