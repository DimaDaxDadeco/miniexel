var angular = require('angular');
var TableService = require('./TableService');
var RowComponent = require('./components/row');

angular.module('table', [])
    .service('TableService', TableService)
    .component('rowComponent', RowComponent);
