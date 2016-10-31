module.exports = function TableService() {

    var self = this;
    self.titleList = [];
    self.maxIndexCell = 0;

    self.cellsContent = JSON.parse(localStorage['tableContent']);

    self.titleListAdd = function(indexCell) {
        self.titleList.push(self.letters([indexCell+1]));
    };
    self.titleListRemove = function(indexCell) {
        self.titleList.splice(indexCell, 1)
    };
    self.indexCellInc = function(num) {
        self.maxIndexCell += num;
    };
    self.setPosition = function(indexRow, indexCell) {
        self.position = {
            indexRow: indexRow,
            indexCell: indexCell,
        };
    };
    self.letters = function(number) {
        const base = "A".charCodeAt( 0 ) - 1;
        const charAmount = 26;
        const orderLetters = [];
        while (number > charAmount) {
            orderLetters.unshift(String.fromCharCode(base + number % charAmount));
            number = Math.floor(number / charAmount);
        }
        orderLetters.unshift(String.fromCharCode(base + Math.floor(number)));
        return orderLetters.join("");
    }
    self.setPosition(0,0);
}