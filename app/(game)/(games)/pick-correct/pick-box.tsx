import PickButton from "./pick-button";

type Props = {
    one: string
}
const PickBox = ({one}: Props) => {
    return (
            <div className="flex flex-col space-x-4">
                <PickButton text={one}/>
            </div>  
    )
}

export default PickBox;