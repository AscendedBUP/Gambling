"use strict";
// import { sizedArray2D } from "./helper_functions"
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signal = exports.Matrix = exports.Vector2 = void 0;
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Vector2 = Vector2;
class Matrix {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.columns = sizedArray2D(width, height);
        this.rows = sizedArray2D(height, width);
    }
}
exports.Matrix = Matrix;
class Signal {
    constructor() {
        this.listeners = [];
    }
    addEventListener(listener) {
        this.listeners.push(listener);
    }
    notify(data) {
        this.listeners.forEach(listener => {
            listener(data);
        });
    }
}
exports.Signal = Signal;
//# sourceMappingURL=advanced_types.js.map