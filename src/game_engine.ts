import { Signal, Vector2 } from "./advanced_types";
import { SETTINGS } from "./engine_settings";

enum RenderingLayers {
    BACKGROUND,
    GAME_1,
    GAME_2,
    UI,
}

interface EngineSettings {
    
}

interface Updatable {
    disabled: boolean
    update(): void
}

interface Drawable {
    redrawQueued: boolean
    draw(ctx: CanvasRenderingContext2D): void
}

interface GameObject extends Updatable, Drawable {}


export class GameEngine {
    graphicsManager: GraphicsManager
    gameObjects: GameObject[] = []

    constructor() {
        this.graphicsManager = new GraphicsManager()
    }

    updateLoop() {
        this.updateGameObjects()
        this.drawGameObjects()

        requestAnimationFrame(this.updateLoop)
    }

    updateGameObjects() {
        for (const gameObject of this.gameObjects) {
            gameObject.update()
        }
    }

    drawGameObjects() {
        for (const gameObject of this.gameObjects) {

        }
    }
}

class GameManager {

}

export class GraphicsManager {
    canvasSize: Vector2<number>
    layers: {[key in RenderingLayers]: CanvasRenderingContext2D}
    canvases: {[key in RenderingLayers]: HTMLCanvasElement}

    constructor() {
        this.canvasSize = SETTINGS.canvasSize
        this.initializeLayers()
    }

    initializeLayers() {
        this.createLayer(RenderingLayers.BACKGROUND)
        this.createLayer(RenderingLayers.GAME_1)
        this.createLayer(RenderingLayers.GAME_2)
        this.createLayer(RenderingLayers.UI)
    }

    createLayer(layer : RenderingLayers) {
        let newCanvas = document.createElement("canvas")
        let newContext = newCanvas.getContext("2d") as CanvasRenderingContext2D

        newCanvas.className = 'layer'
        newCanvas.width = this.canvasSize.x
        newCanvas.height = this.canvasSize.y
        document.appendChild(newCanvas)

        this.canvases[layer] = newCanvas
        this.layers[layer] = newContext
    }

    drawOnLayer(layer: RenderingLayers, drawables : Drawable[]) {
        let ctx = this.layers[layer]
        ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y)
        ctx.save()

        for (const drawable of drawables) {
            drawable.draw(ctx)
            ctx.restore()
        }
    }
}