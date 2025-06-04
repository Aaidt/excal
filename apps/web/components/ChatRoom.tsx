import axios from "axios";
import { ChatRoomClient } from './ChatRoomClient'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if(!BACKEND_URL){
    throw new Error('Backend url is not available.')
}


async function getChats(roomId: string){
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
    return response.data.messages
}

export async function ChatRoom({ id }: {
    id: string
}) {
    const messages = await getChats(id);
    return <ChatRoomClient id={id} messages={messages} />
}