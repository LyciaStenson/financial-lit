import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

interface IDroppable {
    name: string;
}

const Droppable: FC<IDroppable> = (props) => {
    const { setNodeRef } = useDroppable({
        id: props.name,
    });

    return (
        <div ref={ setNodeRef } className="w-44 space-y-10">
            <div className="h-72 rounded-3xl bg-moneyconf-grey border-4 border-dashed border-moneyconf-grey-border" />
            <h3 className="text-2xl text-moneyconf-purple font-extrabold">{props.name}</h3>
        </div>
    )
}

export default Droppable;