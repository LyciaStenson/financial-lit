'use client'

import Image from "next/image";
import Continue from "./continue";
import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from "react";

  
const DragBarGamePage = () => {
    const [SliderValue, setSliderValue] = useState(0)

    const valuetext = (value: number, index: number):string => {
        setSliderValue(value);
        return "";
    }


    return (
        <div className="flex flex-col space-y-5 border">

            <h1 className="text-3xl font-extrabold text-moneyconf-purple items-center justify-center text-center ">
            Drag the circle to reach the correct number price
            </h1>
            <div className="flex flex-row space-x-10 items-center justify-center text-center">
                <Image
                    src="./astronaut-laying-on-coins.svg"
                    alt="Astronaut laying"
                    width={0}
                    height={0}
                    className="w-40 h-auto"
                />
                <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2 className="text-2xl">Guess the price!</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
            </div>
            <div className="flex flex-row space-x-5 items-center justify-center text-center">
                <div className="flex flex-row space-x-5 items-center justify-center text-center rounded-3xl bg-moneyconf-grey border-4">
                    <Box sx={{height: 300}}>
                        <Slider
                        aria-label="Price"
                        defaultValue={50}
                        getAriaValueText={valuetext}
                        //valueLabelDisplay="auto"
                        shiftStep={30}
                        step={5}
                        marks
                        min={0}
                        max={100}
                        orientation="vertical"
                        />
                    </Box>
                </div>
                <div className="w-72 h-72 flex items-center justify-center rounded-3xl bg-moneyconf-grey border-4">
                    <Image
                        src="./trophy-gold.svg"
                        alt="Price item"
                        width={0}
                        height={0}
                        className="w-28 h-auto"
                    />
                </div>
                
            </div>
            <div className="flex items-center justify-center text-center">
                <div  className="w-56 h-16 rounded-3xl flex items-center justify-center text-center bg-moneyconf-grey border-4">
                    <h3 className="underline text-3xl font-extrabold text-moneyconf-purple"> {"£" + SliderValue} </h3>
                </div>
            </div>
            
            <div className="flex items-center justify-center text-center" >
                <Continue text = "Lock in guess"/>
            </div>
        </div>
    )
}

export default DragBarGamePage;