import "../styles/slider.less";
import "./sliderWithTitle.css";

import React from "react";
import Form from "react-bootstrap/Form";
import { formatNumberWithThousands } from '../utils/utils'


type SliderWithTitleProps = {
    title: string;
    value: number;
    unit: string;
    min: number;
    max: number;
    onChange: (e: any) => void;
    disabled?: boolean;
    hasAutoEstimate?: boolean;
    onAutoEstimateChange?: (e: any) => void;
}

export const SliderWithTitle = ({
    title,
    value,
    unit,
    min,
    max,
    onChange,
    disabled,
    hasAutoEstimate,
    onAutoEstimateChange
}: SliderWithTitleProps) => {

    return (
        <Form.Group>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                    <span className={"slider-with-title-title"}>{title}</span>
                    <span className={"slider-with-title-unit"}>{unit}</span>
                    <div className={"slider-with-title-text-input"}>
                        <Form.Control
                            size="sm"
                            type="text"
                            value={formatNumberWithThousands(value)}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </div>
                    {hasAutoEstimate &&
                        <div>
                            <Form.Check
                                custom
                                type={'checkbox'}
                                id={`custom-checkbox`}
                                label={`Estimation auto`}
                                checked={disabled}
                                onChange={onAutoEstimateChange}
                            /></div>}
                </div>

                {!hasAutoEstimate && <div style={{ width: '50px', marginLeft: '20px' }}>
                    < Form.Control
                        type="range"
                        value={value}
                        custom
                        onChange={onChange}
                        min={min}
                        max={max}
                    />
                </div>}
            </div>

        </Form.Group>
    )

}
