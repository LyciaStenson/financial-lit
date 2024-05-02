import { Banner } from "./banner";
import { LessonButton } from "./lesson-button";

const GamePage = () => {
    return (
        <div className="gap-[48px] px-6">
            <Banner title="Adam's Money Confidence Month: Day 6" description="You're back for more I see... Okay, let's do this!"></Banner>
        <div className="flex flex-col items-center justify-center relative py-6 space-y-4">
            <LessonButton
            day={1}
            totalCount={1}
            //locked={false}
            current={false}
            />

            <LessonButton
            day={2}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={3}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={4}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={5}
            totalCount={1}
            //locked={false}
            current={false}
            />

            <LessonButton
            day={6}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={7}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={8}
            totalCount={1}
            //locked={true}
            current={false}
            />
            <LessonButton
            day={9}
            totalCount={1}
            //locked={false}
            current={false}
            />

            <LessonButton
            day={10}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={11}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={12}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={13}
            totalCount={1}
            //locked={false}
            current={false}
            />

            <LessonButton
            day={14}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={15}
            totalCount={1}
            //locked={true}
            current={false}
            />

            <LessonButton
            day={16}
            totalCount={1}
            //locked={true}
            current={false}
            />
        </div>
        </div>
    );
};

export default GamePage;
