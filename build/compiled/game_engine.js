"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphicsManager = exports.GameEngine = void 0;
var RenderingLayers;
(function (RenderingLayers) {
    RenderingLayers[RenderingLayers["BACKGROUND"] = 0] = "BACKGROUND";
    RenderingLayers[RenderingLayers["GAME_1"] = 1] = "GAME_1";
    RenderingLayers[RenderingLayers["GAME_2"] = 2] = "GAME_2";
    RenderingLayers[RenderingLayers["UI"] = 3] = "UI";
})(RenderingLayers || (RenderingLayers = {}));
class GameEngine {
    constructor() {
        this.gameObjects = [];
        this.graphicsManager = new GraphicsManager();
    }
    updateLoop() {
        this.updateGameObjects();
        this.drawGameObjects();
        requestAnimationFrame(this.updateLoop);
    }
    updateGameObjects() {
        for (const gameObject of this.gameObjects) {
            gameObject.update();
        }
    }
    drawGameObjects() {
        for (const gameObject of this.gameObjects) {
        }
    }
}
exports.GameEngine = GameEngine;
class GameManager {
}
class GraphicsManager {
    constructor() {
        this.canvasSize = SETTINGS.canvasSize;
        this.initializeLayers();
    }
    initializeLayers() {
        this.createLayer(RenderingLayers.BACKGROUND);
        this.createLayer(RenderingLayers.GAME_1);
        this.createLayer(RenderingLayers.GAME_2);
        this.createLayer(RenderingLayers.UI);
    }
    createLayer(layer) {
        let newCanvas = document.createElement("canvas");
        let newContext = newCanvas.getContext("2d");
        newCanvas.className = 'layer';
        newCanvas.width = this.canvasSize.x;
        newCanvas.height = this.canvasSize.y;
        document.appendChild(newCanvas);
        this.canvases[layer] = newCanvas;
        this.layers[layer] = newContext;
    }
    drawOnLayer(layer, drawables) {
        let ctx = this.layers[layer];
        ctx.clearRect(0, 0, this.canvasSize.x, this.canvasSize.y);
        ctx.save();
        for (const drawable of drawables) {
            drawable.draw(ctx);
            ctx.restore();
        }
    }
}
exports.GraphicsManager = GraphicsManager;
//# sourceMappingURL=game_engine.js.map