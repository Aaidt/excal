type Shapes = {
    type: "Rect",
    x: number,
    y: number,
    width: number,
    height: number
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number
}

export default function initDraw(canvas: HTMLCanvasElement) {

    const ctx = canvas.getContext('2d');
    if (!ctx) return

    const existingShapes: Shapes[] = []

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e: MouseEvent) => {
        clicked = true
        startX = (e.clientX)
        startY = (e.clientY)
    })

    canvas.addEventListener("mouseup", (e: MouseEvent) => {
        clicked = false

        const width = e.clientX - startX
        const height = e.clientY- startY
        existingShapes.push({
            type: "Rect",
            x: startX,
            y: startY,
            width,
            height
        })
    })

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;

            clearCanvas(existingShapes, canvas, ctx)

            ctx.strokeStyle = "white"
            ctx.strokeRect(startX, startY, width, height);
        }
    })

}

function clearCanvas(existingShapes: Shapes[], canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    existingShapes.map((shape) => {
        if (shape.type === "Rect") {
            ctx.strokeStyle = "white"
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        }
    })
}