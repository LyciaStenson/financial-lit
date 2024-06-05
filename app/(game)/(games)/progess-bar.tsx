type Props = {
    percentage: number;
}

const ProgressBar = ({ percentage }: Props) => {
    return (
    <div className="w-56 h-10 rounded-2xl bg-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]">
        <div className="h-10 rounded-lg bg-moneyconf-gold border-2 border-moneyconf-purple shadow-[inset_0_-5px_0px_rgba(255,255,255,0.6),inset_0_5px_0px_rgb(255,255,255,0.6)]"
            style={{
                width: percentage + "%",
                //width: (percentage > 100) ? 100 + "%" : percentage + "%",
                borderWidth: (percentage == 0) ? 0 : 2
            }}
        />
    </div>
    )
};

export default ProgressBar;