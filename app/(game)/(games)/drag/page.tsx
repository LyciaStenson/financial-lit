import Image from "next/image";
import { Topbar } from "../topbar";

import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

const DragGamePage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5">
            <Topbar />
            <h1 className="text-3xl font-extrabold text-moneyconf-purple">
                Drag the icons to the correct side
            </h1>
            <div className="flex flex-row items-center space-x-20">
                <Image
                    src="./astronaut-kick.svg"
                    width={170}
                    height={170}
                    alt="Astronaut Kick"
                />
                <h2 className="text-2xl font-extrabold text-moneyconf-purple w-60 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    Is this paid for by <span className="underline">The Government</span> or <span className="underline">Adults?</span>
                </h2>
            </div>
            <div className="flex flex-row space-x-14">
                <div className="w-44 space-y-10">
                    <div className="h-72 rounded-3xl bg-moneyconf-grey border-4 border-dashed border-moneyconf-grey-border" />
                    <h3 className="text-3xl text-moneyconf-purple font-extrabold">The Government</h3>
                </div>
                <div className="flex flex-col items-center pt-5 space-y-5">
                    <Image
                        src="./doctor.svg"
                        alt="Doctor"
                        width={110}
                        height={110}
                    />
                    <h3 className="text-3xl text-moneyconf-purple font-extrabold">Doctors</h3>
                </div>
                <div className="w-44 space-y-10">
                    <div className="h-72 rounded-3xl bg-moneyconf-grey border-4 border-dashed border-moneyconf-grey-border" />
                    <h3 className="text-3xl text-moneyconf-purple font-extrabold">Adults</h3>
                </div>
            </div>
        </div>
    )
}

export default DragGamePage;