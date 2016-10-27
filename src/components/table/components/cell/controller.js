module.exports = function($scope, TableService) {

    var self = this;

    self.selected = function(event) {

        var node = event.currentTarget.parentNode;

        while (node.id != "table") {
            node = node.parentNode;
        }

        var cells = node.getElementsByClassName('cell'),
            cellsLength = cells.length;

        event.currentTarget.classList.toggle("selected");

        for (var i = 0; i < cellsLength; i++) {
            if (cells[i].classList != event.currentTarget.classList) {
                cells[i].classList.remove('selected');
                cells[i].classList.remove('back');
            }
        }
    };
    self.edit = function(event) {
        event.currentTarget.classList.toggle("back");
    };
    self.pressEnter = function(event) {

        var cellContent = JSON.parse(localStorage['tableContent']);

        cellContent[self.indexRow][self.indexCell] = event.currentTarget.value;
        localStorage['tableContent'] = JSON.stringify(cellContent);
        TableService.cellsContent = cellContent;

        event.currentTarget.parentNode.getElementsByClassName('cell')[1].classList.remove("back");
    };
    self.move = function(event) {
        console.log(event.keyCode);
    };
}