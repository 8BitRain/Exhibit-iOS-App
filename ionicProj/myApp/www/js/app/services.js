angular.module('app.services', [])

    .service('AppService', ['$q', 'ParseConfiguration',
        function ($q, ParseConfiguration) {
          return {

            //Will query parse for Exhibits
            queryExhibits: function () {
              var UserList = Parse.Object.extend("_User");
              var query = new Parse.Query(UserList);
              query.find({
                success: function(results) {
                  console.log("Successfully retrieved " + results.length + " users.");
                  // Do something with the returned Parse.Object values
                  for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('username'));
                  }
                },
                error: function(error) {
                  alert("Error: " + error.code + " " + error.message);
                }
              });
            }

          }
        }]);
