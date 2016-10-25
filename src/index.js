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
}).run(function() {
    if (!localStorage['tableContent']) {
        localStorage['tableContent'] = JSON.stringify([["1", "2", "3"], ["", "", ""], ["", "", ""]]);
    }
});