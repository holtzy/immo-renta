import "./selectWithTitle.css";

import React from "react";
import Form from "react-bootstrap/Form";
import Select from 'react-select'




type SelectWithTitleProps = {
    title: string;
    value: string;
    options: Array;
    onChange: (value: "string") => void;
    explanation?: React.Component;
}


export const SelectWithTitle = ({
    title,
    value,
    options,
    onChange,
    explanation
}: SelectWithTitleProps) => {

    return (
        <Form.Group>
            <div >
                <p className={"select-with-title-title"}>{title} {explanation}
                </p>
                <div style={{ width: '100%', marginRight: 4 }}>
                    <Select
                        options={options}
                        onChange={onChange}
                        value={options.filter(option => option.value === value)}
                    />
                </div>
            </div>
        </Form.Group >
    )
}
