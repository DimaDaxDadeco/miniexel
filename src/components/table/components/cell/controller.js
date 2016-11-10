export default class CellCtrl {

    constructor($scope, TableService, KeyboardService, ContextMenuService, localStorageService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.ContextMenuService = ContextMenuService;
        this.localStorageService = localStorageService;
        this.init();
    }

    init() {
        this.editing = false;
        this.KeyboardService.on(this.onKeypress);
        this.scope.$watch(() => this.TableService.position, () => {
            const { position } = this.TableService;
            if (position) {
                this.selected = position.rowIndex === this.position.rowIndex && position.cellIndex === this.position.cellIndex;
            }
        });
    }

    onKeypress = key => {
        if (!this.selected) {
            return;
        }
        if (key === "enter") {
            return this.onEnterPress();
        }
        const isArrowKey = ["up", "down", "left", "right"].includes(key);
        if (isArrowKey) {
            this.save();
        }
    }

    onEnterPress = () => {
        if (this.editing) {
            this.save();
        } else {
            this.toggleEdit();
        }
        this.scope.$apply();
    }

    selectCell() {
        this.TableService.setPosition(this.position);
        this.ContextMenuService.hide();
    }

    toggleEdit() {
        this.editing = !this.editing;
    }

    showContextMenu(event) {
        this.ContextMenuService.show(event, this.position);
    }

    save() {
        const cellsContent = this.localStorageService.get("tableContent");
        cellsContent[this.TableService.position.rowIndex][this.TableService.position.cellIndex] = this.cellContent;
        this.TableService.saveTableData(cellsContent);
        this.toggleEdit();
    }
}