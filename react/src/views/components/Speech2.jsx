import speaker from "../images/speaker-wave-2.svg"
import React, { useState } from "react"
import window from "global"


function Speech(props) {

  const [speaking, setSpeaking] = useState(false)
  const [paused, setPaused] = useState(false)


  const msg = new SpeechSynthesisUtterance()

  const stopSpeech = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  const startSpeech = (msg) => {
    window.speechSynthesis.speak(msg)
    setSpeaking(true)
  }

  const speechHandler = (msg) => {
    msg.text = props.text
    msg.rate = props.speechRate
    speaking ? stopSpeech() : startSpeech(msg)
  }

  const PlayButton = () => {
    const resumeSpeech = () => {
      window.speechSynthesis.resume()
      setPaused(false)
    }
    return (
      <button className="icon"
        onClick={resumeSpeech}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
        </svg>
      </button>
    )
  }
  const PauseButton = () => {

    const stopSpeech = () => {
      window.speechSynthesis.pause()
      setPaused(true)

    }
    return (
      <button className="icon"
        onClick={stopSpeech}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" className="w-6 h-6 border-none">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )
  }

  return (
    <>
      <input type="image" src={speaker} alt="whoops" className="icon" onClick={() => speechHandler(msg)} />
      {!paused ? <PauseButton /> : <PlayButton />}
    </>

  )
}

export default Speech