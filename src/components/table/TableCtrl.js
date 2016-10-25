module.exports = function(TableService) {

    var self = this;

    self.rows = JSON.parse(localStorage["tableContent"]);
    self.titleList = TableService.titleList;

    self.addCell = function() {
        var tableContent = JSON.parse(localStorage["tableContent"]);
        tableContent.forEach(function(item) {
            item.push("");
        });
        localStorage["tableContent"] = JSON.stringify(tableContent);
        TableService.cellsContent = tableContent;
        self.rows = JSON.parse(localStorage["tableContent"]);
    };

    self.addRow  = function() {
        var tableContent = JSON.parse(localStorage["tableContent"]);
        var length = tableContent[0].length;
        var emptyArray = [];
        for (var i = 0; i < length; i++) {
            emptyArray[i] = "";
        }
        tableContent.push(emptyArray);
        localStorage["tableContent"] = JSON.stringify(tableContent);
        self.rows = JSON.parse(localStorage["tableContent"]);
    };
}