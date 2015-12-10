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
        '$state', '$scope', 'UserService','AppService', 'DataService',  // <-- controller dependencies
        function ($state, $scope, UserService, AppService, DataService) {


            if(DataService.getData()[0]){
                $scope.photoSphere = DataService.getData()[$state.params.itemId].sphere._url;
            }
            
            if(DataService.getData()[0]){
                $scope.isPhoto = DataService.getData()[$state.params.itemId].isPicture;
            }

            $scope.doLogoutAction = function () {
                console.log("Logging out...");
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };
            
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
            
            
            /*$scope.$on('$ionicView.beforeEnter', function(){
                screen.lockOrientation('portrait');
            });*/




        }])


    .controller('CardboardCtrl', [
        '$state', '$scope', 'UserService','AppService', 'DataService',  // <-- controller dependencies
        function ($state, $scope, UserService, AppService, DataService) {


            if(DataService.getData()[0]){
                $scope.photoSphere = DataService.getData()[$state.params.itemId].sphere._url;
            }
            
              if(DataService.getData()[0]){
                $scope.isPhoto = DataService.getData()[$state.params.itemId].isPicture;
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


        }]);
