
import Picker from 'react-mobile-picker'
import Image from "next/image";
import { useState } from 'react'

const ScrollerBox = () => {
    const selections = {
        cost: ['500', '1', '35', '6', '7', '8', '355', '78'],
      }
    const [pickerValue, setPickerValue] = useState({
        cost: '1',
    })
    return (
        <div className="flex flex-row items-center relative">
            <Image
                src="./arrow-green.svg"
                alt="Arrow Green"
                width={0}
                height={0}
                className="w-5 h-auto absolute left-[-22px]"
            />
              <div className="text-lg font-extrabold text-moneyconf-purple w-20 border-[2.5px] border-moneyconf-purple rounded-lg bg-moneyconf-grey">
                  <Picker value={pickerValue} onChange={setPickerValue}>
                       {Object.keys(selections).map((name:string) => (
                         <Picker.Column key={name} name={name}>
                           {selections.cost.map((option:string) => (
                             <Picker.Item key={option} value={option}>
                               {({ selected }) => (
                                 /* Use the `selected` state to conditionally style the selected item */
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
    )
}

export default ScrollerBox;