import React from "react";
import Button from "../../components/Button/Button";

const SurveyPage: React.FC = () => {
    return(
        <>
        <h2>Survey</h2>
        <div className="survey-subtitle">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci ab dolorem praesentium fugiat dignissimos sed possimus, architecto esse? Nulla temporibus quidem sequi ratione quia, eum officiis veritatis soluta voluptate eaque?</p>
        </div>
        <div className="survey-description">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas earum sit eius, itaque repudiandae quae inventore eligendi reprehenderit alias unde placeat, assumenda ullam cumque nesciunt dolorem? Facere explicabo impedit nobis!</p>
        </div>
        <Button>Confirm</Button>
        </>
    )
}

export default SurveyPage