module.exports = function($scope, TableService) {

    var self = this;

    self.titleList = [];

    $scope.$watch(function() {
        return TableService.cellsContent;
    }, function() {
        while(TableService.indexCell < self.cellsContent.length) {
            TableService.titleListAdd(TableService.indexCell);
            TableService.indexCellInc();
        }
    });
}