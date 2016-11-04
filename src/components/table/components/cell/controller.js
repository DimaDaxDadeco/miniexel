export default class CellCtrl {

    constructor($scope, TableService, KeyboardService, ContextMenuService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.ContextMenuService = ContextMenuService;
        this.init();
    }

    init() {
        this.editing = false;
        this.keyboardServiceOff = true;

        this.KeyboardService.on(key => {
            if (key === "enter" && this.selected && this.keyboardServiceOff) {
                this.scope.$apply(() => {
                    this.toggleEdit();
                });
            }
            this.keyboardServiceOff = true;
        });

        this.scope.$watch(() => this.TableService.position, () => {
            const position = this.TableService.position;
            if (position) {
                this.selected = position.indexRow === this.position.indexRow && position.indexCell === this.position.indexCell;
            }
        });
    }

    selectCell(show) {
        this.TableService.setPosition(this.position.indexRow, this.position.indexCell);
        this.ContextMenuService.toggleContextMenu(show);
    }

    toggleEdit() {
        this.editing = !this.editing;
    }

    toggleContextMenu(event, show) {
        this.ContextMenuService.toggleContextMenu(show, event, this.position);
    }

    save() {
        const cellsContent = JSON.parse(localStorage.tableContent);

        cellsContent[this.TableService.position.indexRow][this.TableService.position.indexCell] = this.cellContent;
        this.TableService.saveTableData(cellsContent);

        this.toggleEdit();
        this.keyboardServiceOff = false;
    }

    checkKeystroke(e) {
        const enterKey = 13;
        const isEnterKey = e.keyCode === enterKey;
        const isArrowKey = e.keyCode >= 37 && e.keyCode <= 40;
        return isEnterKey || isArrowKey;
    }
}