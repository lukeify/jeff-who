/**
 * On washingtonpost.com, replace the banner image with an Amazon-stylised image of "The Washington Post".
 */
var replace__washingtonpost = function() {
    var logoElem = document.querySelector("#mastnav-container .wplogo");
    if (logoElem) {
        logoElem.src = namespace.extension.getURL("images/wawho.png");
        return;
    }

    var storyLogoElem = document.querySelector("#logo-in-nav .main-logo");
    if (storyLogoElem) {
        storyLogoElem.src = namespace.extension.getURL("images/wawho-white.png");
    }
};

replace__washingtonpost();