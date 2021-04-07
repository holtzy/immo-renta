
import React from "react";
import meshGradient from "../images/meshGradient.png"

export const ImmoRentaLogo = () => {
    return (
        <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">

            <defs>
                <pattern id="img1" patternUnits="userSpaceOnUse" width="100" height="100">
                    <image href={meshGradient} x="0" y="0" width="100" height="100" />
                </pattern>
            </defs>

            <g>
                <path d="M50 0 L0 68 L100 68 Z" fill="orange" stroke="transparent" />
                <rect x="0" y="72" width="100%" height="178" fill="orange" stroke="transparent" />
            </g>

        </svg>
    )
}

