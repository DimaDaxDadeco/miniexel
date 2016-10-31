module.exports = function($scope, TableService, KeyboardService) {

    var self = this;

    self.solveEdit = false;
    self.keyboardServiceOff = true;

    self.setPosition = function() {
        TableService.setPosition(self.indexRow, self.indexCell);
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
        self.keyboardServiceOff = false;
    };
    KeyboardService.on(function(key) {
        $scope.$apply(function() {
            if (key === "enter" && self.selected && self.keyboardServiceOff) {
                self.solveEdit = true;
            }
            self.keyboardServiceOff = true;
        });
    });
    $scope.$watch(function() {
        return TableService.position;
    }, function() {
        var position = TableService.position;
        if (position) {
            self.selected = position.indexRow === self.indexRow && position.indexCell === self.indexCell;
        }
    });
}