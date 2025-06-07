

export default function initDraw(canvas: HTMLCanvasElement) {
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return
    }
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
        console.log(e.clientX)
        console.log(e.clientY)
    })

    canvas.addEventListener("mousemove", (e: MouseEvent) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "black"
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            ctx.strokeStyle = "white"
            ctx.strokeRect(startX, startY, width, height);
        }
    })

}