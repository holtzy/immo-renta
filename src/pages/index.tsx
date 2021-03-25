import * as React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Tile from "../components/Tile";
import { SliderWithTitle } from "../components/SliderWithTitle";
import { ColoredNumber } from "../components/ColoredNumber";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";
import { RentabiliteBruteExplanationModal, RentabiliteNetNetExplanationModal } from "../components/ExplanationModals"

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

    <Layout title="Renta-Immo" seoDescription="Calculez la rentabilité de votre investissement immobilier en 1 click.">

      <Container>

        <br />
        <br />
        <br />

        <Row>

          <Col xs={12} md={6}>
            <Tile height={160} title={"Bien"}>
              <SliderWithTitle
                title={"Surface"}
                unit={"m2"}
                min={7}
                max={300}
                onChange={e => updateState('surface', e.target.value)}
                value={state.surface}
              />
              <SliderWithTitle
                title={"Prix"}
                unit={"euros"}
                min={30000}
                max={2000000}
                onChange={e => updateState('price', e.target.value)}
                value={state.price}
              />
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

            <Tile height={200} title={"Rentabilite net net"} explanation={<RentabiliteNetNetExplanationModal />} >
              <ColoredNumber value={rentabiliteNetNet} suffix={"%"} />
            </Tile>
            <br />
            <Row>
              <Col xs={12} md={6}>
                <Tile height={150} title={"Brute"} explanation={<RentabiliteBruteExplanationModal />} >
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

        <Spacing />
      </Container>

    </Layout >
  )
}

export default IndexPage
