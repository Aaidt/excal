"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter()

  return (
    <div className={styles.page}>
      <div>
        <input placeholder="enter roomId"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        type="text" />

        <button onClick={() => {
          router.push(`/room/${roomId}`);
        }}>Join room</button>
      </div>
    </div>
  );
}
