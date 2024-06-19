import { Button } from "@/components/ui/button";

type Props = {
    id: number;
    text: string;
    isSelected: boolean;
    isMatched: boolean;
    onClick: (id: number) => void;
}

const MatchingButton = ({ id, text, isSelected, isMatched, onClick }: Props) => {

    let backgroundColor: string = "#f2f2f2";

    if (isMatched) {
        backgroundColor = "#8cc63f";
    } else {
        if (isSelected) {
            backgroundColor = "#ffd400";
        }
    }

    return (
        <Button
            className="w-40 h-16 rounded-3xl flex items-center justify-center border-4 border-dashed border-moneyconf-grey-dark"
            onClick={() => onClick(id)}
            disabled={isMatched}
            style={{
                backgroundColor: backgroundColor
            }}
        >
            <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {text} </h3>
        </Button>
    )
}

export default MatchingButton;