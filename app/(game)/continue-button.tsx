import { Button } from "@/components/ui/button";

type Props = {
    text: string
    disabled: boolean
    click?: () => void;
}

const ContinueButton = ({ text, disabled, click }: Props ) => {
    return (
        <Button
            disabled={disabled}
            onClick={click}
            variant={disabled ? "continueLocked" : "continueUnlocked"}
            size="continue"
        >
            {text}
        </Button>
    )
}

export default ContinueButton;