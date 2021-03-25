import "../styles/slider.less";
import "./sliderWithTitle.css";

import React from "react";
import Form from "react-bootstrap/Form";


type SliderWithTitleProps = {
    title: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    onChange: (e: any) => void;
}

export const SliderWithTitle = ({
    title,
    value,
    unit,
    min,
    max,
    onChange
}: SliderWithTitleProps) => {

    return (
        <Form.Group>

            <div>
                <span className={"slider-with-title-title"}>{title}</span>
                <span className={"slider-with-title-unit"}>{unit}</span>
            </div>
            <div style={{ display: "flex" }}>
                <div style={{
                    width: '1300px',
                    marginRight: '10px'
                }}>
                    < Form.Control
                        type="range"
                        value={value}
                        custom
                        onChange={onChange}
                        min={min}
                        max={max}
                    />
                </div>
                <Form.Control
                    size="sm"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </div>
        </Form.Group>
    )

}
