/**
 * On Twitter, we replace Jeff's profile bio with our own ridiculous custom link.
 */
var replace__twitter = function() {
    var dropIt = document.querySelector(".ProfileHeaderCard-bio.u-dir");
    if (dropIt) {
        dropIt.innerHTML = '<a href="https://www.youtube.com/watch?v=WG9EgxGsJuQ">Drop it. https://www.youtube.com/watch?v=WG9EgxGsJuQ</a>';
    }
};

replace__twitter();