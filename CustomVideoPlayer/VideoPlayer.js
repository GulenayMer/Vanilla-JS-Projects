// 

const video = document.getElementById("video");
const play = document.getElementById("play");
const stops = document.getElementById("stop");
const timeStamp = document.getElementById("timestamp");
const progress = document.getElementById("progress");



//------------------ Functions ------------------------------

// play and pause video
function changeVideoStatus(){
    if (video.paused){
        video.play();
    } else {
        video.pause();
    }
};

// update play/pause icon
function updatePlayIcon(){
    if(video.paused){
    play.innerHTML = '<i class ="fa fa-play fa-2x"></i>'
} else {
    play.innerHTML = '<i class ="fa fa-pause fa-2x"></i>'
}
};

// Update progress and timestamp
function updateProgress(){
   progress.value = (video.currentTime / video.duration) * 100;

   // Get minutes
   let minutes = Math.floor(video.currentTime / 60);
   if(minutes < 10){
       minutes = '0' + String(minutes);
   };

   // Get seconds
   let seconds = Math.floor(video.currentTime % 60);
   if(seconds < 10){
       minutes = '0' + String(seconds);
   };

   timeStamp.innerHTML = `${minutes}:${seconds}`;

};


// Set video time to progress
function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration) * 100;
};

// ---------------- Event Listeners ------------------------

// when click on the video screen, the video will start to play
// click again it will pause
video.addEventListener("click", changeVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);


// when click on the play button, the video will start to play
// the play button will turn to a pause button
// timestamp will stay at the point where the video is
play.addEventListener("click", changeVideoStatus);


// when click on the stop button, the video will stop
stops.addEventListener("click", function(){
   video.currentTime = 0;
   video.pause();
})

// 
progress.addEventListener("change", setVideoProgress);