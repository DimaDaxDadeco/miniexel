export default class ContextMenuService {

    toggleContextMenu(state, event = { clientX: null, clientY: null }, position = { indexRow: null, indexCell: null }) {
        this.contextMenu = state;
        this.coordinates = {
            coordinateX: event.clientX,
            coordinateY: event.clientY
        };
        this.position = {
            indexRow: position.indexRow,
            indexCell: position.indexCell
        };
    }

}