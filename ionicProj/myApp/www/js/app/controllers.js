/**
 * beginnings of a controller to login to system
 * here for the purpose of showing how a service might
 * be used in an application
 */
angular.module('app.controllers', [])
    .controller('ListDetailCtrl', [
        '$state', '$scope', '$stateParams', 'UserService',   // <-- controller dependencies
        function ($state, $scope, $stateParams, UserService) {

            $scope.index = $stateParams.itemId;

        }])
    .controller('ListCtrl', [
        '$state', '$scope', 'UserService','AppService',   // <-- controller dependencies
        function ($state, $scope, UserService, AppService) {

            $scope.dataList = [];

            $scope.doLogoutAction = function () {
                console.log("Logging out...");
                UserService.logout().then(function () {

                    // transition to next state
                    $state.go('app-login');

                }, function (_error) {
                    alert("error logging in " + _error.debug);
                })
            };

            //Called when user wants to refresh list
            $scope.refreshList = function () {
                // var listOfExhibits = AppService.queryExhibits();
                AppService.queryExhibits(function(exhibits) {
                	console.log("callback called!");
                  var listOfExhibits = exhibits;
                  for(i = 0; i < listOfExhibits.length; i++){
                        console.log(listOfExhibits[i]);
                        $scope.dataList.push(listOfExhibits[i]);
                  }
                });
            };

        }])
    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
