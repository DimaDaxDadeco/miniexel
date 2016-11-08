export default class ContextMenuService {

    show({ clientX = null, clientY = null }, { rowIndex = null, cellIndex = null }) {
        this.isContextMenuShowing = true;
        this.coordinates = {
            x: clientX,
            y: clientY
        };
        this.position = {
            rowIndex,
            cellIndex
        };
    }

    hide() {
        this.isContextMenuShowing = false;
    }
}