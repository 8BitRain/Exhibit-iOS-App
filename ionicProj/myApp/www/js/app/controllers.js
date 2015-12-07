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
                AppService.queryExhibits(function(exhibits) {
                	console.log("callback called!");
                    $scope.dataList = exhibits;
                    DataService.setData(exhibits);
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.getUrlAtIndex = function() {
                console.log("at top of function")
                AppService.queryExhibits(function(exhibits) {
                    console.log("callback called!");
                    $scope.dataList = exhibits;
                    console.log(exhibits[0]);
                    return exhibits[0];
                });
                console.log("at bottom of function")
            }


        }])
    .controller('AccountCtrl', [
        '$state', '$scope', 'UserService',   // <-- controller dependencies
        function ($state, $scope, UserService) {

            debugger;
            UserService.currentUser().then(function (_user) {
                $scope.user = _user;
            });


        }]);
