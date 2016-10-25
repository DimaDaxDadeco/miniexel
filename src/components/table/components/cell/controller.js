module.exports = function() {

    var self = this;

    self.prohibitEdit = true;

    self.focus = function(event) {
        event.currentTarget.classList.toggle("focus");
        console.log(event.currentTarget);
        console.log(event.currentTarget.parentNode.parentNode.getElementsByClassName('cell')[0].classList);
    };
    self.edit = function() {
        self.prohibitEdit = false;
    };
}