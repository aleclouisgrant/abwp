# A Better Web Player (abwp)
A Better Web Player (abwp) is being developed as an extension of MPEG-DASH that allows for multiple, concurrent audio 
and video channels to be live streamed to a web application of choice. The goal is to package multiple video and audio 
channels in a single packet that can be toggled and muted as the end user wishes. 

Example: </br>
A user is live streaming a tennis game and would like to continue to hear the sound of the game, but mutes the commentators' 
audio. He also wishes to watch from his player of choice's side, so he selects his video to come from that designated video
feed. 

Sending multiple video outputs at once is seemingly a large overhead so until a better design is worked through, abwp will be 
focusing on multiple audio channels only. This will introduce some overhead but offer a variety of interesting choices for 
content providers. 

Example: </br>
- multiple language support 
- separate commentary channel on sports events
- separate background music channel for streams

## Processing Workflow
Video and audio are recorded via OBS -> </br>
-> OBS outputs to an mp4 file -> </br>
tbd
