export default function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom(): number {
    const numbers = [20, 45, 60, 75, 100, 125, 135, 145, 155, 165, 175, 185, 200, 225, 250, 300, 350, 400, 450, 500];
    const weights = [1,   1,  2,  2,   5,   5,   6,   7,  10,   8,   8,   7,   7,   5,   3,   3,   2,   2,   1,   1];
    return getWeightedRandom(numbers, weights);
}

export function getWeightedRandom(spec: number[], weights: number[]): number {
    const cumulativeWeights = [];
    let cumulativeWeight = 0;

    // Calculate cumulative weights
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        cumulativeWeights.push(cumulativeWeight);
    }

    // Generate a random number between 0 and the sum of the weights
    const randomWeight = Math.random() * cumulativeWeight;

    // Find the index corresponding to the random weight
    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (randomWeight < cumulativeWeights[i]) {
            return spec[i];
        }
    }

    return spec[spec.length - 1]; // Fallback
}
