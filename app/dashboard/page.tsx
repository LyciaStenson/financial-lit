'use client';
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { getCurrentQuestion, checkCurrentQuestion, hasAllQuestionBeenCompleted, loadQuiz, hasQuestionsLoaded } from "@/src/game"
import { useRouter } from 'next/navigation';

function Page(): JSX.Element {
    const [questionsCompleted, setQuestionsCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(getCurrentQuestion());
    const [hasQuizStarted, setHasQuizStarted] = useState(false);
    const router = useRouter();

    const hasQuestionLoaded = () => {
        loadQuiz();
        if (hasQuestionsLoaded()) {
            setHasQuizStarted(true);
        }
    }

    const answerCurrentQuestion = (result: boolean) => {
        checkCurrentQuestion(result).then(() => {
            if (hasAllQuestionBeenCompleted()) {
                setQuestionsCompleted(true);
            }
        });
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Hello { } Dave</h1>
            <p>Welcome Back</p>
            {questionsCompleted && (
                <h1>You have completed todays quiz. Come back tomorrow!</h1>
            )}
            {!questionsCompleted && (
                <Button variant={"primary"} onClick={() => router.push("/gamescreen")}>Player Todays Game</Button>
            )}
        </div>
    )
}

export default Page;