var p = document.getElementById('lga');
if (p != null) {
	var el = document.createElement('div');
	el.style.position = 'absolute';
	el.style.width = '100%';
	el.style.paddingTop = '30px';
	p.insertBefore(el, p.firstChild);	

	chrome.extension.sendRequest({msg: "randomBookmark"}, function(response) {
	  	el.innerHTML = '<div style="font-weight: bold;padding-bottom: 5px;color: #858585;">'
	  	+ response.path 
	  	+ '</div><a href="'  
	  	+ response.link
	  	+ '">' 
	  	+ response.title 
	  	+ '</a>';
	});
}