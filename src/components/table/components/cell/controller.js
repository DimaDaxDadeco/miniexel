module.exports = function($scope, TableService) {

    var self = this;

    self.solveEdit = false;

    self.selected = function(event) {

        TableService.setPosition(self.indexRow, self.indexCell);

        var node = event.currentTarget.parentNode;

        while (node.id != "table") {
            node = node.parentNode;
        }

        var cells = node.getElementsByClassName('cell'),
            cellsLength = cells.length;

        event.currentTarget.classList.toggle("selected");
        // cells[TableService.position.indexCell + TableService.indexCell * TableService.position.indexRow].style.background = 'red';

        for (var i = 0; i < cellsLength; i++) {
            if (cells[i].classList != event.currentTarget.classList) {
                cells[i].classList.remove('selected');
            }
        }
    };
    self.edit = function() {
        self.solveEdit = true;
    };
    self.save = function() {

        var cellsContent = JSON.parse(localStorage['tableContent']);

        cellsContent[TableService.position.indexRow][TableService.position.indexCell] = this.cellContent;
        localStorage['tableContent'] = JSON.stringify(cellsContent);
        TableService.cellsContent = cellsContent;

        self.solveEdit = false;
    };
    $scope.$watch(function() {
        return TableService.position;
    }, function() {
    });
}