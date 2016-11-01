export default class KeyboardService {

    keyboardMap = {
        13: "enter",
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    constructor($document) {
        this.document = $document;
    }

    init() {
        this.keyEventHandlers = [];
        this.document.bind("keydown", (evt) => {
            const key = this.keyboardMap[evt.which];

            if (key) {
                evt.preventDefault();
                this._handleKeyEvent(key, evt);
            }
        });
    }

    on(cb) {
        this.keyEventHandlers.push(cb);
    }

    _handleKeyEvent(key, evt) {
        const callbacks = this.keyEventHandlers;
        if (!callbacks) {
            return;
        }

        if (callbacks) {
            callbacks.forEach(item => {
                const cb = item;
                cb(key, evt);
            });
        }
    }
}

