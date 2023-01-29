import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState, useRef, useEffect } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"
import React from "react";
import ChatBox from "./components/ChatBox";
import MicRecorder from "mic-recorder-to-mp3"
import axios, * as others from 'axios';
import AddDynamicInput from "./AddDynamicInput";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import Dictaphone from "./components/Dictaphone";

/*// Set AssemblyAI Axios Header


const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
        authorization: "e57632ec05b64828a53817400f54e412",
        "content-type": "application/json",
        "transfer-encoding": "chunked",
    },
})

/*


// Mic-Recorder-To-MP3
const recorder = useRef(null) //Recorder
const audioPlayer = useRef(null) //Ref for the HTML Audio Tag
const [blobURL, setBlobUrl] = useState(null)
const [audioFile, setAudioFile] = useState(null)
const [isRecording, setIsRecording] = useState(null)

useEffect(() => {
    //Declares the recorder object and stores it inside of ref
    recorder.current = new MicRecorder({ bitRate: 128 })
}, [])

const startRecording = () => {
    // Check if recording isn't blocked by browser
    recorder.current.start().then(() => {
        setIsRecording(true)
    })
}

const stopRecording = () => {
    recorder.current
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
            const file = new File(buffer, "audio.mp3", {
                type: blob.type,
                lastModified: Date.now(),
            })
            const newBlobUrl = URL.createObjectURL(blob)
            setBlobUrl(newBlobUrl)
            setIsRecording(false)
            setAudioFile(file)
        })
        .catch((e) => console.log(e))

    submitTranscriptionHandler()
}

const [uploadURL, setUploadURL] = useState("")
const [transcriptID, setTranscriptID] = useState("")
const [transcriptData, setTranscriptData] = useState("")
const [transcript, setTranscript] = useState("")
const [isLoading, setIsLoading] = useState(false)

// Upload the Audio File and retrieve the Upload URL
useEffect(() => {
    if (audioFile) {
        assembly
            .post("/upload", audioFile)
            .then((res) => setUploadURL(res.data.upload_url))
            .catch((err) => console.error(err))
    }
}, [audioFile])

// Submit the Upload URL to AssemblyAI and retrieve the Transcript ID
const submitTranscriptionHandler = () => {
    assembly
        .post("/transcript", {
            audio_url: uploadURL,
        })
        .then((res) => {
            setTranscriptID(res.data.id)

            checkStatusHandler()
        })
        .catch((err) => console.error(err))
}

// Check the status of the Transcript and retrieve the Transcript Data
const checkStatusHandler = async () => {
    setIsLoading(true)
    try {
        await assembly.get(`/transcript/${transcriptID}`).then((res) => {
            setTranscriptData(res.data)
            setTranscript(transcriptData.text)
        })
    } catch (err) {
        console.error(err)
    }
}

useEffect(() => {
    const interval = setInterval(() => {
        if (transcriptData.status !== "completed" && isLoading) {
            checkStatusHandler()
        } else {
            setIsLoading(false)
            setTranscript(transcriptData.text)
            setTitle(transcript)
            clearInterval(interval)
        }
    }, 1000)
    return () => clearInterval(interval)
},)
*/



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

    /*const config = {
        headers: {
            //"value": "ngrok-skip-browser-warning
            "User-Agent": "Custom"
        }
    }*/
    /*var axios = require('axios');

    var config = {
        method: 'get',
        url: `https://a0e7-76-64-68-28.ngrok.io/question?text=${title}`,
        headers: {}
    };*/

    /*axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });*/
    async function getUser() {
        try {
            // http://www.myhackathonapixdlolol.mintlify.com/api?text=theinput
            const response = await axios.get(`https://088b-76-64-68-28.ngrok.io/question?text=${title}`);
            console.info(response);
            return response.answer
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
                <input type="image" src={mic} alt="whoops" className="icon" /*onClick={isRecording ? stopRecording : startRecording}*/ />
                <input type="image" src={speaker} alt="whoops" className="icon" />
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