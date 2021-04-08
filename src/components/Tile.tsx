import './tile.css'

import * as React from "react"

// The tile component creates a white square with a title on top
type TileProps = {
    title: string;
    children: React.ReactNode;
    explanation?: React.Component;
}

export default function Tile({ children, title, explanation }: TileProps) {
    return (
        <div className={"tile-container"}>
            <div className={"title-title-container"}>
                <span className={'tile-title'}>{title}</span>
                {explanation}
            </div>
            <div className={"tile-content"}>
                {children}
            </div>
        </div>
    )
}
