import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

interface IDraggable {
    name: string;
    src: string;
}

const Draggable: React.FC<IDraggable> = (props) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: "0",
    });

    return (
        <div
            ref={ setNodeRef }
            style={{ transform: CSS.Translate.toString(transform) }}
            className="w-44 space-y-5 flex flex-col items-center touch-none"
            {...attributes}
            {...listeners}
        >
            <Image
                src={props.src}
                alt="Doctor"
                width={0}
                height={0}
                className="w-auto h-48"
            />
            <h3 className="text-3xl text-moneyconf-purple font-extrabold">{props.name}</h3>
        </div>
    )
}

export default Draggable;
