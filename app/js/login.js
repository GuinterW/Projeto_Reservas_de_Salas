var userName = '';
var userImgage = '';
var userEmail = '';

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    userName = profile.getName();
    userImage = profile.getImageUrl();
    userEmail = profile.getEmail();
    $('.profile-img').prop('src', userImage);
    setTimeout(function(){
        window.location.replace('http://localhost:9000/home');
    },500);
}

function renderButton() {
    gapi.signin2.render('my-signin2', {
        'width': 300,
        'height': 44,
        'onsuccess': onSignIn,
    });
}