// jeff-who.js

(function() {
    var globalData = {
        /**
         * Define the regexes for which to search content for.
         */
        regexes: {
            who: /(Jeff(?:rey)?(?:[\s-])?(?:Preston[\s-])?)?(Bezos)('s?)?/gi,
            bae: /(God[\s-]Emperor\s)?(?:Elon\s)?(?:Reeve\s)?Musk/gi,
            suborbital: /New\sShep(ard|herd)/gi
        },

        /**
         * Define the replacement functions we call when a regex is matched.
         */
        replacements: {
            /**
             * Replacement function to switch "Jeff Bezos" and various permutations, to
             * "Jeff Who?" and various permutations.
             *
             * @param {string} match - The whole match.
             * @param {string} p1 - A match for "Jeff", or "Jeffrey".
             * @param {string} p2 - A match for "Bezos".
             * @param {string} p3 - A match for a possessive attached to "Bezos".
             *
             * @returns {string} The replaced text.
             */
            who: function(match, p1, p2, p3) {
                // Begin with an empty string.
                var who = "";
                // If we've found a match for some form of "Jeff", prepend it to the string.
                if (p1) {
                    who += p1;
                }
                // If the first character of "bezos" is lowercase, replace it with a lowercase "who?".
                who += p2.charAt(0) === "b" ? "who?" : "Who?";
                // If p3 exists, we should pluralize the replacement
                if (p3) {
                    who += "'s";
                }
                // return a result
                return who;
            },

            /**
             * Replacement function for "Elon Musk", switches text to "God Emporer Elon Musk".
             *
             * @param {string} match - The full match.
             * @param {string} p1 - A match for the prefix "God Emporer".
             *
             * @returns {string} The replaced text.
             */
            bae: function(match, p1) {
                // If the match is already prefixed with "god emporer", we don't need to do anything.
                if (typeof p1 !== "undefined") {
                    return match;
                }
                return "God Emperor " + match;
            },

            /**
             * Replacement function for "New Shepard", switches text to add "Suborbital" as a prefix.
             */
            suborbital: function() {
                return "Suborbital New Shepard";
            }
        }
    };

    /**
     * The nodes in the current document which have a match.
     */
    var matchedNodes = [];

    /**
     * Boolean for whether a match has been found on the current page.
     */
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
     * If the page has a match for Jeff Bezos, replace the found nodes with the replacement text.
     */
    var replaceText = function() {
        if (hasFoundWhoMatch) {
            for (var i = 0; i < matchedNodes.length; i++) {
                var currentMatch = matchedNodes[i];
                currentMatch.node.textContent = currentMatch.node.textContent.replace(
                    globalData.regexes[currentMatch.type],
                    globalData.replacements[currentMatch.type]
                );
            }
        }
    };

    recurse(document.body);

    browser.runtime.sendMessage({
        type: 'isDevelopment'
    }).then(function(isDevPromise) {
        return isDevPromise;
    }).then(function(isDevelopment) {
        if (isDevelopment) {
            var jeffsWhod = matchedNodes.filter(function(mn) { return mn.type === 'who' });
            var elonsMusked = matchedNodes.filter(function(mn) { return mn.type === 'bae' });
            var bluesOrigined = matchedNodes.filter(function(mn) { return mn.type === 'suborbital' });
            console.log(`${jeffsWhod.length} Jeffs Who'd, ${elonsMusked.length} Elons Musked, ${bluesOrigined.length} Blues Origined.`);
        }
    }).catch(function(error) {
        console.log(error);
    });

    replaceText();
})();