module.exports = function TableService($document, KeyboardService) {

    var self = this;
    self.titleList = [];
    self.indexCell = 0;

    self.cellsContent = JSON.parse(localStorage['tableContent']);

    self.titleListAdd = function(indexCell) {
        self.titleList.push(self.letters([indexCell+1]));
    };
    self.titleListRemove = function(indexCell) {
        self.titleList.splice(indexCell, 1)
    };
    self.indexCellInc = function(num) {
        self.indexCell += num;
    };
    self.setPosition = function(indexRow, indexCell) {
        self.position = {
            indexRow: indexRow,
            indexCell: indexCell,
        };
    };
    self.move = function(key) {
        if(key == 'left') {
            self.setPosition(self.position.indexRow, self.position.indexCell - 1);
        } else if (key == 'up') {
            self.setPosition(self.position.indexRow - 1, self.position.indexCell);
        } else if (key == 'right') {
            self.setPosition(self.position.indexRow, self.position.indexCell + 1);
        } else if (key == 'down') {
            self.setPosition(self.position.indexRow + 1, self.position.indexCell);
        }
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
    KeyboardService.init();
    KeyboardService.on(function(key) {
        self.move(key);
    });
}