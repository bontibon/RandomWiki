// ==UserScript==
// @name        RandomWiki
// @namespace   bontibon
// @description Opens a Wikipedia article at random intervals
// @updateURL   https://github.com/bontibon/RandomWiki/raw/master/RandomWiki.user.js
// @include     http://*
// @include     https://*
// @version     0.2.1
// ==/UserScript==

var name = "RandomWiki";

var languages = {
    en: "English",
    fr: "French",
    es: "Spanish",
    ja: "Japanese",
    de: "German",
    pl: "Polish",
    zh: "Chinese",
    pt: "Portuguese",
    it: "Italian",
    ru: "Russian"
};

var change_value = function(new_value) {
    var old_value = GM_getValue("language", "en");
    GM_setValue("language", new_value);
    alert(name + ":  Article language changed to " + languages[new_value] +
        " from " + languages[old_value] + ".");
};

var showArticle = function() {
    var language = GM_getValue("language", "en");
    GM_openInTab("https://" + language + ".wikipedia.org/wiki/Special:Random");
};

GM_registerMenuCommand(name + ": Show random article", function() {
    showArticle();
});

for (var lang in languages) {
    GM_registerMenuCommand(name + ": " + languages[lang],
        (function(){
            var lang_value = lang;
            return function() {
                change_value(lang_value);
            }
        })());
}

var checkTime = function() {
    var next_article = parseInt(GM_getValue("next_article", "0"));
    var date = new Date();
    var stamp = date.getTime();
    
    if (stamp >= next_article) {
        var new_time = stamp + ((Math.random() * 59 + 1) * 60000);
        GM_setValue("next_article", new_time.toString());
        showArticle();
    }
};
checkTime();
setInterval(checkTime, 60000);
