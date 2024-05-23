'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getQuizCollection } from "@/src/FirebaseBridge/firestore/getData";
import { quizData } from "@/src/Game/quiz/quizData";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DownloadPage = () => {
    const [quiz, setQuiz] = useState<quizData[]>([]);
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

    return (
        <div>
            <div className=" flex flex-grow">
                <Button onClick={() => router.push("/admin")}>Back to the admin page</Button>
                <Button onClick={() => generate(filter)}>Get all questions</Button>
                <Textarea placeholder="Filter." value={filter} onChange={handleFilter} className="w-50" />
            </div>
            {quiz.map((data, index) => (
                <div key={index} className='space-y-2 bg-gray-500'>
                    <h1>Questrion {index}</h1>
                    <h1>{data.question}</h1>
                </div>
            ))}
        </div>
    );
};

export default DownloadPage;