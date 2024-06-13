import ToggleButton from "./toggle-button";

type Props = {
    answers: { Answer: string; Result: boolean; }[]
    selected: number | null
    disabledButtons: boolean[]
    disabled: boolean
    handleToggle: (index: number, isCorrect: boolean) => void
}

const ToggleButtons = ({ answers, selected, disabledButtons, disabled, handleToggle }: Props) => {
    return (
        <div className="space-y-3">
            <div className="flex flex-row justify-center space-x-28">
                <ToggleButton
                    index={0}
                    text={answers[0].Answer}
                    isCorrect={answers[0].Result}
                    toggled={selected == 0}
                    disabled={disabledButtons[0] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={1}
                    text={answers[1].Answer}
                    isCorrect={answers[1].Result}
                    toggled={selected == 1}
                    disabled={disabledButtons[1] || disabled}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex justify-center">
                <ToggleButton
                    index={2}
                    text={answers[2].Answer}
                    isCorrect={answers[2].Result}
                    toggled={selected == 2}
                    disabled={disabledButtons[2] || disabled}
                    onToggle={handleToggle}
                />
            </div>
            <div className="flex flex-row justify-center space-x-28">
                <ToggleButton
                    index={3}
                    text={answers[3].Answer}
                    isCorrect={answers[3].Result}
                    toggled={selected == 3}
                    disabled={disabledButtons[3] || disabled}
                    onToggle={handleToggle}
                />
                <ToggleButton
                    index={4}
                    text={answers[4].Answer}
                    isCorrect={answers[4].Result}
                    toggled={selected == 4}
                    disabled={disabledButtons[4] || disabled}
                    onToggle={handleToggle}
                />
            </div>
        </div>
    )
}

export default ToggleButtons;