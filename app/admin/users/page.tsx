'use client';

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/src/FirebaseBridge/Auth/currentUser";
import { getQuizCollection, getUserCollection } from "@/src/FirebaseBridge/firestore/getData";
import { quizData } from "@/src/Game/quiz/quizData";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DownloadPage = () => {
    const [quiz, setQuiz] = useState<currentUser[]>([]);

    const router = useRouter();

    const generate = (filter: string) => {
        getUserCollection("users/").then((data: currentUser[]) => {
            setQuiz(data);
        });
    }

    return (
        <div>
            <Button onClick={() => router.push("/admin")}>Back to the admin page</Button>
            <Button onClick={() => generate("")}>Get all users</Button>
            {quiz.map((data, index) => (
                <div key={index} className='space-y-2 bg-gray-500'>
                    <h1>User {index}</h1>
                    <h1>{data.dispalyName}</h1>
                    <h1>{data.role}</h1>
                </div>
            ))}
        </div>
    );
};

export default DownloadPage;