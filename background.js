chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
    if (request.msg == "randomBookmark") {
    	chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
	      	var result = getRandomBookmark(bookmarkTreeNodes);
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