
let flickr = new Flickr({
	api_key: "85cbbaacf76f1a89b73310aac077de09",
	secret: "efb97e4ac51ac134",
	requestOptions: {
	timeout: 20000
	/* other default options accepted by request.defaults */
}});

let result = flickr.photos.search({
  text: "Luke skywalker"
}, function(err, resultado) {
  if(err) { throw new Error(err); }
  console.log(resultado);
  // do something with result
});

/*result.addEventListener("load", () => {
	console.log(result);
})*/

