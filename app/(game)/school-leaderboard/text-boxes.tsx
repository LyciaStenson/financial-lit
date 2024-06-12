type Props = {
    text: string
}
const TextBoxes = ({text}: Props) => {
    return (
            <div className="flex flex-row">
                <div className="text-lg font-extrabold text-moneyconf-purple w-44 border-[2.5px] border-moneyconf-purple rounded-md stripes stripes-size-[300px] stripes-opacity-30 stripes-white bg-moneyconf-gold py-2">
                    <h3 className="text-sm text-moneyconf-purple font-extrabold"> {text} </h3>
                </div>
            </div>
    )
}

export default TextBoxes;