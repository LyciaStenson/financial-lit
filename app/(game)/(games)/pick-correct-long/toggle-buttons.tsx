import { useState } from "react";
import ToggleButton from "./toggle-button";

type Props = {
    answers: {Answer: string; Result: boolean;}[],
    selected: number | null,
    handleToggle: (index: number, isCorrect: boolean) => void
}

const ToggleButtons = ({ answers, selected, handleToggle }: Props) => {
    return (
        <div className="space-y-1">
            <div className="flex flex-col justify-center">
                <ToggleButton
                    index={0}
                    text={answers[0].Answer}
                    isCorrect={answers[0].Result}
                    toggled={selected == 0}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={1}
                    text={answers[1].Answer}
                    isCorrect={answers[1].Result}
                    toggled={selected == 1}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={2}
                    text={answers[2].Answer}
                    isCorrect={answers[2].Result}
                    toggled={selected == 2}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={3}
                    text={answers[3].Answer}
                    isCorrect={answers[3].Result}
                    toggled={selected == 3}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={4}
                    text={answers[4].Answer}
                    isCorrect={answers[4].Result}
                    toggled={selected == 4}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    )
}

export default ToggleButtons;