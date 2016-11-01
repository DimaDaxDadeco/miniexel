export default class {

    constructor($scope, TableService, KeyboardService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.init();
    }

    init() {
        this.solveEdit = false;
        this.keyboardServiceOff = true;

        this.KeyboardService.on(key => {
            this.scope.$apply(() => {
                if (key === "enter" && this.selected && this.keyboardServiceOff) {
                    this.solveEdit = true;
                }
                this.keyboardServiceOff = true;
            });
        });

        this.scope.$watch(() => this.TableService.position, () => {
            const position = this.TableService.position;
            if (position) {
                this.selected = position.indexRow === this.indexRow && position.indexCell === this.indexCell;
            }
        });
    }

    setPosition() {
        this.TableService.setPosition(this.indexRow, this.indexCell);
    }

    edit() {
        this.solveEdit = true;
    }

    save() {
        const cellsContent = JSON.parse(localStorage.tableContent);

        cellsContent[this.TableService.position.indexRow][this.TableService.position.indexCell] = this.cellContent;
        localStorage.tableContent = JSON.stringify(cellsContent);
        this.TableService.cellsContent = cellsContent;

        this.solveEdit = false;
        this.keyboardServiceOff = false;
    }
}