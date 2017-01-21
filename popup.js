
String.format = function() {
    if( arguments.length == 0 )
        return null;

    var str = arguments[0]; 
    for(var i=1;i<arguments.length;i++) {
        var re = new RegExp('\\{' + (i-1) + '\\}','gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

function constructHtml(item) {
    var format = "<div class=\"col-sm-6 col-md-4\">"
            + "<div class=\"thumbnail\">"
            + "<img data-src=\"holder.js/200x200\" width=\"200\" height=\"200\" alt=\"{2}\" src=\"{0}\">"
            + "<div class=\"caption\">"
                + "<a target=\"_blank\" href=\"{1}\">{2}</a>"
              + "</div>"
            + "</div>"
            + "</div>"
    return String.format(format, item.srcUrl, item.tabUrl, item.tabTitle);
}

function loadImage(storage) {
    storage.obtainArray(function(array) {
        if (array == null) {
            return;
        }
        for (var i = array.length-1; i >= 0 && i >= array.length-5; i--) {
            var htmlString = constructHtml(array[i]);
            $("#container .row").append(htmlString);
        }
    });
}

$(document).ready(function(){
    var storage = new LeanCloudStorage();
    storage.initStorage();
    console.log("ready");
    loadImage(storage);
});

