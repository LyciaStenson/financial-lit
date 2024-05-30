import { useState } from "react"
import { Button } from "./ui/button";

type Props = {

}

const ToggleButton = () => {
    const [toggled, setToggled] = useState(false);

    const toggle = () => {
        setToggled(!toggled);
    };

    const test = () => {

    };

    return (
        <Button
            onClick={() => {toggle(); test();}}
            variant="quiz"
            size="quiz"
        />
    );
};

export default ToggleButton;