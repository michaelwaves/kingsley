import React from "react";
import { useState } from "react";
import Comment from "./components/Comment";

function AddDynamicInput(props) {
    const [val, setVal] = useState([])

    const handleAdd = () => {
        const abc = [...val, []]
        setVal(abc)
        console.log(val, abc)
    }

    const handleChange = (onChangeValue, i) => {
        const inputData = [...val]
        inputData[i] = onChangeValue.target.value
        setVal(inputData)
        console.log(inputData)
    }

    const handleMouseEnter = () => {
        console.log("mouse has entered")
    }
    const handleDelete = () => {


    }




    return (
        <>
            {val.map((data, i) => {
                return (
                    <>
                        <input onChange={(e) => handleChange(e, i)} />
                        <button onClick={() => handleDelete(i)}>x</button>
                        <Comment text={data} />
                    </>
                )
            })}
            <button onClick={() => handleAdd()}>Add input</button>

        </>
    )
}

export default AddDynamicInput