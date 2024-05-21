type Props = {
    text: string
}
const TextBoxes = ({text}: Props) => {
    return (
            <div className="flex flex-row space-x-2">
                <div className="text-lg font-extrabold text-moneyconf-purple w-28 h-11 flex items-center justify-center border-[2.5px] border-moneyconf-purple rounded-md bg-moneyconf-grey">
                    <h3 className="text-lg text-moneyconf-purple font-extrabold"> {text} </h3>
                </div>
            </div>  
    )
}

export default TextBoxes;