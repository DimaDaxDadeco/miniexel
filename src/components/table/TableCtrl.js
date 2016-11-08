export default class TableCtrl {

    constructor($scope, TableService, KeyboardService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.init();
    }

    init() {
        let cellNum = 0;
        this.titleList = this.TableService.titleList;
        this.rows = this.TableService.cellsContent;
        this.KeyboardService.init();
        this.KeyboardService.on(key => {
            if (key !== "enter") {
                this.move(key);
            }
        });
        this.scope.$watch(() => this.TableService.cellsContent, () => {
            if (cellNum > this.TableService.cellsContent[0].length) {
                this.rows = this.TableService.cellsContent;
            }
            while (cellNum < this.TableService.cellsContent[0].length) {
                this.rows = this.TableService.cellsContent;
                cellNum++;
            }
            if (this.TableService.cellsContent.length !== this.rows.length) {
                this.rows = this.TableService.cellsContent;
            }
        });
    }

    move(direction) {
       this.scope.$apply(() => {
            this.TableService.movePosition(direction);
        });
    }
}