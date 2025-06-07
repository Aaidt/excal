import { useRef, useEffect } from "react"
import initDraw from "@/draw"

export function Canvas({roomId, socket}: {
    roomId: string,
    socket: WebSocket
}){

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }

    }, [canvasRef])

    return (
        <canvas ref={canvasRef} width={2000} height={1000}></canvas>
    )
}