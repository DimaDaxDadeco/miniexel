import angular from "angular";
import ngRightClick from "./right-click/ngRightClick";

angular
    .module("directives", [])
    .directive("ngRightClick", ngRightClick);