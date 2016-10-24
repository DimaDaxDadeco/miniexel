var angular = require('angular');
require("./components");
require("angular-ui-router");
require("angular-local-storage");

angular
    .module("MiniExel", [
      'ui.router',
      'LocalStorageModule',
      'table'
    ]).config(function($locationProvider) {
        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});