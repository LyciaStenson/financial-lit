import { Button } from "@/components/ui/button";

type Props = {
    text : string
    }

const PickButton =  ({text}: Props) => {
    return (
            <Button className=" w-48 h-16 rounded-3xl flex items-center justify-center bg-moneyconf-grey border-4 border-dashed border-moneyconf-green">
                <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {text} </h3>
            </Button>
    )
}

export default PickButton;