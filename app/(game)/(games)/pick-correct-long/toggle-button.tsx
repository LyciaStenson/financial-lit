import { Button } from "@/components/ui/button"

type Props = {
    index: number,
    text: string,
    isCorrect: boolean,
    toggled: boolean,
    disabled: boolean,
    onToggle: (index:number, isCorrect: boolean) => void
}

const ToggleButton = ({index, text, isCorrect, toggled, disabled, onToggle}: Props) => {
    return (
        <Button
            onClick={() => onToggle(index, isCorrect)}
            variant="quiz"
            disabled={disabled}
            className="w-96 h-16 text-md text-wrap text-moneyconf-blue"
            style={{
                backgroundColor: toggled ? (isCorrect) ? "#8cc63f" : "#f23b3b" : "#f2f2f2",
                borderColor: disabled ? "#a9a9a9" : (toggled ? "#000000" : "#8cc63f"),
            }}
        >
            {text}
        </Button>
    );
};

export default ToggleButton;