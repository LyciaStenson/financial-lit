'use client';

import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { answer, quizData, quizDay, quizType, setQuizQuestion, stringToQuizType } from "@/src/Game/quiz/quizDataBase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";

//Question Data imports
import bargainShopperQuestionData from "@/src/Game/AnswerData/BargainShopperQuestionData";
import orderQuestionData from "@/src/Game/AnswerData/OrderQuestionData";
import pickCorrectQuestionData from "@/src/Game/AnswerData/PickCorrectQuestionData";

const DownloadPage = () => {
    const [quiz, setQuiz] = useState<quizData<answer>[]>([]);

    const [question, setQuestion] = useState('');
    const [day, setDay] = useState('');
    const [type, setType] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [choices, setChoices] = useState<answer[]>([]);

    const router = useRouter();

    const [filter, setFilter] = useState("");

    const generate = (filter: string) => {
        getQuizCollection("questions/" + filter).then((data: quizData<answer>[]) => {
            setQuiz(data);
        });
    }

    const handleDayChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDay(event.target.value);
    }

    const handleQuestionType = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setType(event.target.value.toLowerCase());
    }

    const handleFilter = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFilter(event.target.value);
    }

    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };

    const handlePhotoURLChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPhotoURL(event.target.value);
    };

    const handleChoiceAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedChoices = [...choices];
        updatedChoices[index].answer = event.target.value;
        setChoices(updatedChoices);
    };

    const handleChoiceResultChange = (index: number, value: boolean) => {
        const updatedChoices = [...choices];
        updatedChoices[index].result = value;
        setChoices(updatedChoices);
    };



    const handleAddChoice = () => {
        setChoices(prevChoices => [...prevChoices, { answer: '', result: false }]);
    };

    const handleRemoveChoice = (index: number) => {
        setChoices(prevChoices => prevChoices.filter((_, i) => i !== index));
    };

    const handleAddQuestion = () => {
        if (!day.startsWith("day")) {
            setDay("day" + day);
        } else {
            setDay(day);
        }
        const dayData: quizDay = {
            day: day,
            type: stringToQuizType(type)!,
        }

        if(type == "bargain-shopper"){
            let questionData:bargainShopperQuestionData = {
                question:question,
                day:dayData,
                answer:choices
            }

            setQuizQuestion(questionData);     
            toast.success("Added Bargain Shopper Question");   
        }else if(type == "drag"){

        }else if(type == "drag-bar"){
            
        }else if(type == "interest"){
            
        }else if(type == "matching"){
            
        }else if(type == "more-or-less"){
            
        }else if(type == "order"){
            
        }else if(type == "pick-correct" || type == "pick-correct-long"){
            let questionData:pickCorrectQuestionData = {
                question:question,
                day:dayData,
                answer:choices
            }

            setQuizQuestion(questionData);  
            toast.success("Added Pick Correct Question");
        }else if(type == "tripple-scrolling"){
            
        }
    };

    const loadPage = (path: string) => {
        router.push(path);
    };

    return (
        <div className=" pl-[250px]">
            <SideBar
                title="Admin"
            >
                <Button onClick={() => loadPage("/admin")}>Home</Button>
                <Button onClick={() => loadPage("/admin/questions")}>Questions</Button>
                <Button onClick={() => loadPage("/admin/users")}>Users</Button>
                <Button onClick={() => loadPage("/admin/certificate")}>Certification</Button>
                <Button onClick={() => loadPage("/admin/qr")}>QR</Button>
            </SideBar>
            <div className="grid w-3/5 gap-2 p-4">
                <Button onClick={() => router.push("/admin")}>Back to the admin page</Button>
                <Button onClick={() => generate(filter)}>Get all questions</Button>
                <Textarea placeholder="Filter." value={filter} onChange={handleFilter} className="w-50" />
                {quiz.map((data, index) => (
                    <div key={index} className='space-y-2 bg-gray-500'>
                        <h1>Questrion {index}</h1>
                        <h1>{data.question}</h1>
                    </div>
                ))}
            </div>
            <div className="grid w-3/5 gap-2 p-4">
                <h1 className='text-xl'>Add Question</h1>
                <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
                <Textarea placeholder="Quiz Type ie pick." value={type} onChange={handleQuestionType} />
                {type == "bargain-shopper" && (
                    <div className="space-y-4">
                    <h1>Bargain Shopper is the question type</h1>

                    {choices.map((choice, index) => (
                        <div key={index} className='space-y-2'>
                            <Textarea placeholder={`Choice ${index + 1}`} value={choice.answer} onChange={(event) => handleChoiceAnswerChange(index, event)} />
                            <div className="space-x-4">
                                <Switch id={`true-false-${index}`} checked={choices[index].result} onCheckedChange={(value) => handleChoiceResultChange(index, value)} />
                                <Label htmlFor={`true-false-${index}`}>{choices[index].result ? 'True' : 'False'}</Label>
                                <Button className=" w-40 h-15 text-xs" onClick={() => handleRemoveChoice(index)}>Remove Choice</Button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <Button onClick={handleAddChoice}>Add Choice</Button>
                    </div>
                    <Button className="" onClick={handleAddQuestion}>Add Question</Button>
                </div>
                )}
                {type == "drag" && (
                    <div>
                        <h1>Drag is the question type</h1>
                    </div>
                )}
                {type == "drag-bar" && (
                    <div>
                        <h1>Drag Bar is the question type</h1>
                    </div>
                )}
                {type == "interest" && (
                    <div>
                        <h1>Interest is the question type</h1>
                    </div>
                )}
                {type == "matching" && (
                    <div>
                        <h1>Matching is the question type</h1>
                    </div>
                )}
                {type == "more-or-less" && (
                    <div>
                        <h1>More or Less is the question type</h1>
                    </div>
                )}
                {type == "order" && (
                    <div className="space-y-4">
                        <h1>Order is the question type</h1>
                    </div>
                )}
                {type == "pick-correct" && (
                    <div className="space-y-4">
                        <h1>Pick Correct is the question type</h1>

                        {choices.map((choice, index) => (
                            <div key={index} className='space-y-2'>
                                <Textarea placeholder={`Choice ${index + 1}`} value={choice.answer} onChange={(event) => handleChoiceAnswerChange(index, event)} />
                                <div className="space-x-4">
                                    <Switch id={`true-false-${index}`} checked={choices[index].result} onCheckedChange={(value) => handleChoiceResultChange(index, value)} />
                                    <Label htmlFor={`true-false-${index}`}>{choices[index].result ? 'True' : 'False'}</Label>
                                    <Button className=" w-40 h-15 text-xs" onClick={() => handleRemoveChoice(index)}>Remove Choice</Button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button onClick={handleAddChoice}>Add Choice</Button>
                        </div>
                        <Button className="" onClick={handleAddQuestion}>Add Question</Button>
                    </div>
                )}
                {type == "pick-correct-long" && (
                    <div className="space-y-4">
                        <h1>Pick Correct is the question type</h1>

                        {choices.map((choice, index) => (
                            <div key={index} className='space-y-2'>
                                <Textarea placeholder={`Choice ${index + 1}`} value={choice.answer} onChange={(event) => handleChoiceAnswerChange(index, event)} />
                                <div className="space-x-4">
                                    <Switch id={`true-false-${index}`} checked={choices[index].result} onCheckedChange={(value) => handleChoiceResultChange(index, value)} />
                                    <Label htmlFor={`true-false-${index}`}>{choices[index].result ? 'True' : 'False'}</Label>
                                    <Button className=" w-40 h-15 text-xs" onClick={() => handleRemoveChoice(index)}>Remove Choice</Button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button onClick={handleAddChoice}>Add Choice</Button>
                        </div>
                        <Button className="" onClick={handleAddQuestion}>Add Question</Button>
                    </div>
                )}
                {type == "tripple-scrolling" && (
                    <div>
                        <h1>Tripple Scrolling is the question type</h1>
                    </div>
                )}
            </div>
            <Toaster/>
        </div>
    );
};

export default DownloadPage;