import "./coloredNumber.css";

import React from "react";

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
                <span style={{ fontSize: '5rem', fontWeight: 'bold' }}>
                    {value}
                </span>
                <span>{suffix}</span>
            </div>
        </div>
    )
}
