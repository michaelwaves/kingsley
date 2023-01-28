import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"



function Chatbot() {
    const [title, setTitle] = useState("")
    const commentData = [{ "user": "human", "text": "I love Kingston" },
    { "user": "ai", "text": "me too" },
    { "user": "human", "text": "let's move to Kingston" }]
    const [data, setData] = useState(commentData)

    return (
        <div className="chatbot">
            <Bar />
            <div className="chatbot-body" >
                {data.map((comment) => comment.user === "human" ? <Comment text={comment.text} /> : <AIComment text={comment.text} />)}
                <Comment text="what is kingston?" />
                <AIComment text="kingston is a small city beside lake ontario" />
                <Comment text={title} />
            </div>
            <div className="input-bar">
                <input type="image" src={mic} alt="whoops" className="icon" />
                <input type="image" src={speaker} alt="whoops" className="icon" />
                <input
                    type="text"
                    className="input-box"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <input
                    type="image"
                    src={send}
                    alt="whoops"
                    className="icon"

                />
            </div>
        </div>
    )
}

export default Chatbot