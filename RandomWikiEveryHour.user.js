// ==UserScript==
// @name        RandomWikiEveryHour
// @namespace   techietim
// @description Opens a random Wikipedia article every hour
// @include     *
// @version     0.1
// ==/UserScript==

var every = 3600000;

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

setInterval(function()
{
    var last_update = GM_getValue("last_update", "0");
    var date = new Date();
    var stamp = date.getTime();
    
    if(stamp - last_update >= every)
    {
        var language = GM_getValue("language", "en")
        GM_setValue("last_update", stamp.toString());
        GM_openInTab("https://" + language + ".wikipedia.org/wiki/Special:Random");
    }
    
}, 60000);
