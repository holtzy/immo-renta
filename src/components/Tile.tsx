import './tile.css'

import * as React from "react"

// The tile component creates a white square with a title on top
type TileProps = {
    height: number;
    title: string;
    children: React.ReactNode;
}

export default function Tile({ height, children, title }: TileProps) {
    return (
        <>
            <p className={'tile-title'}>{title}</p>
            <div style={{ height }} className={"tile-content"}>
                {children}
            </div>
        </>
    )
}
