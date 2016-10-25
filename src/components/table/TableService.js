module.exports = function TableService() {

    var self = this;
    self.titleList = [];
    self.indexCell = 0;

    /*localStorage["tableContent"] = JSON.stringify([[1,2,3,4]]);
    localStorage["tableContent"] = JSON.stringify([[1,2,3,4],[5,6,7,3]]);*/
    self.cellsContent = JSON.parse(localStorage['tableContent']);

    self.titleListAdd = function(indexCell) {
        var titleName = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        self.titleList.push(titleName[indexCell]);
        // console.log(self.titleList);
    };
    self.indexCellInc = function() {
        ++self.indexCell;
    }
}