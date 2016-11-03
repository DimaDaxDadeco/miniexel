export default class ContextMenu {

    tableContent = JSON.parse(localStorage.tableContent);

    constructor($scope, TableService, ContextMenuService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.ContextMenuService = ContextMenuService;
        this.init();
    }

    init() {
        this.scope.$watch(() => this.ContextMenuService.coordinates, () => {
            this.coordinates = {
                left: this.ContextMenuService.coordinates.coordinateX,
                top: this.ContextMenuService.coordinates.coordinateY
            };
            this.position = {
                indexRow: this.ContextMenuService.position.indexRow,
                indexCell: this.ContextMenuService.position.indexCell
            };
        });
    }

    addColumn(where, show) {
        const pos = where === "before" ? this.position.indexCell : this.position.indexCell + 1;
        this.tableContent.forEach(row => {
            row.splice(pos, 0, "");
        });
        this.TableService.saveTableData(this.tableContent);
        this.ContextMenuService.toggleContextMenu(show);
    }

    deleteColumn(show) {
         this.tableContent.forEach(row => {
                row.splice(this.position.indexCell, 1);
            });
        this.TableService.saveTableData(this.tableContent);
        this.ContextMenuService.toggleContextMenu(show);
    }

    addRow(where, show) {
        const pos = where === "before" ? this.position.indexRow : this.position.indexRow + 1;
        const length = this.tableContent[0].length;
        const emptyArray = [];
        for (let i = 0; i < length; i++) {
            emptyArray[i] = "";
        }
        this.tableContent.splice(pos, 0, emptyArray);
        this.TableService.saveTableData(this.tableContent);
        this.ContextMenuService.toggleContextMenu(show);
    }

    deleteRow(show) {
        this.tableContent.splice(this.position.indexRow, 1);
        this.TableService.saveTableData(this.tableContent);
        this.ContextMenuService.toggleContextMenu(show);
    }
}