import mic from "../images/mic-black.svg"
import send from "../images/send-1-svgrepo-com.svg"
import speaker from "../images/speaker-wave-2.svg"
function Input() {
    return (
        <div className="input-bar">
            <img src={mic} alt="whoops" className="icon" />
            <img src={speaker} alt="whoops" className="icon" />
            <input type="text" className="input-box" />
            <img src={send} alt="whoops" className="icon" />
        </div>
    )
}

export default Input