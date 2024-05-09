'use client';

import { useAuthContext } from "@/app/game-firebase/pageLoading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  // Access the user object from the authentication context
  // const { user } = useAuthContext();
  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  useEffect( () => {
    // Redirect to the home page if the user is not logged in
    if ( user != null ) {
      router.push( "/home " );
    }
    // }, [ user ] );
  }, [ user, router ] ); // Include 'router' in the dependency array to resolve eslint warning

  return (
    <div>
        <h1>Only logged-in users can view this page</h1>
        <Button variant={"primary"} onClick={() => router.push("/signin")}>Sign In</Button>
    </div>
  );
}

export default Page;

/*import React, { ChangeEvent, useEffect, useState } from "react";
import { getCurrentUser, hasUserBeenCreated, setScore, setQuestionData, randomScore, createUserWithPassword, getHasUserLoggedIn, returnAuth, logOut, getServerSideProps, createFirebase } from "@/src/firebaseBridge";
import { getCurrentQuestion, loadQuiz, hasQuestionsLoaded, hasAllQuestionBeenCompleted, checkCurrentQuestion } from "@/src/game"
import { Button } from "@/components/ui/button";
import RegistrationForm from "./registration";
import { onAuthStateChanged } from "firebase/auth";

const GameFirebasePage = () => {
    const [userLoggedIn, setUserLoggedIn] = useState(getHasUserLoggedIn()); 
    const [userSelected, setUserSelected] = useState(false);
    const [userScore, setUserScore] = useState(0);
    const [hasQuizStarted, setHasQuizStarted] = useState(false);
    const [questionsCompleted, setQuestionsCompleted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(getCurrentQuestion()); 

    const [signInCode, setSignInCode] = useState('');

    getServerSideProps();
    createFirebase();

    const handleLogin = () => {
        console.log(signInCode);
        createUserWithPassword(signInCode + "@mymoneyconfidence.co.uk", "TestPasswordDontHackMe!");
    };

    useEffect(() => {
        setCurrentQuestion(getCurrentQuestion()); // Update currentQuestion state whenever it changes
    }, [getCurrentQuestion()]);


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


    useEffect(() => {
        setUserScore(userScore);
    }, [userScore]);

    {
        return (
        <div className="flex flex-col justify-center items-center">
            {!userLoggedIn && (
                <div>
                    <input type="text" placeholder="Code" value={signInCode} onChange={(e) => setSignInCode(e.target.value)} />
    
                    {/*<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />*/
    /*<button type="submit" onClick={handleLogin}>Login</button>
                </div >
            )}
    userLoggedIn && (
        <div>
            Game Page
            <br />
            {userSelected && (
                <div>
                    <p>Current user: {getCurrentUser()?.firstName}</p>
                    <p>Score: {userScore}</p>
                    <Button variant={"primary"} onClick={() => logOut()}>Sign Out!</Button>
                    <button onClick={() => hasQuestionLoaded()}>Play</button>
                </div>
            )}
            {questionsCompleted && (
                <div>
                    <h1>All questions completed for Today! Make sure to come back tomorrow!</h1>
                    <Button variant={"primary"} onClick={randomScore}>Extra Score!</Button>
                </div>
            )}
            {hasQuizStarted && !questionsCompleted && (
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
            )}
        </div>
    )
}
        </div >
    )
    }
};

export default GameFirebasePage;
*/
