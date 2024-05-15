import getRandomNumber from "./random/randomNumberGenerator"

export default function getBannerTitleFromFirebase() : string{
    let value:number = getRandomNumber(1, 10);
    console.log(value);
    return value.toString();
}