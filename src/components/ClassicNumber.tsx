
import React from "react";

type ClassicNumberProps = {
    suffix: string;
    value: number;
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
