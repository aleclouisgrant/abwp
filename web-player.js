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
var audioSlider;

var isFullScreened = false;
var isAudioMuted = false;

var vol = 1;
var audioVol = 1;

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
    audioSlider = document.getElementById("audio-slider");

    webPlayer.controls = false;
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

        if(!isAudioMuted)
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
        volButtonImg.src = "Graphics/vol.png";

        //syncs audio
        if (!webPlayer.paused){
            audioPlayer.currentTime = webPlayer.currentTime;
            audioPlayer.play();
        }
    }
    else { //mute
        webPlayer.muted = true;
        webPlayer.volume = 0;
        volButton.title = "Unmute";
        volButtonImg.src = "Graphics/muted.png";

        //pause audio
        audioPlayer.paused = true;
    }
}

function volSliderIn() { //TODO: pls fix jar
    //volSlider.style.visbility = 'visible';
}
function volSliderOut() {
    //volSlider.style.visibility = 'hidden';
}

function changeVol() {
    webPlayer.muted = false;
    vol = volSlider.value / 100;
    webPlayer.volume = vol;
    if (vol == 0)
        volButtonImg.src = "Graphics/muted.png";  
    else
        volButtonImg.src = "Graphics/vol.png"; 
}
function changeAudVol() {
    audioPlayer.paused = false;
    audioVol = audioSlider.value / 100;
    audioPlayer.volume = audioVol;
}

function toggleAudio() {
    if (isAudioMuted && !webPlayer.paused) { //unmute
        audioPlayer.currentTime = webPlayer.currentTime;
        audioPlayer.muted = false;
        audioPlayer.play();
        isAudioMuted = false;
    } 
    else { //mute
        audioPlayer.paused = true;
        audioPlayer.muted = true;
        isAudioMuted = true;
    }
}

function toggleFullscreen() {

    if (isFullScreened) { //minimize
        webPlayer.webkitExitFullScreen();
        fullscreenButton.title = "Fullscreen";
        fullscreenButtonImg.src = "Graphics/fs.png";
        isFullScreened = false;
    }
    else { //fullscreen
        if (webPlayer.requestFullscreen) {
            webPlayer.enterFullscreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (webPlayer.msRequestFullscreen) {
            webPlayer.msRequestFullscreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (webPlayer.mozRequestFullScreen) {
            webPlayer.mozRequestFullScreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (webPlayer.webkitRequestFullscreen) {
            webPlayer.webkitRequestFullscreen();
            fullscreenButton.title = "Minimize"
            //fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        }
    }
}

