module.exports = function($scope, TableService, KeyboardService) {

    var self = this;

    self.solveEdit = false;

    self.setPosition = function(event) {
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
    };
    KeyboardService.on(function(key) {
        $scope.$apply(function() {
            if (key === "enter" && self.selected) {
                self.solveEdit = true;
            }
        })
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