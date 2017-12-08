// jeff-who.js
var namespace = typeof browser !== 'undefined' ? browser : chrome;

(function() {
    var globalData = {
        regexes: {
            who: /(Jeff(?:rey)?(?:[\s-])?(?:Preston[\s-])?)?(Bezos)('s?)?/gi,
            bae: /(?:Elon\s)?Musk/gi,
            suborbital: /New\sShepard/gi
        },
        replacements: {
            who: function(match, p1, p2, p3, offset, string) {
                var who = "";
                if (p1 && p1.toLowerCase().indexOf("jeff") !== -1) {
                    who += p1;
                }
                who += p2[0] === "b" ? "who?" : "Who?";
                if (p3) {
                    who += "'s";
                }
                return who;
            },
            bae: function(match, p1, offset, string) {
                return "God Emperor " + match;
            },
            suborbital: function(match, offset, string) {
                return "Suborbital New Shepherd";
            }
        }
    };

    var matchedNodes = [];
    var hasFoundWhoMatch = false;

    /**
     * Recursively test nodes in the current document that are text nodes and have substrings containing what we are looking
     * for.
     *
     * @param {Node} elem - The element to recurse over.
     */
    var recurse = function(elem) {
        var length = elem.childNodes.length;
        for (var i = 0; i < length; i++) {
            var currentNode = elem.childNodes[i];
            if (currentNode.nodeType == Node.TEXT_NODE) {

                if (globalData.regexes.who.test(currentNode.textContent)) {
                    hasFoundWhoMatch = true;
                    matchedNodes.push({ node: currentNode, type: "who" });
                }

                if (globalData.regexes.bae.test(currentNode.textContent)) {
                    matchedNodes.push({ node: currentNode, type: "bae" });
                }

                if (globalData.regexes.suborbital.test(currentNode.textContent)) {
                    matchedNodes.push({ node: currentNode, type: "suborbital" });
                }

            } else {
                recurse(currentNode);
            }
        }
    };

    /**
     * WaPo.
     */
    var replaceWapoLogo = function() {
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

    /**
     * Twitter.
     */
    var replaceTwitterBio = function() {
        var dropIt = document.querySelector(".ProfileHeaderCard-bio.u-dir");
        if (dropIt) {
            dropIt.innerHTML = '<a href="https://www.youtube.com/watch?v=WG9EgxGsJuQ">https://www.youtube.com/watch?v=WG9EgxGsJuQ</a>';
        }
    };

    /**
     *
     */
    var replaceText = function() {
        if (hasFoundWhoMatch) {
            for (var i = 0; i < matchedNodes.length; i++) {
                var currentMatch = matchedNodes[i];
                currentMatch.node.textContent = currentMatch.node.textContent.replace(globalData.regexes[currentMatch.type], globalData.replacements[currentMatch.type]);
            }
        }
    };

    /**
     * Begin script execution.
     */
    if (window.location.href.indexOf("washingtonpost") !== -1) {
        hasFoundWhoMatch = true;
        replaceWapoLogo();
    }

    if (window.location.href.indexOf("twitter.com/jeffbezos") !== -1) {
        hasFoundWhoMatch = true;
        replaceTwitterBio();
    }

    recurse(document.body);
    console.log(matchedNodes.length);
    replaceText();
})();