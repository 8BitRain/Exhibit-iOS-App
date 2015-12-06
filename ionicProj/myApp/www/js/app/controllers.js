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
        '$state', '$scope', 'UserService','AppService',   // <-- controller dependencies
        function ($state, $scope, UserService, AppService) {


            $scope.dataList = ['one'];

            //$scope.getImage = function(){
                //AppService.queryExhibits(function(exhibits) {
                //    console.log("callback called!");
                //    $scope.dataList = exhibits;
                    console.log($scope.dataList);
                    console.log($state.params.itemId);
                    $scope.photoSphere = $state.params.itemId;
                //});

            //}
            

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
