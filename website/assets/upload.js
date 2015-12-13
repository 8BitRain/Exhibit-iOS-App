// <script src="//www.parsecdn.com/js/parse-1.6.7.min.js"></script>

function uploadToServer(){
  console.log("Uploading sphere to server...");
  var title = document.getElementById('title').value;
  var location = new Parse.GeoPoint({latitude: 43.0667, longitude: 89.4000});
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var zip = document.getElementById('zip').value;
  var sqft = document.getElementById('sqft').value;
  var price = document.getElementById('price').value;
  var beds = document.getElementById('beds').value;
  var baths = document.getElementById('baths').value;
  var fileUploadControl = $("#sphere")[0];
  if (fileUploadControl.files.length > 0) {
    var file = fileUploadControl.files[0];
    var name = "sphere.jpg";

    var sphere = new Parse.File(name, file);
  }
  var exhibit = {title: title, address: address, city: city, zip: zip, sqft: sqft, price: price,
                beds: beds, baths: baths, sphere: sphere};

  //For debugging purposes:
  console.log(exhibit);

  Parse.initialize("OmsGMVVEXlyeH7ogBUCxYBYrhTxskALiSyUI3NQ4", "IxFoJ67sWnY97WVgFPSpesiXhccPLWEdrCs3EMuj");

  var TestObject = Parse.Object.extend("Exhibits");
	var testObject = new TestObject();
	testObject.set("title", title);
  testObject.set("location", location);
  testObject.set("address", address);
  testObject.set("city", city);
  testObject.set("zip", zip);
  testObject.set("sqft", parseInt(sqft));
  testObject.set("price", parseInt(price));
  testObject.set("beds", parseInt(beds));
  testObject.set("baths", parseInt(baths));
  testObject.set("sphere", sphere);
  testObject.set("pets", false);
  testObject.set("isPicture", true);

	testObject.save(null, {
  	success: function(testObject) {
    	// Execute any logic that should take place after the object is saved.
    	alert('New object created with objectId: ' + testObject.id);
  	},
  	error: function(testObject, error) {
    	// Execute any logic that should take place if the save fails.
    	// error is a Parse.Error with an error code and message.
    	alert('Failed to create new object, with error code: ' + error.message);
  	}
	});

}
