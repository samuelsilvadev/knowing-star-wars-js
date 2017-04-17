
var Flickr = require("flickrapi"),
	flickrOptions = {
	api_key: "85cbbaacf76f1a89b73310aac077de09",
	secret: "efb97e4ac51ac134",
	requestOptions: {
	timeout: 20000,
	/* other default options accepted by request.defaults */
	}
};

let flickr = new Flickr();

let result = flickr.photos.search({
  text: "red+panda"
}, function(err, result) {
  if(err) { throw new Error(err); }
  // do something with result
});

result.addEventListener("load", () => {
	console.log(result);
})

