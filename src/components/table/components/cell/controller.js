module.exports = function($scope, TableService) {

    var self = this;

    self.titleName = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    self.titleList = [];

    TableService.cellContent.forEach(function(item, i) {
        self.titleList.push(self.titleName[i]);
    });

    $scope.$watch(function() {
        return TableService.cellContent;
    }, function() {
        self.cellContent = TableService.cellContent;
        self.titleList.push(self.titleName[TableService.cellContent.length]);
    });


}