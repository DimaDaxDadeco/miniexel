export default class TableService {

    constructor(lettersGenerator, localStorageService, ContextMenuService) {
        this.lettersGenerator = lettersGenerator;
        this.localStorageService = localStorageService;
        this.ContextMenuService = ContextMenuService;
        this.init();
    }

    init() {
        this.cellsContent = this.localStorageService.get("tableContent");
        this.setPosition({ rowIndex: 0, cellIndex: 0 });
    }

    movePosition(direction) {
        if (this.canMove(direction)) {
            const offsetDirection = {
                left: [0, -1],
                right: [0, 1],
                up: [-1, 0],
                down: [1, 0]
            };
            this.position = {
                rowIndex: this.position.rowIndex += offsetDirection[direction][0],
                cellIndex: this.position.cellIndex += offsetDirection[direction][1]
            };
        }
    }

    canMove(direction) {
        const { rowIndex, cellIndex } = this.position;
        switch (direction) {
            case "left":
                return cellIndex;
            case "right":
                return cellIndex < this.cellsContent[0].length - 1;
            case "up":
                return rowIndex;
            case "down":
                return rowIndex < this.cellsContent.length - 1;
            default:
                return false;
        }
    }

    setPosition(position) {
        this.position = {
            rowIndex: position.rowIndex,
            cellIndex: position.cellIndex
        };
    }

    saveTableData(tableContent) {
        this.localStorageService.set("tableContent", tableContent);
        this.cellsContent = [...tableContent];
    }

    addColumn(where, cellIndex) {
        let pos;
        if (where === "before") {
            const nextPosition = Object.assign({}, this.position, {
                cellIndex: this.position.cellIndex + 1
            });
            pos = cellIndex;
            this.setPosition(nextPosition);
        } else {
            pos = cellIndex + 1;
        }
        this.cellsContent.forEach(row => {
            row.splice(pos, 0, "");
        });
        this.saveTableData(this.cellsContent);
        this.ContextMenuService.hide();
    }

    deleteColumn(cellIndex) {
        if (this.canDelete(cellIndex, this.cellsContent[0].length)) {
            this.cellsContent.forEach(row => {
                    row.splice(cellIndex, 1);
            });
            this.saveTableData(this.cellsContent);
            this.ContextMenuService.hide();
        } else {
            alert("Can't delete last column.");
            this.ContextMenuService.hide();
        }
    }

    addRow(where, rowIndex) {
        let pos;
        if (where === "before") {
            const nextPosition = Object.assign({}, this.position, {
                rowIndex: this.position.rowIndex + 1
            });
            pos = rowIndex;
            this.setPosition(nextPosition);
        } else {
            pos = rowIndex + 1;
        }
        const length = this.cellsContent[0].length;
        const emptyArray = [];
        for (let i = 0; i < length; i++) {
            emptyArray[i] = "";
        }
        this.cellsContent.splice(pos, 0, emptyArray);
        this.saveTableData(this.cellsContent);
        this.ContextMenuService.hide();
    }

    deleteRow(rowIndex) {
        if (this.canDelete(rowIndex, this.cellsContent.length)) {
            this.cellsContent.splice(rowIndex, 1);
            this.saveTableData(this.cellsContent);
            this.ContextMenuService.hide();
        } else {
            alert("Can't delete last row.");
            this.ContextMenuService.hide();
        }
    }

    canDelete = (index, length) => index !== 0 || length !== 1;
}