import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState, useRef } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"
import React from "react";
import ChatBox from "./components/ChatBox";
import AddDynamicInput from "./AddDynamicInput";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import axios from 'axios';





function Chatbot() {
    const [title, setTitle] = useState("");
    const msgField = useRef('');

    const [msgs, setMsgs] = useState([]); // hold an object ifUser: bool , text: string


    const commentData = [{ "user": "human", "text": "I love Kingston" },
    { "user": "ai", "text": "me too" },
    { "user": "human", "text": "let's move to Kingston" }]

    const map = {
        'hello': 'I love Kingston',
        'chicken': 'wings'
    }

    async function getUser() {
        try {
            // http://www.myhackathonapixdlolol.mintlify.com/api?text=theinput
            const response = await axios.get('https://whatthecommit.com/index.txt');
            console.info(response);
            return response.data
        } catch (error) {
            console.error(error);
        }
        return null
    }

    const clickBtn = async () => {
        const msg = title;

        const newMsgs = []

        const oldMsgs = msgs;

        newMsgs.push({
            isUser: true,
            text: msg
        })

        const response = await getUser();

        newMsgs.push({
            isUser: false,
            text: response
        })

        /*if (map[msg]) {
            newMsgs.push({
                isUser: false,
                text: map[msg]
            })
        }*/

        setMsgs([...oldMsgs, ...newMsgs])
        setTitle('')
    }


    return (
        <div className="chatbot">
            <Bar />
            {msgs.map((msg, index) => (
                msg.isUser ?
                    <Comment key={index} text={msg.text} />
                    :
                    <AIComment key={index} text={msg.text} />
            ))
            }
            <div className="input-bar">
                <input type="image" src={mic} alt="whoops" className="icon" />
                <input type="image" src={speaker} alt="whoops" className="icon" />
                <input
                    type="text"
                    className="input-box"
                    ref={msgField}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="image"
                    src={send}
                    alt="whoops"
                    className="icon"
                    onClick={() => clickBtn()}
                />
            </div>
        </div>
    )
}

export default Chatbot