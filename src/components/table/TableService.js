module.exports = function TableService() {

    var self = this;

    localStorage["cellContent"] = JSON.stringify([1,2,3,4]);
    self.cellContent = JSON.parse(localStorage['cellContent']);
}