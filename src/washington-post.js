/**
 * On washingtonpost.com, replace the banner image with an Amazon-stylised image of "The Washington Post".
 */
var replace__washingtonpost = function() {
    var logoNode = document.querySelector("#mastnav-container .logo");
    if (logoNode) {

        // Remove the existing elements inside the logo node.
        while (logoNode.firstChild) {
            logoNode.removeChild(logoNode.firstChild);
        }

        // Create and append our image.
        var imgNode = document.createElement("img");
        imgNode.src = namespace.extension.getURL("images/wawho.png");
        imgNode.alt = "Who?";
        logoNode.appendChild(imgNode);

        // Add some padding so that the image isn't crushed up against the navigation elements.
        var mastnavNode = document.getElementById("mastnav-wrapper");
        mastnavNode.style.paddingTop = "1em";

        return;
    }

    var storyLogoNode = document.querySelector("#logo-in-nav .wp-logo-link");
    if (storyLogoNode) {
        // Remove the first element, the SVG, from inside this logo node.
        storyLogoNode.removeChild(storyLogoNode.firstElementChild);

        // Create and append an image.
        var imgNode = document.createElement("img");
        imgNode.src = namespace.extension.getURL("images/wawho-white.png");
        imgNode.alt = "The story is sponsored by Blue Origin.";
        imgNode.style.width = "50%";
        storyLogoNode.prepend(imgNode);
    }
};

replace__washingtonpost();