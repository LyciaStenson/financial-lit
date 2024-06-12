import { Button } from "@/components/ui/button";

type Props = {
    text: string
    disabled: boolean
    click?: () => void;
}

const ContinueButton = ({ text, click }: Props ) => {
    return (
        <Button
            onClick={click}
            variant="continue"
            size="continue"
            className="shadow-[0_3.5px_0px_rgba(0,0,0,0.3),inset_0_5px_0px_rgb(255,255,255,0.5)]"
        >
            {text}
        </Button>
    )
}

export default ContinueButton;