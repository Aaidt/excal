"use client"

import { useState, useEffect } from "react"
import { Canvas } from "./Canvas"

export default function RoomCanvas({ roomId }: {
    roomId: string
}) {
    
    const [socket, setSocket] = useState<WebSocket | null>(null)

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
    if(!WS_URL){
        console.log("No websocket url provided");
        return
    }

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({
                type: "join_room",
                roomId 
            }))
        } 

    }, [WS_URL])

   

    if(!socket){
        return <div className="flex justify-center items-center pt-50 text-xl font-bold ">
            Connecting to the server.....
        </div>
    }

    return (
        <div>
            <Canvas roomId={roomId} socket={socket} />
            
        </div>
    )
}
