import PickButton from "./pick-button";

type Props = {
    one: string,
    two: string
}
const PickBoxes = ({one, two}: Props) => {
    return (
            <div className="flex flex-row space-x-56">
                <PickButton text={one}/>
                <PickButton text={two}/>
            </div>  
    )
}

export default PickBoxes;