import * as React from "react"

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Col from "react-bootstrap/Col";

import Tile from "../components/Tile";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";

type InitialState = {
  surface: number;
  price: number;
}

const initialState = {
  surface: 40,
  price: 98000
}

// markup
const IndexPage = () => {

  const [state, setState] = React.useState<InitialState>(initialState)

  const updateState = (item: string, value: any) => {
    const newState = { ...state, [item]: value }
    setState(newState)
  }

  const pricePerSquareMeter = state.price / state.surface

  return (

    < main >
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
                  <Form.Row>
                    <Form.Label column sm="4">
                      Surface (m2)
                    </Form.Label>
                    <Col>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={state.surface}
                        onChange={e => updateState('surface', e.target.value)}
                      />
                    </Col>
                  </Form.Row>

                  <br />

                  <Form.Row>
                    <Form.Label column sm="4">
                      Prix (E)
                    </Form.Label>
                    <Col>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={state.price}
                        onChange={e => updateState('price', e.target.value)}
                      />
                    </Col>
                  </Form.Row>

                </Tile>

                <br />

                <Tile height={300} title={"Location"}>
                  <p>Hello</p>
                </Tile>

                <br />

                <Tile height={300} title={"Fiscalité"}>
                  <p>Hello</p>
                </Tile>

                <br />

                <Tile height={300} title={"Emprunt"}>
                  <p>Hello</p>
                </Tile>

              </Col>

              <Col xs={12} md={6}>
                <Tile height={300} title={"Prix"}>
                  <p>{pricePerSquareMeter}</p>
                </Tile>
              </Col>

            </Row>

          </Container>

        </div>
      </Layout>

    </main >
  )
}

export default IndexPage
