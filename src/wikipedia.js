/**
 * On Jeff Bezos' Wikipedia page, replace the International Phonetic Indicator a pronounciation of "Bezos"
 * to a pronounciation of "Who".
 */
var replace__wikipedia = function() {
    var ipa = document.querySelector('[title="Help:IPA/English"]');
    if (ipa) {
        ipa.innerHTML = '/<span style="border-bottom:1px dotted"><span title="\'h\' in \'high\'">h</span><span title="/uː/: \'oo\' in \'goose\'">uː</span></span>/';
    }
};

replace__wikipedia();