'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { setQuestionData } from '@/src/firebaseBridge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const AdminPage = () => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([{ Answer: '', Result: false }]);

    const handleQuestionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setQuestion(event.target.value);
    };

    const handleChoiceAnswerChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const updatedChoices = [...choices];
        updatedChoices[index].Answer = event.target.value;
        setChoices(updatedChoices);
    };

    const handleChoiceResultChange = (index: number, value: boolean) => {
        const updatedChoices = [...choices];
        console.log(value);
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
            <h1>Admin</h1>
            <div className="grid w-3/5 gap-2">
                <Textarea placeholder="Question Here." value={question} onChange={handleQuestionChange} />
                {choices.map((choice, index) => (
                    <div key={index}>
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

export default AdminPage;



