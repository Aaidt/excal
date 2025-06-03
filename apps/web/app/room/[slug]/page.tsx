import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BACKEND_URL = process.env.BACKEND_URL

async function getRoomId(slug: string){
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
    return response.data.id
}


export default async function ChatRoom({
    params
}: {
    params: {
        slug: string
    }
}) {
    const slug = params.slug
    const roomId = await getRoomId(slug)
}