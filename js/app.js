

function fazRequestGet(url, callback){
	var req = new XMLHttpRequest();
	req.open("GET", url, true);
	req.addEventListener("load",function(){
		console.log(req.responseText);	
	});
	req.send(null);
}

fazRequestGet("http://swapi.co/api/people/");