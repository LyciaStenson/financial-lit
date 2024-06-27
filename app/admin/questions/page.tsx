'use client';

import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { answer, quizData, quizDay, quizType, setQuizQuestion, stringToQuizType } from "@/src/Game/quiz/quizDataBase";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Toaster, toast } from "sonner";

//Question Data imports
import bargainShopperQuestionData from "@/src/Game/AnswerData/BargainShopperQuestionData";
import orderQuestionData from "@/src/Game/AnswerData/OrderQuestionData";
import pickCorrectQuestionData from "@/src/Game/AnswerData/PickCorrectQuestionData";
import dragBarQuestionData from "@/src/Game/AnswerData/DragBarQuestionData";
import matchingQuestionData, { matchingQuestionAnswer} from "@/src/Game/AnswerData/MatchingQuestionData";

const DownloadPage = () => {
    const [quiz, setQuiz] = useState<quizData<answer>[]>([]);

    const [question, setQuestion] = useState('');
    const [day, setDay] = useState('');
    const [type, setType] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [choices, setChoices] = useState<answer[]>([]);

    const [orderWords, setOrdrrWords] = useState<string[]>([]);
    const [word, setWord] = useState("");
    const [wordFinal, setWordFinal] = useState("");

    // Drag Bar Question =======================================================================
    const [dragAnaswer, setDragAnswer] = useState("");
    const [dragValueMin, setDragValueMin] = useState("");
    const [dragValueMax, setDragValueMax] = useState("");
    const [dragValueStep, setDragValueStep] = useState("");
    // =======================================================================================
    // Matching Question =======================================================================

    const [pairAnswer, setPairAnswer] = useState<matchingQuestionAnswer>({
        answers: []
    });
    
    const [pairIndex, setPairIndex] = useState<number>(0);

    // =======================================================================================

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

    const handleOrderWordChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedChoices = [...orderWords];
        updatedChoices[index] = event.target.value;
        setOrdrrWords(updatedChoices);
    };

    const handleChoiceResultChange = (index: number, value: boolean) => {
        const updatedChoices = [...choices];
        updatedChoices[index].result = value;
        setChoices(updatedChoices);
    };

    const handleAddChoice = () => {
        setChoices(prevChoices => [...prevChoices, { answer: "", result: false }]);
    };

    const handleRemoveChoice = (index: number) => {
        setChoices(prevChoices => prevChoices.filter((_, i) => i !== index));
    };

    // Order Question =======================================================================
    const handleWordChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWord(event.target.value);
    }

    const handleAddOrderChoice = () => {
        setOrdrrWords(prevChoices => [...prevChoices, ""]);
    }

    const handleRemoveOrderChoice = (index: number) => {
        setOrdrrWords(prevOrder => prevOrder.filter((_, i) => i !== index));
    }
    // =======================================================================================
    // Drag Bar Question =======================================================================

    const handleDragAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDragAnswer(event.target.value);
    };

    const handleDragMin = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDragValueMin(event.target.value);
    };

    const handleDragMax = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDragValueMax(event.target.value);
    };

    const handleDragStep = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDragValueStep(event.target.value);
    };

    // =======================================================================================
    // Matching Question =======================================================================

    const handleAddPairAnswerChoice = () => {
        setPairAnswer(prevAnswers => ({
            answers: [
                ...prevAnswers.answers,
                { id: pairIndex, left: "", right: "" }
            ]
        }));
        setPairIndex(prevIndex => prevIndex + 1);
    };

    const handleRemovePairAnswerChoice = (id: number) => {
        setPairAnswer(prevAnswers => ({
            answers: prevAnswers.answers.filter(pair => pair.id !== id)
        }));
    };

    const handleLeftWord = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newPairAnswers = { ...pairAnswer }; // Shallow copy of pairAnswers
        newPairAnswers.answers[index].left = event.target.value;
        setPairAnswer(newPairAnswers);
    };
    
    const handleRightWord = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newPairAnswers = { ...pairAnswer }; // Shallow copy of pairAnswers
        newPairAnswers.answers[index].right = event.target.value;
        setPairAnswer(newPairAnswers);
    }; 

    // =======================================================================================

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

        if (type == "bargain-shopper") {
            let questionData: bargainShopperQuestionData = {
                question: question,
                day: dayData,
                answer: choices
            }

            setQuizQuestion(questionData);
            toast.success("Added Bargain Shopper Question");
        } else if (type == "drag") {

        } else if (type == "drag-bar") {
            let questionData: dragBarQuestionData = {
                question: question,
                day: dayData,
                photo:photoURL,
                min:dragValueMin,
                max:dragValueMax,
                step:dragValueStep,
                answer: { answer:dragAnaswer }
            }

            setQuizQuestion(questionData);
            toast.success("Added Drag Bar Question");

        } else if (type == "interest") {

        } else if (type == "matching") {
            let questionData: matchingQuestionData = {
                question:question,
                day: dayData,
                answer:pairAnswer,
            }
            
            setQuizQuestion(questionData);
            toast.success("Added Matching Question");
        } else if (type == "more-or-less") {

        } else if (type == "order") {
            let questionData: orderQuestionData = {
                question: question,
                day: dayData,
                answer: {answer:wordFinal, word:word},
                words: orderWords,
            }

            setQuizQuestion(questionData);
            toast.success("Added Order Question");
        } else if (type == "pick-correct" || type == "pick-correct-long") {
            let questionData: pickCorrectQuestionData = {
                question: question,
                day: dayData,
                answer: choices
            }

            setQuizQuestion(questionData);
            toast.success("Added Pick Correct Question");
        } else if (type == "tripple-scrolling") {

        }
    };

    const loadPage = (path: string) => {
        router.push(path);
    };

    function handleOrderAnswer(event: ChangeEvent<HTMLTextAreaElement>): void {
        setWordFinal(event.target.value);
    }

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
                <Button onClick={() => generate(filter)}>Get all    questions</Button>
                <Textarea placeholder="Filter." value={filter} onChange={handleFilter} className="w-50" />
                {quiz.map((data, index) => (
                    <div key={index} className='space-y-2 bg-gray-500'>
                        <h1>Questrion {index}</h1>
                        <h1>{data.question}</h1>
                    </div>
                ))}
            </div>
            <div className="grid w-3/5 gap-2 p-4">
                <Textarea placeholder="Quiz Type ie pick." value={type} onChange={handleQuestionType} />
                {type == "bargain-shopper" && (
                    <div className="space-y-4">
                        <h1 className='text-xl'>Add Bargain Shopper Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
                        <Textarea placeholder="Quiz Type ie pick." value={type} onChange={handleQuestionType} />
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
                        <div className="space-y-4">
                        <h1 className='text-xl'>Add Drag Bar Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
                        <Textarea placeholder="Quiz Type ie pick." value={type} onChange={handleQuestionType} />
                        <Textarea placeholder="Photo URL" value ={photoURL} onChange={handlePhotoURLChange}></Textarea>
                        <Textarea placeholder="Min Value" value ={dragValueMin} onChange={handleDragMin}></Textarea>
                        <Textarea placeholder="Max Value" value ={dragValueMax} onChange={handleDragMax}></Textarea>
                        <Textarea placeholder="Step" value ={dragValueStep} onChange={handleDragStep}></Textarea>
                        <Textarea placeholder="Anaswer" value ={dragAnaswer} onChange={handleDragAnswer}></Textarea>
                        <Button className="" onClick={handleAddQuestion}>Add Question</Button>
                    </div>
                    </div>
                )}
                {type == "interest" && (
                    <div>
                        <h1>Interest is the question type</h1>
                    </div>
                )}
                {type == "matching" && (
                    <div className="space-y-4">
                        <h1>Matching is the question type</h1>
                        <h1 className='text-xl'>Add Order Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
                        {pairAnswer.answers.map((choice, index) => (
                            <div key={index} className='space-y-2'>
                                <Textarea placeholder={`Left Word ${index + 1}`} value={choice.left} onChange={(event) => handleLeftWord(index, event)} />
                                <Textarea placeholder={`Right Word ${index + 1}`} value={choice.right} onChange={(event) => handleRightWord(index, event)} />
                                <div className="space-x-4">
                                    <Button className=" w-40 h-15 text-xs" onClick={() => handleRemovePairAnswerChoice(index)}>Remove Word</Button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button onClick={handleAddPairAnswerChoice}>Add Pair</Button>
                        </div>
                        <Button className="" onClick={handleAddQuestion}>Add Question</Button>
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
                        <h1 className='text-xl'>Add Order Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
                        <Textarea placeholder="Word ie APR" value={word} onChange={handleWordChange} />
                        <Textarea placeholder={"Answer Word ie Annual percentage rate"} value={wordFinal} onChange={(event) => handleOrderAnswer(event)} />
                        {orderWords.map((choice, index) => (
                            <div key={index} className='space-y-2'>
                                <Textarea placeholder={`Word ${index + 1}`} value={choice} onChange={(event) => handleOrderWordChange(index, event)} />
                                <div className="space-x-4">
                                    <Button className=" w-40 h-15 text-xs" onClick={() => handleRemoveOrderChoice(index)}>Remove Word</Button>
                                </div>
                            </div>
                        ))}
                        <div>
                            <Button onClick={handleAddOrderChoice}>Add Word</Button>
                        </div>
                        <Button className="" onClick={handleAddQuestion}>Add Question</Button>
                    </div>
                )}
                {type == "pick-correct" && (
                    <div className="space-y-4">
                        <h1 className='text-xl'>Add Pick Correct Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
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
                        <h1 className='text-xl'>Add Pick Correct Long Question</h1>
                        <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                        <Textarea placeholder="Day Here." value={day} onChange={handleDayChange} />
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
            <Toaster />
        </div>
    );
};

export default DownloadPage;