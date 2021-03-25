import * as React from "react"

import "../styles/slider.less";


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


const ClassicNumber = ({ suffix, value }) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div>
        <span style={{ fontSize: '4rem', fontWeight: 'bold' }}>{value}</span>
        <span>{suffix}</span>
      </div>
    </div>
  )
}

const IndexPage = () => {

  const [state, setState] = React.useState<InitialState>(initialState)

  const updateState = (item: string, value: any) => {
    const newState = { ...state, [item]: value }
    setState(newState)
  }

  const pricePerSquareMeter = state.price / state.surface
  const rentabiliteBrute = 2.5
  const rentabiliteNet = 2.5
  const rentabiliteNetNet = 2.5

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
                  <Form>
                    <Form.Group>
                      <Form.Label>Surface</Form.Label>
                      <div style={{ display: "flex" }}>
                        <div style={{
                          width: '1300px',
                          marginTop: '8px',
                          marginRight: '10px'
                        }}>
                          < Form.Control
                            type="range"
                            value={state.surface}
                            custom
                            onChange={e => updateState('surface', e.target.value)}
                            min="7" max="300"
                          />
                        </div>
                        <Form.Control
                          size="sm"
                          type="text"
                          value={state.surface}
                          onChange={e => updateState('surface', e.target.value)}
                        />
                      </div>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Prix</Form.Label>
                      <div style={{ display: "flex" }}>
                        <div style={{
                          width: '1300px',
                          marginTop: '8px',
                          marginRight: '10px'
                        }}>
                          < Form.Control
                            type="range"
                            value={state.price}
                            custom
                            onChange={e => updateState('price', e.target.value)}
                            min="30000" max="2000000"
                          />
                        </div>
                        <Form.Control
                          size="sm"
                          type="text"
                          value={state.price}
                          onChange={e => updateState('price', e.target.value)}
                        />
                      </div>
                    </Form.Group>

                  </Form>

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
                <Tile height={150} title={"Prix"} >
                  <ClassicNumber value={Math.round(pricePerSquareMeter)} suffix={"Euros / m2"} />
                </Tile>

                <br />

                <Tile height={200} title={"Rentabilite net net"} >
                  <ClassicNumber value={rentabiliteNetNet} suffix={"%"} />
                </Tile>
                <br />
                <Row>
                  <Col xs={12} md={6}>
                    <Tile height={150} title={"Brute"} >
                      <ClassicNumber value={rentabiliteBrute} suffix={"%"} />
                    </Tile>
                  </Col>
                  <Col xs={12} md={6}>
                    <Tile height={150} title={"Net"} >
                      <ClassicNumber value={rentabiliteNet} suffix={"%"} />
                    </Tile>
                  </Col>
                </Row>

              </Col>

            </Row>

          </Container>

        </div>
      </Layout >

    </main >
  )
}

export default IndexPage
