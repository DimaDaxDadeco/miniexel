export default class TableCtrl {

    keyPressHandlers = {
        moveLeft: () => {
            if (this.canMove("left")) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell - 1);
            }
        },
        moveUp: () => {
            if (this.canMove("up")) {
                this.TableService.setPosition(this.TableService.position.indexRow - 1, this.TableService.position.indexCell);
            }
        },
        moveRight: () => {
            if (this.canMove("right")) {
                this.TableService.setPosition(this.TableService.position.indexRow, this.TableService.position.indexCell + 1);
            }
        },
        moveDown: () => {
            if (this.canMove("down")) {
                this.TableService.setPosition(this.TableService.position.indexRow + 1, this.TableService.position.indexCell);
            }
        }
    };

    constructor($scope, TableService, KeyboardService, ContextMenuService) {
        this.scope = $scope;
        this.TableService = TableService;
        this.KeyboardService = KeyboardService;
        this.ContextMenuService = ContextMenuService;
        this.init();
    }

    init() {
        this.titleList = this.TableService.titleList;
        this.rows = JSON.parse(localStorage.tableContent);
        this.KeyboardService.init();
        this.KeyboardService.on(key => {
            if (key !== "enter") {
                this.move(key);
            }
        });
        this.scope.$watch(() => this.TableService.cellsContent, () => {
            if (this.TableService.maxIndexCell > this.TableService.rows[0].length) {
                this.TableService.titleListRemove(this.TableService.rows[0].length);
                this.TableService.indexCellInc(-1);
            }
            while (this.TableService.maxIndexCell < this.TableService.rows[0].length) {
                this.TableService.titleListAdd(this.TableService.maxIndexCell);
                this.TableService.indexCellInc(1);
            }
        });
        this.scope.$watch(() => this.ContextMenuService.contextMenu, () => {
            this.contextMenu = this.ContextMenuService.contextMenu;
            this.rows = this.TableService.rows;
        });
    }

    move(key) {
        const keys = {
            left: "moveLeft",
            up: "moveUp",
            right: "moveRight",
            down: "moveDown"
        };
        this.scope.$apply(() => {
            this.keyPressHandlers[keys[key]]();
        });
    }

    canMove(direction) {
        const { indexRow, indexCell } = this.TableService.position;
        switch (direction) {
            case "left":
                return indexCell;
            case "right":
                return indexCell < this.TableService.maxIndexCell - 1;
            case "up":
                return indexRow;
            case "down":
                return indexRow < this.rows.length - 1;
            default:
                return false;
        }
    }
}