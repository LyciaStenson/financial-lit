'use client';

import { SideBar } from "@/components/side-bar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { setQuizQuestion } from "@/src/Game/quiz/quiz";
import { quizData, quizType } from "@/src/Game/quiz/quizData";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DownloadPage = () => {
    const [quiz, setQuiz] = useState<quizData[]>([]);

    const [question, setQuestion] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [choices, setChoices] = useState([{ Answer: '', Result: false }]);

    const router = useRouter();

    const [filter, setFilter] = useState("");

    const generate = (filter: string) => {
        getQuizCollection("questions/" + filter).then((data: quizData[]) => {
            setQuiz(data);
        });
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
        updatedChoices[index].Answer = event.target.value;
        setChoices(updatedChoices);
    };

    const handleChoiceResultChange = (index: number, value: boolean) => {
        const updatedChoices = [...choices];
        updatedChoices[index].Result = value;
        setChoices(updatedChoices);
    };

    const handleAddChoice = () => {
        setChoices(prevChoices => [...prevChoices, { Answer: '', Result: false }]);
    };

    const handleAddQuestion = () => {
        const data: quizData = {
            question: question,
            type: quizType.pick,
            answer: choices,
        }
        setQuizQuestion(data);
    };

    const loadPage = (path: string) => {
        router.push(path);
    };

    return (
        <div className=" pl-[250px]">
            <SideBar>
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
                <Textarea placeholder="Photo URL, leave blank if question does not have contain photos" value={photoURL} onChange={handlePhotoURLChange} />
                {choices.map((choice, index) => (
                    <div key={index} className='space-y-2'>
                        <Textarea placeholder={`Choice ${index + 1}`} value={choice.Answer} onChange={(event) => handleChoiceAnswerChange(index, event)} />
                        <Switch id={`true-false-${index}`} checked={choices[index].Result} onCheckedChange={(value) => handleChoiceResultChange(index, value)} />
                        <Label htmlFor={`true-false-${index}`}>{choices[index].Result ? 'True' : 'False'}</Label>
                    </div>
                ))}
                <div>
                    <Button onClick={handleAddChoice}>Add Choice</Button>
                </div>
                <Button onClick={handleAddQuestion}>Add Question</Button>
            </div>
        </div>
    );
};

export default DownloadPage;