export enum  quizType{
    drag = "drag",
    match = "match",
    order = "order",
    pick = "pick",
}

export enum quizYear{
    year3 = "year3",
    year4 = "year4",
}

export interface quizDay{
    day:string,
    type:quizType,
}

export interface quizData{
    UUID?:string;
    question?:string;
    photoURL?:string;
    year?:quizYear.year3;
    day?:quizDay;
    answer?:any;
}