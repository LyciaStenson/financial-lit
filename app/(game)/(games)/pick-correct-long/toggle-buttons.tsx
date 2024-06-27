import { answer } from "@/src/Game/quiz/quizDataBase";
import ToggleButton from "./toggle-button";

type Props = {
    answers:answer[]
    selected: number | null
    disabledButtons: boolean[]
    disabled: boolean
    handleToggle: (index: number, isCorrect: boolean) => void
}

const ToggleButtons = ({ answers, selected, disabledButtons, disabled, handleToggle }: Props) => {
    return (
        <div className="space-y-3">
            <div className="flex flex-col justify-center space-y-3">
                <ToggleButton
                    index={0}
                    text={answers[0].answer}
                    isCorrect={answers[0].result}
                    toggled={selected == 0}
                    disabled={disabledButtons[0] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={1}
                    text={answers[1].answer}
                    isCorrect={answers[1].result}
                    toggled={selected == 1}
                    disabled={disabledButtons[1] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={2}
                    text={answers[2].answer}
                    isCorrect={answers[2].result}
                    toggled={selected == 2}
                    disabled={disabledButtons[2] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={3}
                    text={answers[3].answer}
                    isCorrect={answers[3].result}
                    toggled={selected == 3}
                    disabled={disabledButtons[3] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={4}
                    text={answers[4].answer}
                    isCorrect={answers[4].result}
                    toggled={selected == 4}
                    disabled={disabledButtons[4] || disabled}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    )
}

export default ToggleButtons;