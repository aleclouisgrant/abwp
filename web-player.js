document.addEventListener("DOMContentLoaded", initializeWebPlayer(), false);

//new Audio("ding.mp3").play();

var videoPlayer;

var playButton; //play/pause button
var volButton; //master volume button
var audioButton; //audio tracks button
var fullscreenButton; //fullscreen button

var playButtonImg; //play/pause button's img src
var volButtonImg; //volume button's img src
var fullscreenButtonImg; //fullscreen button's img src

var volSlider; //slider that controls master volume

var isFullScreened; //whether the player is fullscreened or not
var isAudioMuted; //whether the player's master volume is muted or not

var vol; //the value of the master volume [0-1]

var audioArray; //array of all available audio tracks
var gamTrack; //game audio track
var musTrack; //music audio track
var comTrack; //commentary audio track

function Track(audio, button, img, slider, volume, muted) {
    this.audio = audio; //the audio tag it corresponds to in html
    this.button = button; //the button that toggles mute
    this.img = img; //the img source of the button
    this.slider = slider; //the slider that controls volume
    this.volume = volume; //the volume of the audio track
    this.muted = muted; //whether the track is muted or not
}

function initializeWebPlayer() {

    videoPlayer = document.getElementById("player-video");

    gamTrack = new Track( //game audio track
        document.getElementById("audio-source-gam"), //audio
        document.getElementById("audio-button-gam"), //button
        document.getElementById("audio-img-gam"), //img
        document.getElementById("audio-slider-gam"), //slider
        document.getElementById("audio-volume-gam"), //volume
        false, //muted
    );
    musTrack = new Track( //music audio track
        document.getElementById("audio-source-mus"), //audio
        document.getElementById("audio-button-mus"), //button
        document.getElementById("audio-img-mus"), //img
        document.getElementById("audio-slider-mus"), //slider
        document.getElementById("audio-volume-mus"), //volume
        false, //muted
    );
    comTrack = new Track( //commentary audio track
        document.getElementById("audio-source-com"), //audio
        document.getElementById("audio-button-com"), //button
        document.getElementById("audio-img-com"), //img
        document.getElementById("audio-slider-com"), //slider
        document.getElementById("audio-volume-com"), //volume
        false, //muted
    );

    audioArray = [gamTrack, musTrack, comTrack];

    playButton = document.getElementById("play-button");
    playButtonImg = document.getElementById("play-button-img");

    volButton = document.getElementById("vol-button");
    volButtonImg = document.getElementById("vol-button-img");
    volSlider = document.getElementById("volume-slider");

    audioSourceButton = document.getElementById("audio-source-button");

    fullscreenButton = document.getElementById("fullscreen-button");
    fullscreenButtonImg = document.getElementById("fullscreen-button-img");

    isFullScreened = false;
    isAudioMuted = false;
    vol = 1;
    videoPlayer.controls = false; //if JS supported, turn off default controls
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

        if (!isAudioMuted) {
            for(var i = 0; i < audioArray.length; i++) {
                if (!audioArray[i].muted) {
                    audioArray[i].audio.play();
                }
            }
        }
    } else { //pause
        videoPlayer.pause();
        playButtonImg.src = "Graphics/play.png";
        playButton.title = "Play";

        for (var i = 0; i < audioArray.length; i++) {
            audioArray[i].audio.pause();
        }
    }
}

function toggleMasterMute() {
    if (videoPlayer.muted) { //ummute
        videoPlayer.muted = false;
        isAudioMuted = false;

        volButton.title = "Master Volume";
        volButtonImg.src = "Graphics/vol.png";

        //syncs audio with video
        if (!videoPlayer.paused) {
            for (var i = 0; i < audioArray.length; i++) {
                if (!audioArray[i].muted) {
                    //TODO: why doesnt this line work?
                    //audioArray[i].audio.volume = audioArray[i].volume;
                    audioArray[i].audio.currentTime = videoPlayer.currentTime;
                    audioArray[i].audio.play();
                }
            }
        }
    } else { //mute
        videoPlayer.muted = true;
        isAudioMuted = true;
        volButton.title = "Unmute";
        volButtonImg.src = "Graphics/muted.png";

        //mute all audio tracks
        for (var i = 0; i < audioArray.length; i++) {
            audioArray[i].audio.pause();
        }
    }
}
function changeMasterVol() {
    videoPlayer.muted = false;
    isAudioMuted = false;
    vol = volSlider.value / 100;
    videoPlayer.volume = vol;
    if (vol == 0) {
        volButtonImg.src = "Graphics/muted.png";
    } else {
        volButtonImg.src = "Graphics/vol.png";
    }

    //TODO: how should changing other audio tracks volume work?
}

function toggleMute(audioTrack) {
    if (!videoPlayer.muted) {
        if (audioTrack.audio.paused) { //unmute
            audioTrack.muted = false;
            //syncs audio
            if (!videoPlayer.paused) {
                audioTrack.audio.currentTime = videoPlayer.currentTime;
                audioTrack.audio.play();
            }
        } else { //mute
            audioTrack.muted = true;
            audioTrack.audio.pause();
        }
    }
}
function changeAudVol(audioTrack) {
    audioTrack.muted = false;
    audioTrack.volume = audioTrack.slider.value / 100;
    audioTrack.audio.volume = audioTrack.volume;
    audioTrack.audio.paused = false;
}

function displayAudioSources() {
    var audioSources = document.getElementsByClassName("dropdown-content");
    if (audioSources[0].style.display == "none") { //show
        for (var i = 0; i < audioSources.length; i++) {
            audioSources[i].style.display = "block";
        }
    } else { //hide
        for (var i = 0; i < audioSources.length; i++) {
            audioSources[i].style.display = "none";
        }
    }
}

function toggleFullscreen() {
    //TODO: hide cursor, hide controls after X seconds

    if (isFullScreened) { //minimize
        videoPlayer.webkitExitFullScreen();
        fullscreenButton.title = "Fullscreen";
        fullscreenButtonImg.src = "Graphics/fs.png";
        isFullScreened = false;
    } else { //fullscreen
        if (videoPlayer.requestFullscreen) {
            videoPlayer.enterFullscreen();
            fullscreenButton.title = "Minimize"
            fullscreenButtonImg.src = "Graphics/min.png";
            isFullScreened = true;
        } else if (videoPlayer.msRequestFullscreen) {
            videoPlayer.msRequesTFullscreen();
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
