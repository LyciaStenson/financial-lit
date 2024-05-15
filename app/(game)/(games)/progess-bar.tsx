type Props = {
    percentage: number;
}

const ProgressBar = ({ percentage }: Props) => {
    return (
        <div>
            <div>
                <span>{percentage}</span>
            </div>
        </div>
    )
};

export default ProgressBar;