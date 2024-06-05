import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
    text : string
    }

const Continue =  ({text}: Props) => {
    const router = useRouter();
    return (
            <Button className="w-80 h-12 rounded-3xl flex items-center justify-center bg-moneyconf-gold border-4 border-dashed border-moneyconf-blue" onClick={() => router.push("/activity")}>
                <h3 className="text-2xl text-moneyconf-purple font-extrabold"> {text} </h3>
            </Button>
    )
}

export default Continue;