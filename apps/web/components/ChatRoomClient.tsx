'use client'

import { useState, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket'

export function ChatRoomClient({
    messages,
    id
}: {
    messages: { messages: string }[],
    id: string
}) {
    const [chats, setChats] = useState(messages)
    const { socket, loading } = useSocket()
    const [currentMessage, setCurrentMessage] = useState('')

    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === 'chat') {
                    setChats(c => [...c, {messages: parsedData.message}])
                }
            }
        }

        return () => {
            socket?.close()
        }
    }, [loading, socket, id])

    return <div>
        {messages.map((m, index) => <div key={index}>{m.messages}</div>)}

        <input type='text' placeholder='enter message...'
        value={currentMessage} onChange={e => {
            setCurrentMessage(e.target.value)
        }} />
        <button onClick={() => {
            socket?.send(JSON.stringify({
                type: 'chat',
                roomId: id,
                message: currentMessage
            }))
            setCurrentMessage('')
        }}>Send message</button>
    </div>
}