var angular = require('angular');
require("./components");
require("angular-ui-router");
require("angular-local-storage");
require('angular-click-outside');

angular
    .module("MiniExel", [
      'ui.router',
      'LocalStorageModule',
      'table',
      'tw.directives.clickOutside',
      'services'
    ]).config(function($locationProvider) {
        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).run(function() {
    if (!localStorage['tableContent']) {
        localStorage['tableContent'] = JSON.stringify([["1", "2", "3"], ["", "", ""], ["", "", ""]]);
    }
});