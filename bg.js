var storage;

function image_on_click(info, tab) {
	if (storage == null) return;
    console.log("clicked");
    console.log("src " + info.srcUrl);
    console.log("src " + tab.url);
    var item = {"srcUrl": info.srcUrl, "tabUrl": tab.url, "tabTitle": tab.title};
    console.log("storage " + JSON.stringify(storage));
    storage.appendItem(item);
}

$(document).ready(function(){
	//var sep = chrome.contextMenus.create({"type":"separator","onclick":n});
	var menu = chrome.contextMenus.create({"type":"normal","title":"keep image in browser", "contexts":["image"],"onclick":image_on_click});
	console.log("menu");
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		storage = instantiateStorage(request);
		storage.initStorage();
	});
});