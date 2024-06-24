export const PointsToRank = (points: number) => {
    if (points! >= 34000) {
        return "MASTER";
    } else if (points! >= 28000) {
        return "MAGNATE";
    } else if (points! >= 22000) {
        return "TYCOON";
    } else if (points! >= 16000) {
        return "MOGUL";
    } else if (points! >= 11000) {
        return "BANKER";
    } else if (points! >= 7000) {
        return "TRADER";
    } else if (points! >= 4000) {
        return "EARNER";
    } else if (points! >= 2000) {
        return "SAVER";
    } else if (points! >= 1000) {
        return "NOVICE";
    } else {
        return "NEWBIE";
    }
}