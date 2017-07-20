document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

// if you want to test if a function is being called, you can
// put this line somewhere in the function:
//new Audio("ding.mp3").play();

var videoPlayer;
var audioGamePlayer;
var audioMusPlayer;
var audioComPlayer;

var playButton;
var volButton;
var audioButton;
var gameButton;
var musButton;
var comButton;
var fullscreenButton;

var playButtonImg;
var volButtonImg;
var audioButtonImg;
var fullscreenButtonImg;

var volSlider;
var audioSlider;
var gameSlider;
var musSlider;
var comSlider;

var isFullScreened;
var isAudioMuted;

var vol;
var audioVol;
var gameVol;
var musVol;
var comVol;

var audioPlayers;

function initializeWebPlayer() {
    videoPlayer = document.getElementById("player-video");
    audioPlayerGame = document.getElementById("player-audio-game");
    audioPlayerMus = document.getElementById("player-audio-mus");
    audioPlayerCom = document.getElementById("player-audio-com");

    playButton = document.getElementById("play-button");
    volButton = document.getElementById("vol-button");
    audioSourceButton = document.getElementById("audio-source-button");
    fullscreenButton = document.getElementById("fullscreen-button");

    playButtonImg = document.getElementById("play-button-img");
    volButtonImg = document.getElementById("vol-button-img");
    fullscreenButtonImg = document.getElementById("fullscreen-button-img");

    volSlider = document.getElementById("volume-slider");
    audioSlider = document.getElementById("audio-slider");

    isFullScreened = false;
    isAudioMuted = false;

    vol = 1;
    vidVol = 1;
    audioVol = 1;

    videoPlayer.controls = false;

    audioPlayers = [audioPlayerGame, audioPlayerMus, audioPlayerCom];
    //get number of audio sources and initialize them all
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
    if (videoPlayer.paused) { //play
        videoPlayer.play();
        playButtonImg.src = "Graphics/pause.png";
        playButton.title = "Pause";

        if(!isAudioMuted)
            audioPlayer.play();
    }
    else { //pause
        videoPlayer.pause();
        playButtonImg.src = "Graphics/play.png";
        playButton.title = "Play";

        audioPlayer.pause();
    }
}

function toggleMute() {
    if (videoPlayer.muted) { //unmute

        videoPlayer.muted = false;
        videoPlayer.volume = vol;
        volButton.title = "Master Volume";
        volButtonImg.src = "Graphics/vol.png";

        //syncs audio
        if (!videoPlayer.paused){
            audioPlayer.currentTime = videoPlayer.currentTime;
            audioPlayer.play();
        }
    }
    else { //mute
        videoPlayer.muted = true;
        videoPlayer.volume = 0;
        volButton.title = "Unmute";
        volButtonImg.src = "Graphics/muted.png";

        //pause audio
        audioPlayer.paused = true;
    }
}

function changeMasterVol() {
    videoPlayer.muted = false;
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
    if (isAudioMuted && !videoPlayer.paused) { //unmute
        audioPlayer.currentTime = videoPlayer.currentTime;
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

function displayAudioSources() {
    var audioSources = document.getElementsByClassName("dropdown-content");
    if (audioSources[0].style.display == "none"){ //show
        for (var i = 0; i < audioSources.length; i++){
            audioSources[i].style.display = "block";
        }
    }
    else { //hide
        for (var i = 0; i < audioSources.length; i++){
            audioSources[i].style.display = "none";
        }
    }
}
function setAudioSource(audioSource) {
    curSource = document.getElementById(audioSource);

    audioSourceButtonImg.src = currSource.src;
    audioSource.slider = currSource.slider;
}

function toggleFullscreen() {

    if (isFullScreened) { //minimize
        videoPlayer.webkitExitFullScreen();
        fullscreenButton.title = "Fullscreen";
        fullscreenButtonImg.src = "Graphics/fs.png";
        isFullScreened = false;
    }
    else { //fullscreen
        if (videoPlayer.requestFullscreen) {
            videoPlayer.enterFullscreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequestFullscreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (videoPlayer.mozRequestFullScreen) {
            videoPlayer.mozRequestFullScreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (videoPlayer.webkitRequestFullscreen) {
            videoPlayer.webkitRequestFullscreen();
            fullscreenButton.title = "Minimize"
            //fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        }
    }
}

