import { useState } from "react"
import { Button } from "@/components/ui/button"

type Props = {
    index: number,
    text: string,
    isCorrect: boolean,
    toggled: boolean,
    onToggle: (index:number, isCorrect: boolean) => void
}

const ToggleButton = ({index, text, isCorrect, toggled, onToggle}: Props) => {
    return (
        <Button
            onClick={() => onToggle(index, isCorrect)}
            variant="quiz"
            className="w-28 h-16 text-lg text-moneyconf-blue"
            style={{
                backgroundColor: toggled ? (isCorrect) ? "#8cc63f" : "#f23b3b" : "#f2f2f2",
                borderColor: toggled ? "#000000" : "#8cc63f",
            }}
        >
            {text}
        </Button>
    );
};

export default ToggleButton;