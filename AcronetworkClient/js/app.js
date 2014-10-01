'use strict';


// Declare app level module which depends on filters, and services
var acronetApp = angular.module('acronetwork', [
    'ngRoute',
    'az.config',
    'az.directives',
    'az.services',
    'az',
    'ui.bootstrap',
    'dialogService',
    /*'omirl.stockDirective',*/
    'acronetwork.chartDirective',
    'acronetwork.ConstantsService',
    'acronetwork.authService',
    'acronetwork.mapNavigatorService',
    'acronetwork.stationsService',
    'acronetwork.chartService',
    'acronetwork.sessionInjector',
    'acronetwork.filters',
    'acronetwork.directives'
]);

acronetApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('sessionInjector');
}]);

acronetApp.config(function($routeProvider) {
        $routeProvider.when('/map', {templateUrl: 'partials/map.html', controller: 'MapController'});
        $routeProvider.when('/tables', {templateUrl: 'partials/tables.html', controller: 'TablesController'});
        $routeProvider.when('/animations', {templateUrl: 'partials/animations.html', controller: 'AnimationsController'});
        $routeProvider.when('/credits', {templateUrl: 'partials/credits.html', controller: 'CreditsController'});
        $routeProvider.when('/settings', {templateUrl: 'partials/settings.html', controller: 'SettingsController'});
        $routeProvider.when('/stationstable', {templateUrl: 'partials/stationstable.html', controller: 'StationsTableController'});
        $routeProvider.when('/idromodeltable', {templateUrl: 'partials/idromodeltable.html', controller: 'IdroModelTableController'});
        $routeProvider.when('/sensorstable', {templateUrl: 'partials/sensorstable.html', controller: 'SensorTableController'});
        $routeProvider.when('/maxtable', {templateUrl: 'partials/maxtable.html', controller: 'MaxTableController'});
        $routeProvider.when('/summarytable', {templateUrl: 'partials/summarytable.html', controller: 'SummaryTableController'});

        $routeProvider.otherwise({redirectTo: '/map'});
    }
);

acronetApp.controller("MapController", MapController);
acronetApp.controller("TablesController", TablesController);


