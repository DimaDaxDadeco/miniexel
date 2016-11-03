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
    tableContent = JSON.parse(localStorage.tableContent);

    constructor($scope, TableService, KeyboardService, ContextMenuService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.ContextMenuService = ContextMenuService;
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
        this.scope.$watch(() => this.TableService.cellsContent, () => {
            if (this.TableService.maxIndexCell > this.TableService.rows[0].length) {
                this.TableService.titleListRemove(this.TableService.rows[0].length);
                this.TableService.indexCellInc(-1);
            }
            while (this.TableService.maxIndexCell < this.TableService.rows[0].length) {
                this.TableService.titleListAdd(this.TableService.maxIndexCell);
                this.TableService.indexCellInc(1);
            }
        });
        this.scope.$watch(() => this.ContextMenuService.contextMenu, () => {
            this.contextMenu = this.ContextMenuService.contextMenu;
            this.rows = this.TableService.rows;
        });
    }

    /*addColumn() {
        const numCell = Number(prompt("Enter the cell number that you want to add", ""));
        if (numCell) {
            this.tableContent.forEach(row => {
                row.splice(numCell - 1, 0, "");
            });
            this.TableService.saveTableData(this.tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }

    deleteColumn() {
        const numCell = Number(prompt("Enter the cell number that you want to delete", ""));
        if (numCell <= this.tableContent[0].length && numCell > 0) {
            this.tableContent.forEach(row => {
                row.splice(numCell - 1, 1);
            });
            this.TableService.saveTableData(this.tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        } else {
            alert("Такой колонки нет:)");
        }
    }

    addRow() {
        const numRow = Number(prompt("Enter the row number that you want to add", ""));
        if (numRow) {
            const length = this.tableContent[0].length;
            const emptyArray = [];
            for (let i = 0; i < length; i++) {
                emptyArray[i] = "";
            }
            this.tableContent.splice(numRow - 1, 0, emptyArray);
            this.TableService.saveTableData(this.tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        }
    }

    deleteRow() {
        const numRow = Number(prompt("Enter the row number that you want to delete", ""));
        if (numRow <= this.tableContent.length && numRow > 0) {
            console.log(this.tableContent);
            this.tableContent.splice(numRow - 1, 1);
            this.TableService.saveTableData(this.tableContent);
            this.rows = JSON.parse(localStorage.tableContent);
        } else {
            alert("Такого ряда нет:)");
        }
    }*/

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