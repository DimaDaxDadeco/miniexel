module.exports = function($scope, TableService) {

    var self = this;

    self.rows = JSON.parse(localStorage["tableContent"]);
    self.titleList = TableService.titleList;

    self.addCell = function() {
        var numCell = Number(prompt('Enter the cell number that you want to add', ''));
        if (numCell) {
            var tableContent = JSON.parse(localStorage["tableContent"]);
            tableContent.forEach(function(item) {
                item.splice(numCell - 1, 0, "");
            });
            localStorage["tableContent"] = JSON.stringify(tableContent);
            TableService.cellsContent = tableContent;
            self.rows = JSON.parse(localStorage["tableContent"]);
        }
    };
    self.deleteCell = function() {
        var numCell = Number(prompt('Enter the cell number that you want to delete', ''));
        if (numCell) {
            var tableContent = JSON.parse(localStorage["tableContent"]);
            tableContent.forEach(function(item) {
                item.splice(numCell - 1, 1);
            });
            localStorage["tableContent"] = JSON.stringify(tableContent);
            TableService.cellsContent = tableContent;
            self.rows = JSON.parse(localStorage["tableContent"]);
        }
    }
    self.addRow  = function() {
        var numRow = Number(prompt('Enter the row number that you want to add', ''));
        if (numRow) {
            var tableContent = JSON.parse(localStorage["tableContent"]);
            var length = tableContent[0].length;
            var emptyArray = [];
            for (var i = 0; i < length; i++) {
                emptyArray[i] = "";
            }
            tableContent.splice(numRow - 1, 0, emptyArray);
            localStorage["tableContent"] = JSON.stringify(tableContent);
            self.rows = JSON.parse(localStorage["tableContent"]);
        }
    };
    self.deleteRow = function() {
        var numRow = Number(prompt('Enter the row number that you want to delete', ''));
        if (numRow) {
            var tableContent = JSON.parse(localStorage["tableContent"]);
                tableContent.splice(numRow - 1, 1);
            localStorage["tableContent"] = JSON.stringify(tableContent);
            self.rows = JSON.parse(localStorage["tableContent"]);
        }
    };
}