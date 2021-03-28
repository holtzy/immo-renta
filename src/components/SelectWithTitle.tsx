import "./selectWithTitle.css";

import React from "react";
import Form from "react-bootstrap/Form";
import Select from 'react-select'

type option = {
    label: string;
    value: string | number;
}

type SelectWithTitleProps = {
    title: string;
    value: string | number;
    options: option[];
    onChange: (choice: option) => void;
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
                <p className={"select-with-title-title"}>{title}{explanation}
                </p>
                <div style={{ width: '100%', marginRight: 4 }}>
                    <Select
                        options={options}
                        onChange={onChange}
                        value={options.filter(option => option.value === value)[0]}
                    />
                </div>
            </div>
        </Form.Group >
    )
}
