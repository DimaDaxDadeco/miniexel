export default class {

    constructor($scope, TableService, KeyboardService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.init();
    }

    init() {
        this.editingEnabled = false;
        this.keyboardServiceOff = true;

        this.KeyboardService.on(key => {
            if (key === "enter" && this.selected && this.keyboardServiceOff) {
                this.scope.$apply(() => {
                    this.editingEnabled = true;
                });
            }
            this.keyboardServiceOff = true;
        });

        this.scope.$watch(() => this.TableService.position, () => {
            const position = this.TableService.position;
            if (position) {
                this.selected = position.indexRow === this.indexRow && position.indexCell === this.indexCell;
            }
        });
    }

    selectCell() {
        this.TableService.setPosition(this.indexRow, this.indexCell);
    }

    edit() {
        this.editingEnabled = true;
    }

    save() {
        const cellsContent = JSON.parse(localStorage.tableContent);

        cellsContent[this.TableService.position.indexRow][this.TableService.position.indexCell] = this.cellContent;
        this.TableService.saveTableData(cellsContent);

        this.editingEnabled = false;
        this.keyboardServiceOff = false;
    }
}