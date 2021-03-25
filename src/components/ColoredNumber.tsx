import "./coloredNumber.css";

import React from "react";
import Form from "react-bootstrap/Form";


type ColoredNumberProps = {
    value: number;
    suffix: string;
}

export const ColoredNumber = ({
    suffix,
    value
}: ColoredNumberProps) => {

    return (
        <div className={"colored-number-container"}>
            <div>
                <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>{value}</span>
                <span>{suffix}</span>
            </div>
        </div>
    )
}
