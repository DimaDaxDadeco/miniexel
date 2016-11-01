export default class TableCtrl {

    keyPressHandlers = {
        left: () => {
            if (this.canMove("left")) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell - 1);
            }
        },
        up: () => {
            if (this.canMove("up")) {
                this.TableService.setPosition(this.TableService.position.indexRow - 1, this.TableService.position.indexCell);
            }
        },
        right: () => {
            if (this.canMove("right")) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell + 1);
            }
        },
        down: () => {
            if (this.canMove("down")) {
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
            tableContent.forEach(row => {
                row.splice(numCell - 1, 0, "");
            });
            localStorage.tableContent = JSON.stringify(tableContent);
            this.TableService.cellsContent = tableContent;
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }

    deleteCell() {
        const numCell = Number(prompt("Enter the cell number that you want to delete", ""));
        const tableContent = JSON.parse(localStorage.tableContent);
        if (numCell <= tableContent[0].length && numCell > 0) {
            tableContent.forEach(row => {
                row.splice(numCell - 1, 1);
            });
            localStorage.tableContent = JSON.stringify(tableContent);
            this.TableService.cellsContent = tableContent;
            this.rows = JSON.parse(localStorage.tableContent);
        } else {
            alert("Такой колонки нет:)");
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
        const tableContent = JSON.parse(localStorage.tableContent);
        if (numRow <= tableContent.length && numRow > 0) {
            tableContent.splice(numRow - 1, 1);
            localStorage.tableContent = JSON.stringify(tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        } else {
            alert("Такого ряда нет:)");
        }
    }

    move(key) {
        this.scope.$apply(() => {
            this.keyPressHandlers[key]();
        });
    }

    canMove(direction) {
        const { indexRow, indexCell } = this.TableService.position;
        switch (direction) {
            case "left":
                return indexCell;
            case "right":
                return indexCell < this.TableService.maxIndexCell - 1;
            case "up":
                return indexRow;
            case "down":
                return indexRow < this.rows.length - 1;
            default:
                return false;
        }
    }
}