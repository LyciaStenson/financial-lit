'use client';

import Image from "next/image";
import Continue from "./continue";
import { useState } from 'react';
import Picker from 'react-mobile-picker';

const ScrollingGamePage = () => {
    const selections = {
        cost: ['500', '1', '35', '6', '7', '8', '355', '78'],
      }
    const [pickerValue, setPickerValue] = useState({
        cost: '1',
    })
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border">
            <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                Scroll the dial
            </h1>
            <div className="flex flex-row items-center space-x-10">
              <div className="animate-wiggle-more animate-infinite animate-duration-1000">
                <Image
                    src="./astronaut-shopping-trolley.svg"
                    alt="Astronaut shopping"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
              </div>
                <div className="text-lg font-extrabold text-moneyconf-purple w-44 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2>Find me the</h2>
                    <h2>cheapest iphone!</h2>
                </div>
            </div>
            <div className="flex flex-row items-center space-x-1">
                <Image
                        src="./arrow-green.svg"
                       alt="Arrow Green"
                        width={0}
                        height={0}
                     className="w-11 h-auto"
                    />
             <div className="text-lg font-extrabold text-moneyconf-purple w-72 border-[2.5px] border-moneyconf-purple rounded-3xl bg-moneyconf-grey">
                 <Picker value={pickerValue} onChange={setPickerValue}>
                      {Object.keys(selections).map((name:string) => (
                        <Picker.Column key={name} name={name}>
                          {selections.cost.map((option:string) => (
                            <Picker.Item key={option} value={option}>
                              {({ selected }) => (
                                /* Use the `selected` state ti conditionally style the selected item */
                                //<div style={{ color: selected ? 'red' : 'black' }}>
                                <div className={selected ? "text-moneyconf-purple" : "text-black text-opacity-40"}>
                                  {option}
                                </div>
                            )}
                            </Picker.Item>
                          ))}
                        </Picker.Column>
                         ))}
                 </Picker>
                </div>
            </div>
            
            
            <div className="flex flex-row space-x-4">
            </div>
            <Continue text = "Lock in guess"/>
        </div>
    )
}

export default ScrollingGamePage;