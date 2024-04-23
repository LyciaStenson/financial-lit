export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Array of first names
const firstNames = ["Steven", "Sam", "Jake", "John", "Michael", "Emily", "Sarah", "Emma", "David", "Rachel"];
// Array of last names
const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];

// Function to generate a random full name
export function generateRandomName() {
    const firstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const lastName = lastNames[getRandomInt(0, lastNames.length - 1)];
    return { firstName, lastName };
}