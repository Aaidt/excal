import axios from "axios";

import { ChatRoom } from "../../../components/ChatRoom"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL 
console.log(BACKEND_URL)
if(!BACKEND_URL){
    throw new Error('Backend url is not available.')
}

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.roomId
}


export default async function ChatRoom1({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = (await params).slug
    const roomId = await getRoomId(slug)

    return <ChatRoom id={roomId} />
}