
import React from "react";

type ClassicNumberProps = {
    suffix: string;
    value: string;
    size: number;
}

export const ClassicNumber = ({ suffix, value, size }: ClassicNumberProps) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div>
                <span style={{ fontSize: size, fontWeight: 'bold' }}>{value}</span>
                <span>{suffix}</span>
            </div>
        </div>
    )
}

type EvolutionNumberProps = {
    suffix: string;
    valueBefore: string;
    valueAfter: string;
    size: number;
}

export const EvolutionNumber = ({ suffix, valueBefore, valueAfter, size }: EvolutionNumberProps) => {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div>
                <span style={{ fontSize: size, fontWeight: 'bold' }}>{valueBefore}</span>
                <span>{suffix}</span>
                <span>  &rarr;  </span>
                <span style={{ fontSize: size, fontWeight: 'bold' }}>{valueAfter}</span>
                <span>{suffix}</span>
            </div>
        </div>
    )
}
