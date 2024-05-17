import MatchingButton from "./matching-button";

type Props = {
    one: string,
    two: string,
    three: string,
    four: string
}
const MatchingBoxes = ({one, two, three, four}: Props) => {
    return (
            <div className="flex flex-col space-y-3">
                <MatchingButton text={one}/>
                <MatchingButton text={two}/>
                <MatchingButton text={three}/>
                <MatchingButton text={four}/>
            </div>  
    )
}

export default MatchingBoxes;