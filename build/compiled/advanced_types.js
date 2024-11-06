// import { sizedArray2D } from "./helper_functions"
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Matrix {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.columns = sizedArray2D(width, height);
        this.rows = sizedArray2D(height, width);
    }
    replaceItem(x, y, item) {
        this.columns[x][y] = item;
        this.rows[y][x] = item;
    }
    replaceColumn(index, ...items) {
        if (items.length != this.height)
            throw new Error("Invalid new Column size");
        for (let y = 0; y < this.height; y++) {
            this.columns[index][y] = items[y];
        }
    }
    replaceRow(index, ...items) {
        if (items.length != this.width)
            throw new Error("Invalid new Row size");
        for (let X = 0; X < this.width; X++) {
            this.rows[index][X] = items[X];
        }
    }
}
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
//# sourceMappingURL=advanced_types.js.map