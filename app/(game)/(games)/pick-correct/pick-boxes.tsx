import PickButton from "./pick-button";

type Props = {
    click?: (index: number, params?: any) => void; // Allow click to accept index and parameters
    one: string,
    two: string
    index: number;
}
const PickBoxes = ({click, one, two, index}: Props) => {
    return (
            <div className="flex flex-row space-x-28">
                <PickButton index = {index} click = {click} text={one}/>
                <PickButton index = {index} click = {click} text={two}/>
            </div>  
    )
}

export default PickBoxes;