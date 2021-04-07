import "./selectWithTitle.css";

import React from "react";
import Form from "react-bootstrap/Form";

type option = {
    label: string;
    value: string | number;
}

type SelectWithTitleProps = {
    title: string;
    value: string | number;
    options: option[];
    onChange: any;
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                    <span style={{ marginRight: 14 }}>{title}</span>
                    <div style={{ maxWidth: 300, marginRight: 4 }}>
                        <Form.Control as="select" size="sm" custom
                            onChange={onChange}
                        >
                            {
                                options.map(option => {
                                    return (
                                        <option value={option.value}>{option.label}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </div>
                    <span>
                        {explanation}
                    </span>
                </div>
            </div>
        </Form.Group >
    )
}
