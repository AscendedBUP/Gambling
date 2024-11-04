// import { sizedArray2D } from "./helper_functions"

export class Vector2<T> {
    x: T
    y: T

    constructor(x: T, y: T) {
        this.x = x
        this.y = y
    }
}

export class Matrix<Type> {
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
}

export class Signal<Data=void> {
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