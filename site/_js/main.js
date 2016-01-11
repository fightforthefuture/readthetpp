(function (doc, win) {
    "use strict";

    var util = {

        share: function() {
            var baseUrl = 'https://www.facebook.com/sharer/sharer.php?u=';

            var fbUrl = window.location.protocol + '//' + window.location.host; // + window.location.pathname;

            var url = baseUrl + encodeURIComponent(fbUrl);

            window.open(url, 'share_fb', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        },

        tweet: function() {
            // var url = window.location.protocol + '//' + window.location.host + window.location.pathname;
            var url = window.location.host;

            var tweet = document.querySelector('meta[name="twittertext"]');
            tweet = (tweet ? tweet.content : '') + ' ' + url;

            window.open('https://twitter.com/intent/tweet?text='+tweet, 'share_tw', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        },

        google_plus: function() {
            var url = window.location.protocol + '//' + window.location.host;
            window.open('https://plus.google.com/share?url='+url, 'share_gl', 'width=500, height=300, toolbar=no, status=no, menubar=no');
        }
    }


    var showNav = document.querySelector('nav > a');
    var nav     = document.querySelector('nav > ul');

    if (showNav)
        showNav.addEventListener('click', function(e) {
            e.preventDefault();

            if (nav.className == 'visible') {
                nav.className = '';
                showNav.textContent = 'Chapters ►';
            } else {
                nav.className = 'visible';
                showNav.textContent = 'Chapters ▼';
            }
        });

    var fb = document.querySelectorAll('button.facebook');
    for (var i = 0; i < fb.length; i++) {
        fb[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.share();
        }, false);
    }

    var tw = document.querySelectorAll('button.twitter');
    for (var i = 0; i < tw.length; i++) {
        tw[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.tweet();
        }, false);
    }

    var gl = document.querySelectorAll('button.google');
    for (var i = 0; i < gl.length; i++) {
        gl[i].addEventListener('click', function(e) {
            e.preventDefault();
            util.google_plus();
        }, false);
    }

})(document, window);

var displayAnnotations = function() {
    if (!window['com.genius.Genius'])
        return alert('Still loading! Try again in a sec.');

    window['com.genius.Genius'].display_annotation()
}
