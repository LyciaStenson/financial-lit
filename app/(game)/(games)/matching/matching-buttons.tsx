import { Item } from "./types";
import MatchingButton from "./matching-button";

type Props = {
    items: Item[];
    selectedId: number | null;
    matchedIds: number[];
    onItemClick: (id: number) => void;
}

const MatchingButtons = ({items, selectedId, matchedIds, onItemClick}: Props) => {
    return (
        <div className="flex flex-col space-y-3">
            {items.map(item => (
                <MatchingButton
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    isSelected={item.id === selectedId}
                    isMatched={matchedIds.includes(item.id)}
                    onClick={onItemClick}
                />
            ))}
        </div>
    )
}

export default MatchingButtons;