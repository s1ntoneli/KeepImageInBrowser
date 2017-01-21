
function loadImage() {
    // var bg = chrome.extension.getBackgroundPage();
    //$("#img").attr("src",bg.window.datasrc);
    //console.log("set src to " + bg.window.datasrc);
    var array = obtainArray();
    if (array == null) {
        return;
    }
    for (var i = array.length-1; i >= 0 && i >= array.length-5; i--) {
        var htm = "<li><img width=\"200\" height=\"200\" src=\"" + array[i] + "\"/></li>";
        $("#img_list").append(htm);
    }
}

$(document).ready(function(){
    console.log("ready");
    loadImage()
});

