module.exports = function($scope, TableService) {

    var self = this;

    self.titleList = [];

    $scope.$watch(function() {
        return TableService.cellsContent;
    }, function() {
        if (TableService.maxIndexCell > self.cellsContent.length) {
            TableService.titleListRemove(self.cellsContent.length);
            TableService.indexCellInc(-1);
        }
        while(TableService.maxIndexCell < self.cellsContent.length) {
            TableService.titleListAdd(TableService.maxIndexCell);
            TableService.indexCellInc(1);
        }
    });
}