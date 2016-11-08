export default class CellCtrl {

    constructor($scope, TableService, KeyboardService, ContextMenuService, localStorageService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.ContextMenuService = ContextMenuService;
        this.localStorageService = localStorageService;
        this.init();
    }

    init() {
        this.editing = false;
        this.keyboardServiceOff = false;

        this.KeyboardService.on(key => {
            if (key === "enter" && this.selected && this.keyboardServiceOff) {
                this.scope.$apply(() => {
                    this.toggleEdit();
                });
            }
            this.keyboardServiceOff = true;
        });

        this.scope.$watch(() => this.TableService.position, () => {
            const { position } = this.TableService;
            if (position) {
                this.selected = position.rowIndex === this.position.rowIndex && position.cellIndex === this.position.cellIndex;
            }
        });
    }

    selectCell() {
        this.TableService.setPosition(this.position);
        this.ContextMenuService.hide();
    }

    toggleEdit() {
        this.editing = !this.editing;
    }

    show(event) {
        this.ContextMenuService.show(event, this.position);
    }

    hide() {
        this.ContextMenuService.hide();
    }

    save() {
        const cellsContent = this.localStorageService.get("tableContent");

        cellsContent[this.TableService.position.rowIndex][this.TableService.position.cellIndex] = this.cellContent;
        this.TableService.saveTableData(cellsContent);

        this.toggleEdit();
        this.keyboardServiceOff = false;
    }

    checkKeystroke(e) {
        const enterKey = 13;
        const isEnterKey = e.keyCode === enterKey;
        const isArrowKey = e.keyCode >= 37 && e.keyCode <= 40;
        return isEnterKey || isArrowKey;
    }
}