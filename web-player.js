document.addEventListener("DOMContentLoaded", function() {initializeMediaPlayer(); }, false);

var mediaPlayer = document.getElementById('');
var playButton = document.getElementById('play-pause-button');
var volButton = document.getElementById('volume-button');

function initializeMediaPlayer() {
    mediaPlayer = document.getElementById('player-video');
    mediaPlayer.controls = false;
}
function togglePlayPause() {
    if (mediaPlayer.paused || mediaPlayer.ended){
        playButton.title = 'pause';
        playButton.innerHTML = 'pause';
        playButton.className = 'pause';
        mediaPlayer.play();
    }
    else {
        playButton.title = 'play';
        playButton.innerHTML = 'play';
        playButton.className = 'play';
        mediaPlayer.pause();
    }
}
function changeButtonType(btn, value) {
    btn.title= = value;
    btn.innerHTML = value;
    btn.className = value;
}

//Volume functions
function displayVolumeBar() {
}
function toggleMute() {
    if () {
        mediaPlayer.volume = ;

}

