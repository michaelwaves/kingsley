import Comment from "./Comment";
import AIComment from "./AIComment";
import { useState } from "react";
import send from "../images/send-1-svgrepo-com.svg"

function ChatBox(props) {
    const [numChildren, setNumChildren] = useState(0)
    const children = []


    for (var i = 0; i < numChildren; i++) {
        children.push(<Comment text={props.text} />)
    }



    return (
        <div>
            {children}
            <input
                type="image"
                src={send}
                alt="whoops"
                className="icon"
                onClick={() => setNumChildren(numChildren + 1)}

            />
        </div>
    )

}
export default ChatBox