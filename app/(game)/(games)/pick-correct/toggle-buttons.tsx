import { useState } from "react";
import ToggleButton from "./toggle-button";

type Props = {
    answers: string[]
    corrects: boolean[]
    selected: number | null
    handleToggle: (index: number, isCorrect: boolean) => void
}

const ToggleButtons = ({ answers, corrects, selected, handleToggle }: Props) => {
    return (
        <div className="space-y-3">
            <div className="flex flex-row justify-center space-x-28">
                <ToggleButton
                    index={0}
                    text={answers[0]}
                    isCorrect={corrects[0]}
                    toggled={selected == 0}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={1}
                    text={answers[1]}
                    isCorrect={corrects[1]}
                    toggled={selected == 1}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex justify-center">
                <ToggleButton
                    index={2}
                    text={answers[2]}
                    isCorrect={corrects[2]}
                    toggled={selected == 2}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-row justify-center space-x-28">
                <ToggleButton
                    index={3}
                    text={answers[3]}
                    isCorrect={corrects[3]}
                    toggled={selected == 3}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={4}
                    text={answers[4]}
                    isCorrect={corrects[4]}
                    toggled={selected == 4}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    )
}

export default ToggleButtons;