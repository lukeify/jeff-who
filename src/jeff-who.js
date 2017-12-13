// jeff-who.js
var namespace = typeof browser !== 'undefined' ? browser : chrome;

(function() {
    var globalData = {
        regexes: {
            who: /(Jeff(?:rey)?(?:[\s-])?(?:Preston[\s-])?)?(Bezos)('s?)?/gi,
            bae: /(God[\s-]Emperor\s)?(?:Elon\s)?(?:Reeve\s)?Musk/gi,
            suborbital: /New\sShepard/gi
        },
        replacements: {
            /**
             *
             * @param match
             * @param p1
             * @param p2
             * @param p3
             * @param offset
             * @param string
             *
             * @returns {string}
             */
            who: function(match, p1, p2, p3, offset, string) {
                // Begin with an empty string.
                var who = "";
                // If we've found a match for some form of "Jeff", prepend it to the string.
                if (p1) {
                    who += p1;
                }
                // If the first character of "bezos" is lowercase, replace it with a lowercase "who?".
                who += p2[0] === "b" ? "who?" : "Who?";
                // If p3 exists, we should pluralize the replacement
                if (p3) {
                    who += "'s";
                }
                // return a result
                return who;
            },
            bae: function(match, p1, offset, string) {
                if (typeof p1 !== "undefined") {
                    return match;
                }
                return "God Emperor " + match;
            },
            suborbital: function(match, offset, string) {
                return "Suborbital New Shepard";
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

    recurse(document.body);
    console.log(matchedNodes.length);
    replaceText();
})();