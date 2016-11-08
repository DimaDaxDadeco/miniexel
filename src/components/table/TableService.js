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
        const pos = where === "before" ? cellIndex : cellIndex + 1;
        this.cellsContent.forEach(row => {
            row.splice(pos, 0, "");
        });
        this.saveTableData(this.cellsContent);
        this.ContextMenuService.hide();
    }

    deleteColumn(cellIndex) {
         this.cellsContent.forEach(row => {
                row.splice(cellIndex, 1);
            });
        this.saveTableData(this.cellsContent);
        this.ContextMenuService.hide();
    }

    addRow(where, rowIndex) {
        const pos = where === "before" ? rowIndex : rowIndex + 1;
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
        this.cellsContent.splice(rowIndex, 1);
        this.saveTableData(this.cellsContent);
        this.ContextMenuService.hide();
    }
}