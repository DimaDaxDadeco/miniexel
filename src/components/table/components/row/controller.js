module.exports = function($scope, TableService) {

    var self = this;

    self.titleList = [];

    $scope.$watch(function() {
        return TableService.cellsContent;
    }, function() {
        if (TableService.indexCell > self.cellsContent.length) {
            TableService.titleListRemove(self.cellsContent.length);
            TableService.indexCellInc(-1);
        }
        while(TableService.indexCell < self.cellsContent.length) {
            TableService.titleListAdd(TableService.indexCell);
            TableService.indexCellInc(1);
        }
    });
}