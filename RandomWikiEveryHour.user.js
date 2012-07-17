// ==UserScript==
// @name        RandomWikiEveryHour
// @namespace   techietim
// @description Opens a Wikipedia article at random intervals
// @updateURL   https://github.com/techietim/RandomWikiEveryHour/raw/master/RandomWikiEveryHour.user.js
// @include     *
// @version     0.1
// ==/UserScript==

GM_registerMenuCommand("RandWiki: English", function(e)
{
    GM_setValue("language", "en");
});

GM_registerMenuCommand("RandWiki: French", function(e)
{
    GM_setValue("language", "fr");
});

GM_registerMenuCommand("RandWiki: Spanish", function(e)
{
    GM_setValue("language", "es");
});

var checkTime = function()
{
    var last_update = GM_getValue("last_update", "0");
    var date = new Date();
    var stamp = date.getTime();
    
    if(stamp - last_update >= (Math.random() * 59 + 1) * 60000)
    {
        var language = GM_getValue("language", "en")
        GM_setValue("last_update", stamp.toString());
        GM_openInTab("https://" + language + ".wikipedia.org/wiki/Special:Random");
    }
};
checkTime();
setInterval(checkTime, 60000);
