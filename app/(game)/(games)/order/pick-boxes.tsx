import PickButton from "./pick-button";

type Props = {
    one: string,
    two: string,
    three: string
}
const PickBoxes = ({one, two, three}: Props) => {
    return (
            <div className="flex flex-row space-x-2">
                <PickButton text={one}/>
                <PickButton text={two}/>
                <PickButton text={three}/>
            </div>  
    )
}

export default PickBoxes;