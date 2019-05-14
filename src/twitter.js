/**
 * On Twitter, we replace Jeff's profile bio with our own ridiculous custom link.
 */
var replace__twitter = function() {
    var dropIt = document.querySelector(".ProfileHeaderCard-bio.u-dir");
    if (dropIt) {
        dropIt.innerHTML = 'Drop it. <a href="https://www.youtube.com/watch?v=WG9EgxGsJuQ">https://www.youtube.com/watch?v=WG9EgxGsJuQ</a>';
    }
};

replace__twitter();