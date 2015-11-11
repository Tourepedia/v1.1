/**
 * Created by Sudhir on 20-Jun-15.
 */

function MoveMyLabel(inputGroup){
    var label = _id(inputGroup[1]);
    label.classList.add('move-label');
}

function ResetLabel(inputGroup){
    var input = _id(inputGroup[0]);
    if(input.value == ""){
        var label = _id(inputGroup[1]);
        label.classList.remove('move-label');
    }
}

function LaunchDialog(idName){
    document.body.style.overflow = "hidden";
    var dialog = _id(idName);
    dialog.style.display = "flex";
    dialog.style.display = "-webkit-flex";
    dialog.style.display = "-ms-flexbox";

}

function CloseDialog(idName){
    document.body.style.overflow = "auto";
    var dialog = _id(idName);
    dialog.style.display = "none";
}



function ScrollToTop(){
    window.scrollTo(0,0);
}

/* bookkeeping stuff */
function _id(idName){
    return document.getElementById(idName);
}

window.onload = setUpFunction;
var notification;
function setUpFunction() {
    notification = document.getElementById("notification");
}
var notificationId;
function showNotification(notificationString, backgroundColor, duration) {
    notification.innerHTML = notificationString;
    notification.style.background = backgroundColor;
    notification.style.webkitAnimationDuration = duration.toString()+"s";
    notification.style.mozAnimationDuration = duration.toString()+"s";
    notification.style.msAnimationDuration = duration.toString()+"s";
    notification.style.animationDuration = duration.toString()+"s";
    notification.classList.add('play-animation');
    notificationId = setInterval(hideNotification, duration*1000);
}

function hideNotification(){
    notification.classList.remove('play-animation');
    clearInterval(notificationId);
}
