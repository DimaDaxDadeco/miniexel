import angular from "angular";
import TableService from "./TableService";
import TableCtrl from "./TableCtrl";
import TableTemplate from "./TableTemplate.html";
import RowComponent from "./components/row";
import CellComponent from "./components/cell";
import TitleCellComponent from "./components/title-cell";

angular.module("table", [])
    .service("TableService", TableService)
    .config($stateProvider => {
        $stateProvider
            .state("table", {
                url: "/",
                template: TableTemplate,
                controller: TableCtrl,
                controllerAs: "$ctrl"
            });
    })
    .service("TableService", TableService)
    .component("rowItem", RowComponent)
    .component("cellItem", CellComponent)
    .component("titleCell", TitleCellComponent);
