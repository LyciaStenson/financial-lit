import Image from "next/image";
import ContinueButton from "../../continue-button";
import PickBoxes from "./pick-boxes";

const OrderGamePage = () => {
    return (
        <div className="flex flex-col space-y-5 border p-1">
            <h1 className="text-2xl font-extrabold text-moneyconf-purple items-center justify-center text-center">
                Tap the boxes to put it in order below
            </h1>
            <div className="flex flex-row space-x-10 items-center justify-center text-center ">
                <div className="animate-bounce animate-duration-1000">
                    <Image
                        src="./astronaut-laptop-coin.svg"
                        alt="Astronaut Laptop"
                        width={0}
                        height={0}
                        className="w-20 h-auto"
                    />
                </div>                
                <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2 className="text-2xl">Order the words!</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-6">
                <PickBoxes one = "600" two = "6" three = "80"/>
                <PickBoxes one = "100" two = "800" three = "50"/>
                <PickBoxes one = "10" two = "400" three = "70"/> 
            </div>
            
            <div  className="flex space-x-1 font-extrabold text-moneyconf-purple p-3 border-[2.5px] bg-moneyconf-grey place-items-center justify-start text-start px-2">
                <h3 className="text-xl font-extrabold text-moneyconf-purple px-3">
                    APR =   </h3>
                <h3 className="underline"> {"Place"} </h3>
                <h3 className="underline"> {"holder"} </h3>
                <h3 className="underline"> {"text"} </h3>
            </div>
            <div className="flex items-center justify-center text-center" >
                <ContinueButton
                    text="Lock in guess"
                    disabled={false}
                />
            </div>
        </div>
    )
}

export default OrderGamePage;