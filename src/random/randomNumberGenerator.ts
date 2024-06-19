export default function getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
export function getRandom(): number {
    const numbers = [2, 4, 6, 7, 10, 12, 13, 14, 15, 16, 17, 18, 20, 22, 25, 30, 35, 40, 45, 50];
    const weights = [1,   1,  2,  2,   5,   5,   6,   7,  10,   8,   8,   7,   7,   5,   3,   3,   2,   2,   1,   1];

    for(let i = 0; i < 20; i++){
        const rNumber = getRandomNumber(0, 9);
        numbers[i] = parseInt(numbers[i].toString() + rNumber.toString());    
    }

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
