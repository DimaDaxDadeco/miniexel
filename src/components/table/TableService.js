export default class TableService {

    constructor(lettersGenerator) {
        this.lettersGenerator = lettersGenerator;
        this.init();
    }

    init() {
        this.titleList = [];
        this.maxIndexCell = 0;
        this.cellsContent = JSON.parse(localStorage.tableContent);
        this.setPosition(0, 0);
    }

    titleListAdd(indexCell) {
        this.titleList.push(this.lettersGenerator(indexCell + 1));
    }

    titleListRemove(indexCell) {
        this.titleList.splice(indexCell, 1);
    }

    indexCellInc(num) {
        this.maxIndexCell += num;
    }

    setPosition(indexRow, indexCell) {
        this.position = {
            indexRow,
            indexCell
        };
    }

    saveTableData(tableContent) {
        localStorage.tableContent = JSON.stringify(tableContent);
        this.cellsContent = tableContent;
    }
}