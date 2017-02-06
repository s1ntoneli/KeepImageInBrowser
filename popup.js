var IMAGE_TRANSFER_API = "http://codeli.leanapp.cn/image";

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

function getTranfererImageUrl(item) {
    return IMAGE_TRANSFER_API
    + "?url=" + encodeURIComponent(item.srcUrl)
    + "&srcUrl=" + encodeURIComponent(item.tabUrl);
}

function constructHtml(item) {
    var format = "<div class=\"col-sm-6 col-md-4\">"
            + "<div class=\"thumbnail\">"
            + "<img data-src=\"holder.js/200x200\" width=\"200\" height=\"200\" alt=\"{2}\" src=\"{0}\">"
            + "<text class=\"btn\" id=\"delete_btn\" objectId=\"{3}\">Delete</text>"
            + "<div class=\"caption\">"
                + "<a target=\"_blank\" href=\"{1}\">{2}</a>"
              + "</div>"
            + "</div>"
            + "</div>"
    return String.format(format, getTranfererImageUrl(item), item.tabUrl, item.tabTitle, item.objectId);
}

function constructHtml2(item) {
    var format =
        "<div>" +
        "<a href=\"{0}\">"
        + "<img alt=\"{1}\" src=\"{2}\"/>"
        + "</a>"
        // + "<a id=\"delete_btn\" objectId=\"{3}\" src=\"https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png\">delete</a>"
        + "</div>";
    return String.format(format, item.tabUrl, item.tabTitle, getTranfererImageUrl(item), item.objectId);
}

function loadImage(storage) {
    storage.obtainArray(function(array) {
        if (array == null) {
            return;
        }
        for (var i = array.length-1; i >= 0; i--) {
            var htmlString = constructHtml2(array[i]);
            $("#gallery").append(htmlString);
        }
        /*$('#delete_btn').click(function() {
            console.log("delete");
            console.log("objectId " + $(this).attr('objectId'));
            storage.deleteItem($(this).attr('objectId'));
            location.reload();
        });*/
        $("#gallery").justifiedGallery({
            lastRow : 'nojustify',
            margins : 3
        });

    });
}

var storage;

function sendLoginedRequest() {
    var currentUser = AV.User.current();
    chrome.extension.sendRequest({"className": "LeanCloudStorage", "data": {"username": currentUser.getUsername()}});
}

function onUserLoginStateChanged(isLogined) {
    if (isLogined) {
        var currentUser = AV.User.current();
        storage = new LeanCloudStorage();
        storage.initStorage({"username": currentUser.getUsername()});
        sendLoginedRequest();
    } else {
        storage = new LocalStorage();
        storage.initStorage();
        chrome.extension.sendRequest({"className": "LocalStorage"});
    }
    loadImage(storage);
}

$(document).ready(function(){
    storage = new LeanCloudStorage();
    storage.initStorage();

    var currentUser = AV.User.current();
    if (currentUser != null) {
        currentUser.isAuthenticated().then(function(authenticated){
            if (authenticated) {
                onUserLoginStateChanged(true);
                $('#username').text("user: " + currentUser.getUsername());
                $('#login_info').show();
                $('#unlogined').hide();

                $('#logout').click(function() {
                    AV.User.logOut();
                    location.reload();

                    $('#username').text("");
                    $('#login_info').hide();
                    $('#unlogined').show();
                });
            } else {
                onUserLoginStateChanged(false);
            }
        });
    } else {
        onUserLoginStateChanged(false, storage);
    }

    console.log("ready");
});
