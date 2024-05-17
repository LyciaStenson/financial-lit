type Props = {
    points: number;
}

export const RankBar = ({
    points,
}: Props) => {

    let rank = "newbie";

    if (points >= 34000) {
        rank = "master";
    } else if (points >= 28000) {
        rank = "magnate";
    } else if (points >= 22000) {
        rank = "tycoon";
    } else if (points >= 16000) {
        rank = "mogul";
    } else if (points >= 11000) {
        rank = "banker";
    } else if (points >= 7000) {
        rank = "trader";
    } else if (points >= 4000) {
        rank = "earner";
    } else if (points >= 2000) {
        rank = "saver";
    } else if (points >= 1000) {
        rank = "novice";
    }

    return (
        <div className="border-2 border-b-[5px] border-moneyconf-blue bg-moneyconf-gold items-center text-center text-moneyconf-blue text-2xl font-extrabold tracking-[14px] indent-[20px] flex rounded-2xl h-12">
            <div>
                <span>
                    {rank.toUpperCase()}
                </span>
            </div>
        </div>
    )
}