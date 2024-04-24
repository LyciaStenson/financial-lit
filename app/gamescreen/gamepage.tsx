'use client';
import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import { getCurrentQuestion, checkCurrentQuestion, hasAllQuestionBeenCompleted } from "@/src/game"


const GameScreen = () => {
    const [questionsCompleted, setQuestionsCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(getCurrentQuestion());

    const answerCurrentQuestion = (result: boolean) => {
        checkCurrentQuestion(result).then(() => {
            if (hasAllQuestionBeenCompleted()) {
                setQuestionsCompleted(true);
            }
        });
    }

    return (
        <div>
            {!questionsCompleted && (
                <div>
                    <h1>Question 1: Click the Correct Answer</h1>
                    <h2>{currentQuestion.question}</h2>
                    {currentQuestion.choices.map((choice, index) => (
                        <Button key={index} title={choice.Answer} variant={"primary"} onClick={() => {
                            answerCurrentQuestion(choice.Result)
                            setCurrentQuestion(getCurrentQuestion());
                        }}>
                            {choice.Answer}
                        </Button>
                    ))}
                </div>
            )
            }

            {questionsCompleted && (
                <div>
                    <h1>Well done. You have completed todays session</h1>

                </div>
            )
            }

        </div>
    )
}

export default GameScreen();