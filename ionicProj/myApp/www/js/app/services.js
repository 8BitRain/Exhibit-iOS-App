angular.module('app.services', [])

    .service('AppService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {
          return {

            //Will query parse for Exhibits
            queryExhibits: function () {
              var ExhibitList = Parse.Object.extend("Exhibits");
              var query = new Parse.Query(ExhibitList);
              query.find({
                success: function(results) {
                  console.log("Successfully retrieved " + results.length + " exhibits.");
                  // Do something with the returned Parse.Object values

                  //Create empty list of exhibits in order to push queried exhibits to
                  var listOfExhibits = [];

                  //Iterate through results of query and add to array^^
                  for (var i = 0; i < results.length; i++) {
                    var object = results[i];

                    var title = object.get('title');
                    var address = object.get('address');
                    var location = object.get('location');
                    var thumbnail = object.get('thumbnail');
                    var sphere = object.get('sphere');
                    var beds = object.get('beds');
                    var baths = object.get('baths');
                    var pets = object.get('pets');
                    var price = object.get('price');
                    var sqft = object.get('sqft');

                    var exhibit = {title:title, address:address, location:location,
                                  thumbnail:thumbnail, sphere:sphere, beds:beds, baths:baths,
                                  pets:pets, price:price, sqft: sqft};

                    //Add to list of exhibits
                    listOfExhibits.push(exhibit);
                  }
                },
                error: function(error) {
                  alert("Error: " + error.code + " " + error.message);
                }
              });
            }

          }
        }]);
