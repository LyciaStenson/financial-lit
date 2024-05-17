import { Button } from "@/components/ui/button";

type Props = {
    text: String
}

const ContinueButton = ({ text }: Props ) => {
    return (
        <Button >
            {text}
        </Button>
    )
}

export default ContinueButton;