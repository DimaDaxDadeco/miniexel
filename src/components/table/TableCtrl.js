export default class {

    keyPressHandlers = {
        left: () => {
            if (this.TableService.position.indexCell) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell - 1);
            }
        },
        up: () => {
            if (this.TableService.position.indexRow) {
                this.TableService.setPosition(this.TableService.position.indexRow - 1, this.TableService.position.indexCell);
            }
        },
        right: () => {
            if (this.TableService.position.indexCell < this.TableService.maxIndexCell - 1) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell + 1);
            }
        },
        down: () => {
            if (this.TableService.position.indexRow < this.rows.length - 1) {
                this.TableService.setPosition(this.TableService.position.indexRow + 1, this.TableService.position.indexCell);
            }
        }
    };

    constructor($scope, TableService, KeyboardService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.init();
    }

    init() {
        this.titleList = this.TableService.titleList;
        this.rows = JSON.parse(localStorage.tableContent);
        this.KeyboardService.init();
        this.KeyboardService.on(key => {
            if (key !== "enter") {
                this.move(key);
            }
        });
    }

    addCell() {
        const numCell = Number(prompt("Enter the cell number that you want to add", ""));
        if (numCell) {
            const tableContent = JSON.parse(localStorage.tableContent);
            tableContent.forEach(item => {
                item.splice(numCell - 1, 0, "");
            });
            localStorage.tableContent = JSON.stringify(tableContent);
            this.TableService.cellsContent = tableContent;
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }

    deleteCell() {
        const numCell = Number(prompt("Enter the cell number that you want to delete", ""));
        if (numCell) {
            const tableContent = JSON.parse(localStorage.tableContent);
            tableContent.forEach(item => {
                item.splice(numCell - 1, 1);
            });
            localStorage.tableContent = JSON.stringify(tableContent);
            this.TableService.cellsContent = tableContent;
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }
    addRow() {
        const numRow = Number(prompt("Enter the row number that you want to add", ""));
        if (numRow) {
            const tableContent = JSON.parse(localStorage.tableContent);
            const length = tableContent[0].length;
            const emptyArray = [];
            for (let i = 0; i < length; i++) {
                emptyArray[i] = "";
            }
            tableContent.splice(numRow - 1, 0, emptyArray);
            localStorage.tableContent = JSON.stringify(tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }
    deleteRow() {
        const numRow = Number(prompt("Enter the row number that you want to delete", ""));
        if (numRow) {
            const tableContent = JSON.parse(localStorage.tableContent);
            tableContent.splice(numRow - 1, 1);
            localStorage.tableContent = JSON.stringify(tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }
    move(key) {
        this.scope.$apply(() => {
            this.keyPressHandlers[key]();
        });
    }
}