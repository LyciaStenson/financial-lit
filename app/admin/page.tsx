'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { setQuestionData } from '@/src/firebaseBridge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
//import QRCode from "react-qr-code";

const AdminPage = () => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([{ Answer: '', Result: false }]);
    const [school, setSchool] = useState('');

    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };

    const handleSchoolName = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(event.target.name);
        setSchool(event.target.name);
    }

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
        setQuestionData(question, choices);
    };

    return (
        <div>
            <div className="grid w-3/5 gap-2 p-4">
                <h1 className='text-3xl'>Admin Page</h1>
                
                {/*
                <QRCode
                size={400}
                value={"https://uniglos.github.io/RT-Financial-Lit"}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
                */}
                
                <h1 className='text-xl'>Add Question</h1>
                <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
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
            <div className="grid w-3/5 gap-2 p-4">
                <h1 className='text-xl'>Add Users</h1>
                <Textarea id='school' placeholder="School Name Here." value={school} onChange={handleSchoolName} />
                <Button onClick={handleAddQuestion}>Add User</Button>
            </div>
        </div>
    );
};

export default AdminPage;



