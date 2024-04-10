import { Button } from "@/components/ui/button"

export default function Home() {
    return (
    <div className="p-4 space-y-4 flex flex-col max-w-[200px]">
        <Button variant="default">
            Default Button
        </Button>
        <Button variant="primary">
            Primary Button
        </Button>
    </div>
    )
}
 