import Comment from "./components/Comment";
import AIComment from "./components/AIComment";
import Bar from "./components/Bar";
import Input from "./components/Input";
import { useState } from "react";
import mic from "./images/mic-black.svg"
import send from "./images/send-1-svgrepo-com.svg"
import speaker from "./images/speaker-wave-2.svg"

import MicRecorder from "mic-recorder-to-mp3"
import { useEffect, useRef } from "react"
import axios from "axios"

// Set AssemblyAI Axios Header
const assembly = axios.create({
    baseURL: "https://api.assemblyai.com/v2",
    headers: {
      authorization: "INSERT API KEY",
      "content-type": "application/json",
      "transfer-encoding": "chunked",
    },
  })

function Chatbot() {
    const [title, setTitle] = useState("")
    const commentData = [{ "user": "human", "text": "I love Kingston" },
    { "user": "ai", "text": "me too" },
    { "user": "human", "text": "let's move to Kingston" }]
    const [data, setData] = useState(commentData)

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
                <input type="image" src={mic} alt="whoops" className="icon" onClick={isRecording ? stopRecording : startRecording} />
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