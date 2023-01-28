import { useState } from "react"
import mic from "../images/mic-black.svg"
import send from "../images/send-1-svgrepo-com.svg"
import speaker from "../images/speaker-wave-2.svg"
function Input() {
    const [title, setTitle] = useState("")
    return (
        <div className="input-bar">
            <input type="image" src={mic} alt="whoops" className="icon" />
            <input type="image" src={speaker} alt="whoops" className="icon" />
            <input
                type="text"
                className="input-box"
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            <input type="image" src={send} alt="whoops" className="icon" />
        </div>
    )
}

export default Input