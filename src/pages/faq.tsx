import * as React from "react"
import { Container } from "react-bootstrap";

import Layout from "../components/Layout";
import Spacing from "../components/Spacing";
import { QuestionCard } from "../components/QuestionCard"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const Faq = () => {
    return (
        <Layout title="Questions Fréquentes" seoDescription="Toutes les questions les plus fréquentes liées aux calculs de rendements locatifs. Prêts, mensualités, intérêts, impôts etc..">
            <Container>
                <Spacing />
                <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}><h1>Question Fréquentes</h1>
                    <br />
                    <p style={{ maxWidth: 700, textAlign: "center" }}>Immo Renta vous aide à répondre à toutes vos questions les plus fréquentes concernant les calculs du monde de l'immobilier. Des concepts expliqués simplement, avec des examples chiffrés et des simulateurs en directs.</p>
                </div>

                <h2>Emprunts</h2>
                <Row>
                    <Col xs={12} md={3}>
                        <QuestionCard
                            title="Taux d'intérêt mensuel"
                            description="Comment convertir un taux annuel en un taux mensuel?"
                            logo="conversion"
                            link="toto"
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        <QuestionCard
                            title="Mensualité"
                            description="Comment calculer la mensualité de votre prêt?"
                            logo="conversion"
                            link="toto"
                        />
                    </Col>
                    <Col xs={12} md={3}>
                        <QuestionCard
                            title="Tableau d'ammortissement"
                            description="Comment générer le fameux tableau d'ammortissement?"
                            logo="conversion"
                            link="toto"
                        />
                    </Col>
                </Row>
                <Spacing />

            </Container>
        </Layout>
    )
}

export default Faq
