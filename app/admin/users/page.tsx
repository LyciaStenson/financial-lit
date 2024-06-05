'use client';

import { SideBar } from "@/components/side-bar";
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

    const loadPage = (path: string) => {
        router.push(path);
    };

    return (
        <div className=" pl-[270px]">
            <SideBar>
                <Button onClick={() => loadPage("/admin")}>Home</Button>
                <Button onClick={() => loadPage("/admin/questions")}>Questions</Button>
                <Button onClick={() => loadPage("/admin/users")}>Users</Button>
                <Button onClick={() => loadPage("/admin/certificate")}>Certification</Button>
                <Button onClick={() => loadPage("/admin/qr")}>QR</Button>
            </SideBar>            
            <Button onClick={() => generate("")}>Get all users</Button> 
            {quiz.map((data, index) => (
                <div key={index} className=' space-y-5 bg-gray-500'>
                    <h1>User {index}</h1>
                    <h1>{data.dispalyName}</h1>
                    <h1>{data.role}</h1>
                </div>
            ))}
                
        </div>
    );
};

export default DownloadPage;