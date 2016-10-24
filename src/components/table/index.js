var angular = require('angular');
var TableService = require('./TableService');
var TableCtrl = require('./TableCtrl');
var TableTemplate = require('./TableTemplate.html');
var RowComponent = require('./components/row');
var CellComponent = require('./components/cell');

angular.module('table', [])
    .service('TableService', TableService)
    .config(function($stateProvider) {
        $stateProvider
            .state('table', {
                url: "/",
                template: TableTemplate,
                controller: TableCtrl,
                controllerAs: '$ctrl'
            });
    })
    .service('TableService', TableService)
    .component('rowItem', RowComponent)
    .component('cellItem', CellComponent);
