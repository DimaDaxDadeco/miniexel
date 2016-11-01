export default class TableService {

    constructor() {
        this.titleList = [];
        this.maxIndexCell = 0;
        this.cellsContent = JSON.parse(localStorage.tableContent);
        this.setPosition(0, 0);
    }

    titleListAdd(indexCell) {
        this.titleList.push(this.letters([indexCell + 1]));
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

    letters(number) {
        const base = "A".charCodeAt(0) - 1;
        const charAmount = 26;
        const orderLetters = [];
        while (number > charAmount) {
            orderLetters.unshift(String.fromCharCode(base + number % charAmount));
            number = Math.floor(number / charAmount);
        }
        orderLetters.unshift(String.fromCharCode(base + Math.floor(number)));
        return orderLetters.join("");
    }
}