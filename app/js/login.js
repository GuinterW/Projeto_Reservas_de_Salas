var userName = '';
var userImgage = '';
var userEmail = '';
$(document).ready(function(){
    console.log('hello');
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();
    userEmail = profile.getEmail();
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        userName = '';
        userImage = '';
        userEmail = '';     
    });
}