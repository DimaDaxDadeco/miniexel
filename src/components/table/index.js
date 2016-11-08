import angular from "angular";
import TableService from "./TableService";
import ContextMenuService from "./components/context-menu/ContextMenuService";
import TableCtrl from "./TableCtrl";
import TableTemplate from "./TableTemplate.html";
import RowComponent from "./components/row";
import CellComponent from "./components/cell";
import HeaderTableComponent from "./components/header";
import contextMenu from "./components/context-menu/component";

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
    .service("ContextMenuService", ContextMenuService)
    .component("rowItem", RowComponent)
    .component("cellItem", CellComponent)
    .component("headerTable", HeaderTableComponent)
    .component("contextMenu", contextMenu);
