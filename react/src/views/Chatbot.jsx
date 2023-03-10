import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState, useRef, useEffect } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"
import Speech from "./components/Speech2";
import React from "react";
import ChatBox from "./components/ChatBox";
import MicRecorder from "mic-recorder-to-mp3"
import axios, * as others from 'axios';
import AddDynamicInput from "./bloopers/AddDynamicInput";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import Dictaphone from "./components/Dictaphone";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import CsvDownloadButton from 'react-json-to-csv'

/*
<input
                    type="image"
                    src={mic}
                    alt="whoops"
                    className={icon}
                    //style=""
                    onClick={isRecording ? stopRecording : startRecording}
                    handleKeypress={handleSpeakKeypress}

                />
                
                <Speech text={msgs.map((msg) => msg.text)} speechRate={speechRate} />*/


function Chatbot() {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition()

    const [icon, setIcon] = useState("icon-null")
    const [title, setTitle] = useState("");
    const [isRecording, setIsRecording] = useState(null)
    const [speechRate, setSpeechRate] = useState(1)
    const msgField = useRef('');

    const [msgs, setMsgs] = useState([]); // hold an object ifUser: bool , text: string

    const startRecording = () => {
        SpeechRecognition.startListening().then(() => {
            setIsRecording(true)
            setIcon("icon-true")
        })
    }

    const stopRecording = () => {
        SpeechRecognition.stopListening().then(() => {
            setIsRecording(false)
            setIcon("icon-null")
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
            //const response = await axios.get(`https://7c2b-76-64-68-28.ngrok.io/question?text=${title}`, config);
            const response = await axios.get(`http://127.0.0.1:8080/question?text=${title}`, config);
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
        //backslash key to trigger speech
        if (e.keyCode === 220) {
            isRecording ? stopRecording() : startRecording()
        }
    };


    const handleSpeakKeypress = e => {
        if (e.keyCode === 220) {
            isRecording ? stopRecording() : startRecording()
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
    //let inputStyle = isRecording ? 'background-color:red' : 'background-color:green'
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
                <input
                    type="image"
                    src={mic}
                    alt="whoops"
                    className='icon'
                    //style=""
                    onClick={isRecording ? stopRecording : startRecording}
                    handleKeypress={handleSpeakKeypress}

                />

                <Speech text={msgs.slice(-2).map((msg) => msg.text)} speechRate={speechRate} />
                <div id="rate-control" className="speech-rate-bar">
                    <label for="rate">Rate:</label>
                    <input className="slider" type="range" min="0.5" max="2" value={speechRate} step="0.1" id="rate"
                        onChange={(e) => (setSpeechRate(e.target.value))} />
                </div>
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
                <CsvDownloadButton className="csv-download-button" data={msgs} filename="chatbot.csv" delimiter="," />
            </div>
        </div>
    )
}

export default Chatbot