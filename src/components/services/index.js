var angular = require('angular');
var KeyboardService = require('./keyboard/KeyboardService');

angular
    .module('services', [])
    .service('KeyboardService', KeyboardService);