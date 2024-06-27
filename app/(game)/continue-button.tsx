import { Button } from "@/components/ui/button";
import { useSound } from "use-sound"

type Props = {
    text: string;
    disabled: boolean;
    incorrect: boolean;
    click?: () => void;
}

const ContinueButton = ({ text, disabled, incorrect, click }: Props) => {
    return (
        <Button
            disabled={disabled}
            onClick={click}
            variant={disabled ? "continueLocked" : (incorrect ? "continueIncorrect" : "continueUnlocked")}
            size="continue"
        >
            {text}
        </Button>
    )
}

export default ContinueButton;