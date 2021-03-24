import * as React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";

import Tile from "../components/Tile";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";

// markup
const IndexPage = () => {
  return (
    <main >
      <title>Home Page</title>

      <Layout title="React Loves D3" seoDescription="How to make React and D3.js work together">

        <div className={"greySection"}>

          <Container>

            <br />
            <br />
            <br />

            <Row>
              <Col xs={12} md={6}>
                <Tile height={200} title={"Bien"}>
                  <p>Bien</p>
                </Tile>

                <br />

                <Tile height={300} title={"Location"}>
                  <p>Hello</p>
                </Tile>

              </Col>

            </Row>

          </Container>

        </div>
      </Layout>

    </main>
  )
}

export default IndexPage
