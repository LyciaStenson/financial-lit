import setData from "@/src/FirebaseBridge/firestore/setData";
import { uuidv4 } from "@firebase/util";

export enum quizType {
    none = "none",
    bargainshopper = "bargain-shopper",
    drag = "drag",
    dragbar = "drag-bar",
    interest = "interest",
    match = "matching",
    moreorless = "more-or-less",
    order = "order",
    pick = "pick-correct",
    picklong = "pick-correct-long",
    tripplescrolling = "triple-scrolling",
}

export enum quizYear {
    year3 = "year3",
    year4 = "year4",
    year5 = "year5",
    year6 = "year6"
}

export interface quizDay {
    day: string,
    type: quizType,
}

export interface answer {
    answer: string;
    result: boolean;
}

export interface quizData<T> {
    UUID?: string;
    question?: string;
    year?: quizYear;
    day?: quizDay;
    answer?: T;
}

export function stringToQuizType(type: string) {
    if (type === "bargain-shopper") {
        return quizType.bargainshopper;
    } else if (type === "drag") {
        return quizType.drag;
    } else if (type === "drag-bar") {
        return quizType.dragbar;
    } else if (type === "interest") {
        return quizType.interest;
    } else if (type === "matching") {
        return quizType.match;
    } else if (type === "more-or-less") {
        return quizType.moreorless;
    } else if (type === "order") {
        return quizType.order;
    } else if (type === "pick-correct") {
        return quizType.pick;
    } else if (type === "pick-correct-long") {
        return quizType.picklong;
    } else if (type === "triple-scrolling") {
        return quizType.tripplescrolling;
    } else {
        alert("stringToQuizType does not have the correct string input");
        return quizType.none;
    }
}

export function setQuizQuestion<T extends quizData<any>>(data: T) {
    data.year = quizYear.year3;
    data.UUID = uuidv4();
    console.log(data);
    setData("questions/" + data.year + "/" + data.day?.day, data.UUID, data);
}