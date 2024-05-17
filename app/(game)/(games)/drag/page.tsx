"use client"

import Image from "next/image";
import { TopBar } from "../top-bar";

import { DndContext, closestCorners } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { useState } from "react";

const DragGamePage = () => {
    const [amount, setAmount] = useState(1);
    const names = ["Doctors", "Chefs", "Frogs"];
    const srcs = ["./doctor.svg", "./astronaut-peace.svg", "./astronaut-kick.svg"];

    const [draggableName, setDraggableName] = useState<string>(names[0]);
    const [draggableSrc, setDraggableSrc] = useState<string>(srcs[0]);

    const handleDragEnd = () => {
        if (amount < names.length) {
            setAmount(amount + 1);
            setDraggableName(names[amount]);
            setDraggableSrc(srcs[amount]);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5 border p-1">
            <TopBar />
            <h1 className="text-2xl font-extrabold text-moneyconf-purple">
                Drag the icons to the correct side
            </h1>
            <div className="flex flex-row items-center space-x-10 pt-7">
                <Image
                    src="./astronaut-money-fingers.svg"
                    alt="Astronaut Kick"
                    width={0}
                    height={0}
                    priority={true}
                    className="w-24 h-auto"
                />
                <div className="text-xl font-extrabold text-moneyconf-purple w-70 p-5 border-[3px] border-moneyconf-purple rounded-3xl space-y-2">
                    <h2>Is this paid for by</h2>
                    <h2 className="underline">The Government</h2>
                    <h2>or</h2>
                    <h2 className="underline">Adults?</h2>
                </div>
            </div>
            <div className="flex flex-row space-x-3 pt-6">
                <Image
                    src="./arrow.svg"
                    alt="Arrow"
                    width={0}
                    height={0}
                    className="w-32 h-auto scale-x-[-1]"
                />
                <Image
                    src="./arrow.svg"
                    alt="Arrow"
                    width={0}
                    height={0}
                    className="w-32 h-auto"
                />
            </div>
            <div className="flex flex-row space-x-3">
                <DndContext id="0" onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <Droppable
                    name="The Government"
                />
                <div className="pt-5">
                    <Draggable
                        name={draggableName}
                        src={draggableSrc}
                    />
                </div>
                <Droppable
                    name="Adults"
                />
                </DndContext>
            </div>
        </div>
    )
}

export default DragGamePage;