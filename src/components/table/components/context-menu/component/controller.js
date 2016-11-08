export default class ContextMenu {

    constructor($scope, TableService, ContextMenuService, localStorageService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.ContextMenuService = ContextMenuService;
        this.localStorageService = localStorageService;
        this.init();
    }

    init() {
        this.ContextMenuService.hide();
        this.scope.$watch(() => this.ContextMenuService.coordinates, () => {
            this.isContextMenuShowing = this.ContextMenuService.isContextMenuShowing;
            this.tableContent = this.localStorageService.get("tableContent");
            const { coordinates, position } = this.ContextMenuService;
            if (coordinates && position) {
                this.coordinates = {
                    left: coordinates.x,
                    top: coordinates.y
                };
                this.position = {
                    rowIndex: position.rowIndex,
                    cellIndex: position.cellIndex
                };
            }
        });
    }

    addColumn(where) {
        this.TableService.addColumn(where, this.position.cellIndex);
    }

    deleteColumn() {
        this.TableService.deleteColumn(this.position.cellIndex);
    }

    addRow(where) {
        this.TableService.addRow(where, this.position.rowIndex);
    }

    deleteRow() {
        this.TableService.deleteRow(this.position.rowIndex);
    }
}