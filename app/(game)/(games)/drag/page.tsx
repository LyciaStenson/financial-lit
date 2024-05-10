"use client"

import Image from "next/image";
import { Topbar } from "../topbar";

import { DndContext, closestCorners } from "@dnd-kit/core";
import Draggable from "./draggable";
import Droppable from "./droppable";
import { useState } from "react";

/*
function Droppable() {
    const { setNodeRef } = useDroppable({
        id: 'unique-id',
    });

    return (
        <div ref={ setNodeRef } className="w-44 space-y-10">
            <div className="h-72 rounded-3xl bg-moneyconf-grey border-4 border-dashed border-moneyconf-grey-border" />
            <h3 className="text-2xl text-moneyconf-purple font-extrabold">The Government</h3>
        </div>
    )
}

function Draggable() {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({
      id: 'unique-id',
    });
    const style = {
      transform: CSS.Translate.toString(transform),
    };
    
    return (
        <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <Image
                src="./doctor.svg"
                alt="Doctor"
                width={110}
                height={110}
            />
            <h3 className="text-3xl text-moneyconf-purple font-extrabold">Doctors</h3>
        </button>
    );
}
*/

const DragGamePage = () => {
    let i = 0;
    const names = ["Doctors", "Chefs", "Frogs"];
    const srcs = ["./doctor.svg", "./astronaut-peace.svg", "./astronaut-kicking.svg"];
    //const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

    const handleDragEnd = (event: any) => {
        console.log("handleDragEnd");
        console.log("Before i > ", i);
        i++;
        console.log("After i > ", i);
    }

    return (
        <div className="flex flex-col items-center justify-center text-center space-y-5">
            <Topbar />
            <h1 className="text-3xl font-extrabold text-moneyconf-purple">
                Drag the icons to the correct side
            </h1>
            <div className="flex flex-row items-center space-x-10">
                <Image
                    src="./astronaut-kick.svg"
                    alt="Astronaut Kick"
                    width={0}
                    height={0}
                    className=" w-40 h-auto"
                />
                <div className="text-2xl font-extrabold text-moneyconf-purple w-70 p-5 border-[2.5px] border-moneyconf-purple rounded-3xl">
                    <h2>Is this paid for by</h2>
                    <h2 className="underline">The Government</h2>
                    <h2>or</h2>
                    <h2 className="underline">Adults?</h2>
                </div>

            </div>
            <div className="flex flex-row space-x-5 pt-16">
                <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
                <Droppable
                    name="The Government"
                />
                <div className="pt-5">
                    <Draggable
                        name={names[i]}
                        src={srcs[i]}
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