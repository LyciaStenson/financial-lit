import { Button } from "@/components/ui/button";

type Props = {
    text : string
    }

const Continue =  ({text}: Props) => {
    return (
            <Button className="flex w-96 h-12 rounded-3xl flex items-center justify-center bg-moneyconf-gold border-4 border-dashed border-moneyconf-blue">
                <h3 className="text-2xl text-moneyconf-purple font-extrabold "> {text} </h3>
            </Button>
    )
}

export default Continue;