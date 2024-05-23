import { Button } from "@/components/ui/button";

type Props = {
    click?: (index: number, params?: any) => void; // Allow click to accept index and parameters
    text: string;
    index: number; // Add index prop
}

const PickButton = ({ click = () => {}, text, index }: Props) => {
    // Create a handler function to call click with the index and parameters
    const handleClick = () => {
        click(index, { param1: 'value1', param2: 'value2' }); // Pass index and parameters here
    };

    return (
        <Button 
            onClick={handleClick} // Attach the handleClick function here
            className="w-32 h-24 rounded-3xl flex items-center justify-center bg-moneyconf-grey border-4 border-dashed border-moneyconf-green"
        >
            <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {text} </h3>
        </Button>
    )
}

export default PickButton;