chrome.extension.onRequest.addListener(     //listen to requests
	function(request, sender, sendResponse) {
    // alert(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.msg == "randomBookmark") {
    	// sendResponse({title: "goodbye", link: 'asd'});  //send response
    	chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
	      	// result += dumpTreeNodes(bookmarkTreeNodes);
	      	var result = getRandomBookmark(bookmarkTreeNodes);
	      	// alert(JSON.stringify(result));
	      	sendResponse(result);  //send response
	    });
  	}
});

function getRandomBookmark(root) {
	var bookmarks = [];

	var traversal = function (nodes, breadcrum) {
		for (var i = 0; i < nodes.length; i++) {
			if (nodes[i].children && nodes[i].children.length > 0) {
				// This is a folder
				traversal(nodes[i].children, breadcrum + ' > ' + nodes[i].title);
			} else {
				// This is a leaf
				bookmarks.push({
					path: breadcrum.replace(/^[> ]+/g, ''),
					title: nodes[i].title,
					link:  nodes[i].url
				})
			}
		}		
	}

	traversal(root, '');

	return bookmarks[Math.floor(Math.random()*bookmarks.length)];
}