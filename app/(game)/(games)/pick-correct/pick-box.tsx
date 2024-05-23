import PickButton from "./pick-button";

type Props = {
    click?: (index: number, params?: any) => void; // Allow click to accept index and parameters
    one: string
    index: number;
}
const PickBox = ({click, one, index}: Props) => {
    return (
            <div className="flex flex-col space-x-4">
                <PickButton index={index} click={click} text={one}/>
            </div>  
    )
}

export default PickBox;