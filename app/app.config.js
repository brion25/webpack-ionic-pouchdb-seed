import DBFactory from './common/factory-db.js';
import Home from './home/index.js';

export default angular.module('myApp', ['ionic','ui.router'])
    .factory('Database',['$rootScope',DBFactory])
    .config(['$stateProvider','$urlRouterProvider',($stateProvider,$urlRouterProvider)=>{
        $urlRouterProvider.otherwise('/')
        $stateProvider
            .state('index',{
                url:'/',
                template:Home.view(),
                controller:['$ionicListDelegate','$scope','$state','Database',Home.ctrl],
                controllerAs:'home'
            })
    }]);
