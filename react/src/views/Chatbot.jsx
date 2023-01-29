import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState, useRef, useEffect } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"
import Speech from "./components/Speech";
import React from "react";
import ChatBox from "./components/ChatBox";
import MicRecorder from "mic-recorder-to-mp3"
import axios, * as others from 'axios';
import AddDynamicInput from "./bloopers/AddDynamicInput";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import Dictaphone from "./components/Dictaphone";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';




function Chatbot() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition()

    const [title, setTitle] = useState("");
    const [isRecording, setIsRecording] = useState(null)
    const msgField = useRef('');

    const [msgs, setMsgs] = useState([]); // hold an object ifUser: bool , text: string

    const startRecording = () => {
        SpeechRecognition.startListening().then(() => {
            setIsRecording(true)
        })
      }
  
      const stopRecording = () => {
        SpeechRecognition.stopListening().then(() => {
            setIsRecording(false)
        })
      }
  
      useEffect(() => {
        if (listening) {
          setTitle(transcript)
        }
      })

    const commentData = [{ "user": "human", "text": "I love Kingston" },
    { "user": "ai", "text": "me too" },
    { "user": "human", "text": "let's move to Kingston" }]

    const map = {
        'hello': 'I love Kingston',
        'chicken': 'wings'
    }

    const config = {
        headers: {
            //"value": "ngrok-skip-browser-warning
            "ngrok-skip-browser-warning": "69420"
        }
    }

    async function getUser() {
        try {
            // http://www.myhackathonapixdlolol.mintlify.com/api?text=theinput
            const response = await axios.get(`https://7c2b-76-64-68-28.ngrok.io/question?text=${title}`, config);
            console.info(response);
            const returned_info = { "text": response.data.answer, "links": response.data.top_links }
            return returned_info
        } catch (error) {
            console.error(error);
        }
        return null
    }

    const handleKeypress = e => {
        if (e.keyCode === 13) {
            clickBtn();
        }
    };
    const clickBtn = async () => {


        const msg = title;

        const newMsgs = []

        const oldMsgs = msgs;

        newMsgs.push({
            isUser: true,
            text: msg
        })
        setMsgs([...oldMsgs, ...newMsgs])
        const response = await getUser();

        newMsgs.push({
            isUser: false,
            text: response.text,
            links: response.links
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
                    <AIComment key={index} text={msg.text} links={msg.links} />
            ))
            }
            <div className="input-bar">
                <input type="image" src={mic} alt="whoops" className="icon" onClick={isRecording ? stopRecording : startRecording} />
                <Speech text={msgs.map((msg) => msg.text)} />
                <input
                    type="text"
                    className="input-box"
                    ref={msgField}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeypress}

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