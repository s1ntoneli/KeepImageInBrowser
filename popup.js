
function constructHtml(item) {
    return "<li>"
        + "<img width=\"200\" height=\"200\" src=\"" + item.srcUrl + "\"/>"
        + "<a target=\"_blank\" href=\"" + item.tabUrl + "\">" + item.tabTitle + "</a>"
        + "</li>";
}

function loadImage() {
    // var bg = chrome.extension.getBackgroundPage();
    //$("#img").attr("src",bg.window.datasrc);
    //console.log("set src to " + bg.window.datasrc);
    var array = obtainArray();
    if (array == null) {
        return;
    }
    for (var i = array.length-1; i >= 0 && i >= array.length-5; i--) {
        var htmlString = constructHtml(array[i]);
        $("#img_list").append(htmlString);
    }
}

$(document).ready(function(){
    console.log("ready");
    loadImage();
});

