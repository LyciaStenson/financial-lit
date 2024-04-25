import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";

const GamePage = () => {
    return (
        <div className="gap-[48px] px-6">
            <Banner title="Adam's Money Confidence Month: Day 6" description="You're back for more I see... Okay, let's do this!"></Banner>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <LessonButton
            day={1}
            totalCount={1}
            locked={false}
            current={false}
            percentage={0}
            />

            <LessonButton
            day={2}
            totalCount={1}
            locked={false}
            current={false}
            percentage={0}
            />

            <LessonButton
            day={3}
            totalCount={1}
            locked={false}
            current={false}
            percentage={0}
            />

            <LessonButton
            day={4}
            totalCount={1}
            locked={false}
            current={false}
            percentage={0}
            />
        </div>
        </div>
    );
};

export default GamePage;
