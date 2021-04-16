import "./questionCard.css"

import * as React from "react"
import { Link } from "gatsby";

type QuestionCardProps = {
    link: string;
    title: string;
    description: string;
    logo: string;
}

export const QuestionCard = ({ link, title, description, logo }: QuestionCardProps) => {
    return (
        <div className="question-card-container">
            <p className="question-card-title">{title}</p>
            <p>{description}</p>
            <Link to={link}>Lire</Link>
        </div>
    )
}
