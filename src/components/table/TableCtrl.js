module.exports = function(TableService) {

    var self = this;

    self.addCell = function() {
        var cellContent = JSON.parse(localStorage["cellContent"]);
        var length = cellContent.length + 1;
        cellContent.push(length);
        localStorage["cellContent"] = JSON.stringify(cellContent);
        TableService.cellContent = cellContent;
    };
}