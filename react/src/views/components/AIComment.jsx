import { useState, useEffect } from "react"
import kingsley_pfp from "../images/kingsley_head.png"

function AIComment(props) {

    const [time, setTime] = useState("")

    const startTime = () => {
        const date = new Date();
        setTime(date.getHours()
            + ':' + date.getMinutes())
    }
    //+ ":" + date.getSeconds();

    useEffect(() => {
        startTime()
    }, []
    )


    const links = props.links.map((link) => (<li><a href={link}>{link}</a></li>))
    return (
        <div className="comment">
            <p>{time}</p>
            <div className="ai-comment-name"><img src={kingsley_pfp} alt="whoops" /><p>Kingsley</p></div>
            <div className="ai-comment-text">
                <p>{props.text}</p>
            </div>
            <div className="ai-comment-links">
                <ul>
                    {links}
                </ul>
            </div>
        </div>
    )
}

export default AIComment