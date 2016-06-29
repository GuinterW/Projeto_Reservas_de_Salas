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
    $('#username').val(userName);
    $('.profile-img').prop('src', userImage);
    window.location.replace('http://localhost:9000/index.html');
}