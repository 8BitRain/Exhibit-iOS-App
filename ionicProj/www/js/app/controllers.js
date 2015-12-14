/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $scope.dataList[0];
            //$stateParams.itemId;


        }])
    .controller('ListCtrl', [
        '$state', '$scope', '$ionicModal', 'UserService','AppService', 'DataService',  // <-- controller dependencies
        function ($state, $scope, $ionicModal, UserService, AppService, DataService) {



        $scope.search = {};


          $ionicModal.fromTemplateUrl('search-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
          }).then(function(modal) {
            $scope.modal = modal
            console.log("I'm here!")
          })



        if(DataService.getData()[0]){
                var myData = DataService.getData();
                for(i = 0; i < myData.length; i++){
                    var curID = $state.params.itemId
                    if (myData[i].objectID == curID){
                        $scope.photoSphere = myData[i].sphere._url;
                        break;
                    }
                }

            }

             if(DataService.getData()[0]){
                var myData = DataService.getData();
                for(i = 0; i < myData.length; i++){
                    var curID = $state.params.itemId
                    if (myData[i].objectID == curID){
                        $scope.isPhoto = myData[i].isPicture;
                        break;
                    }
                }

            }

        if(document.getElementById("video") != null){
            document.getElementById("video").remove();
            console.log("Removed video");
        } else{
            console.log("Video was not removed");
        }


        //Called when user wants to refresh list
        $scope.refreshList = function () {
            AppService.queryExhibits(function(exhibits) {
            	console.log("callback called!");
                console.log(exhibits);
                $scope.dataList = exhibits;
                DataService.setData(exhibits);
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

        //Initial query to fill list
        $scope.refreshList();


          $scope.openModal = function() {
            $scope.modal.show()
          }

          $scope.closeModal = function() {
            $scope.modal.hide();
          };

          $scope.clearModal = function() {
              console.log("Cleared search");
              $scope.search = {};
              $scope.modal.hide();
          };
          $scope.clearSearchField = function() {
              console.log("Cleared Search Field");
              $scope.search2 = '';
          };
          $scope.$on('$destroy', function() {
            $scope.modal.remove();
          });

          // //Upload exhibits
          // $scope.uploadExhibit = function() {
          //     console.log("Attempting to upload exhibit...");
          //     var title = $scope.upload.title;
          //     var address = $scope.upload.address;
          //     var location = $scope.upload.city;
          //     // var sphere = $scope.upload.sphere;
          //     var isPicture = true;
          //     var beds = $scope.upload.beds;
          //     var baths = $scope.upload.baths;
          //     var pets = true;
          //     var price = $scope.upload.price;
          //     var sqft = $scope.upload.sqft;
          //     var city = $scope.upload.city;
          //     var zip = $scope.upload.zip;
          //
          //     var exhibit = {objectID: objectID, title:title, address:address, location:location,
          //                   sphere:sphere, isPicture: isPicture, beds:beds, baths:baths, pets:pets, price:price, sqft: sqft, city: city, zip: zip};
          //
          //     console.log(exhibit);
          // };

          $scope.uploadExhibit= function (item) {
            alert(item);
          }

        }])


    .controller('CardboardCtrl', [
        '$state', '$scope', 'UserService','AppService', 'DataService',  // <-- controller dependencies
        function ($state, $scope, UserService, AppService, DataService) {

            if(DataService.getData()[0]){
                var myData = DataService.getData();
                for(i = 0; i < myData.length; i++){
                    var curID = $state.params.itemId
                    if (myData[i].objectID == curID){
                        $scope.photoSphere = myData[i].sphere._url;
                        break;
                    }
                }

            }

             if(DataService.getData()[0]){
                var myData = DataService.getData();
                for(i = 0; i < myData.length; i++){
                    var curID = $state.params.itemId
                    if (myData[i].objectID == curID){
                        $scope.isPhoto = myData[i].isPicture;
                        break;
                    }
                }

            }

            $scope.$on('$ionicView.beforeEnter', function(){
                screen.lockOrientation('landscape');
            });

            $scope.$on('$ionicView.beforeLeave', function(){
                screen.lockOrientation('portrait');
            })

        }])
    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

                /*$scope.$on('$ionicView.beforeEnter', function(){
                screen.lockOrientation('portrait');
            });*/

            //debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
                console.log($scope.user);
            });


        $scope.doLogoutAction = function () {
            console.log("Logging out...");
            UserService.logout().then(function () {

                // transition to next state
                $state.go('app-login');

            }, function (_error) {
                alert("error logging in " + _error.debug);
            })
        };


        }]);
