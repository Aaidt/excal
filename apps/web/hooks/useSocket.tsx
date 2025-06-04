'use client'
import { useState, useEffect } from "react"

export function useSocket() {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
        const token = localStorage.getItem('Authorization');
        const WS_URL = `${process.env.NEXT_PUBLIC_WS_URL}?token=${token}`;

        if (!WS_URL) {
            throw new Error('WS_URL is not available.')
        }
        const ws = new WebSocket(WS_URL as string)

        ws.onerror = (err) => {
            console.log(err);
        }

        ws.onopen = () => {
            console.log('Connected to WebSocketServer!!!')
            setLoading(false);
            setSocket(ws)
        }

        ws.onclose = () => {
            console.log('Disconnected from WebSocketServer')
        }

        // return () => {
        //     ws.close();
        // }
    }, []);

    return {
        socket,
        loading
    }
}