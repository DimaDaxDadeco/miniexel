import angular from "angular";
import "./components";
import "angular-ui-router";
import "angular-local-storage";
import "angular-click-outside";
import "ng-focus-if";

angular
    .module("MiniExel", [
      "ui.router",
      "LocalStorageModule",
      "table",
      "tw.directives.clickOutside",
      "services",
      "directives",
      "focus-if"
    ]).config($locationProvider => {
        $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}).run((localStorageService) => {
  if (!localStorageService.get("tableContent")) {
    localStorageService.set("tableContent", [["1", "2", "3"], ["c", "s", "e"], ["", "fd", ""]]);
  }
});