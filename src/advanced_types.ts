// import { sizedArray2D } from "./helper_functions"

class Vector2<T> {
    x: T
    y: T

    constructor(x: T, y: T) {
        this.x = x
        this.y = y
    }
}

class Matrix<Type> {
    width: number
    height: number
    columns: Type[][]
    rows: Type[][]

    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.columns = sizedArray2D(width, height)
        this.rows = sizedArray2D(height, width)
    }

    replaceItem(x: number, y: number, item: Type) {
        this.columns[x][y] = item
        this.rows[y][x] = item
    }

    replaceColumn(index: number, ...items: Type[]) {
        if (items.length != this.height)
            throw new Error("Invalid new Column size");
        
        for (let y = 0; y < this.height; y++) {
            this.replaceItem(index, y, items[y])
        }
    }

    replaceRow(index: number, ...items: Type[]) {
        if (items.length != this.width)
            throw new Error("Invalid new Row size");
        
        for (let x = 0; x < this.width; x++) {
            this.replaceItem(x, index, items[x])
        }
    }
}

class Signal<Data=void> {
    listeners: CallableFunction[] = [];

    addEventListener(listener: CallableFunction) {
        this.listeners.push(listener);
    }

    notify(data : Data) {
        this.listeners.forEach(listener => {
            listener(data)
        })
    }
}