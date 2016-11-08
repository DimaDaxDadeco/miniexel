export default class HeaderCtrl {

    constructor($scope, lettersGenerator, TableService) {
        this.lettersGenerator = lettersGenerator;
        this.TableService = TableService;
        this.scope = $scope;
        this.init();
    }

    init() {
        this.scope.$watch(() => this.TableService.cellsContent, () => {
            this.cellsRow = this.TableService.cellsContent[0];
        });
    }
}