import { useState, useEffect } from "react";

function Comment(props) {
    //const date = new Date();
    /*const showTime = () => date.getHours()
        + ':' + date.getMinutes()
        + ":" + date.getSeconds();*/

    const [time, setTime] = useState('')

    const timeStart = () => {
        const date = new Date();
        setTime(`${date.getMinutes()} : ${date.getSeconds()}`)
    }

    useEffect(() => {
        timeStart()
    }, [])

    return (
        <div className="comment">
            <p> {time} </p>
            <div className="comment-name"><p>User</p></div>
            <div className="comment-text">
                <p>{props.text}</p>
            </div>
        </div>
    )
}

export default Comment