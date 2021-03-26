import * as React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Tile from "../components/Tile";
import { SliderWithTitle } from "../components/SliderWithTitle";
import { SelectWithTitle } from "../components/SelectWithTitle";
import { ColoredNumber } from "../components/ColoredNumber";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";
import { RentabiliteBruteExplanationModal, RentabiliteNetNetExplanationModal } from "../components/ExplanationModals"
import { computeAnnualTaxes, computeLoanTable, computeMensuality, computeTotalLoanInterest } from '../utils/mathFormulas'

type InitialState = {
  surface: number;
  price: number;
  rent: number;
  fiscality: string;
  monthsWithNoRent: number;
  agencyMensualFee: number;
  ownerMensualFees: number;
  refundableMensualFees: number;
  isHouseBrandNew: boolean;
  houseBuildingWork: number;
  netAnnualRevenu: number;
  numberOfFiscalPeople: number;
  loanAmount: number;
  loanLength: number;
  loanRate: number;
}

const initialState = {
  surface: 40,
  price: 98000,
  rent: 400,
  fiscality: "meuble",
  monthsWithNoRent: 1,
  agencyMensualFee: 0,
  ownerMensualFees: 100,
  refundableMensualFees: 100,
  isHouseBrandNew: false,
  houseBuildingWork: 0,
  netAnnualRevenu: 60000,
  numberOfFiscalPeople: 2,
  loanAmount: 0,
  loanLength: 20,
  loanRate: 1.5
}

const fiscalOptions = [
  { value: 'meuble', label: 'Meublé' },
  { value: 'nonMeubleMicro', label: 'Non meublé - réel' },
  { value: 'nonMeubleReel', label: 'Non meublé - micro' }
]

const numberOfFiscalPeopleOptions =
  [
    { value: 1, label: '1' },
    { value: 1.5, label: '1.5' },
    { value: 2, label: '2' },
    { value: 2.5, label: '2.5' },
    { value: 3, label: '3' },
    { value: 3.5, label: '3.5' },
    { value: 4, label: '4' },
    { value: 4.5, label: '4.5' },
  ]

const ClassicNumber = ({ suffix, value, size }) => {
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



const IndexPage = () => {

  const [state, setState] = React.useState<InitialState>(initialState)

  const updateState = (item: string, value: any) => {
    const newState = { ...state, [item]: value }
    setState(newState)
  }

  const pricePerSquareMeter = state.price / state.surface
  const annualRent = state.rent * 12

  const initialAnnualTax = computeAnnualTaxes(state.netAnnualRevenu, 1)

  const withLocationAnnualTax = computeAnnualTaxes((state.netAnnualRevenu + annualRent), 1)
  const taxSurplus = withLocationAnnualTax - initialAnnualTax

  const rentabiliteBrute = annualRent / state.price * 100
  const rentabiliteNet = (annualRent - taxSurplus) / state.price * 100
  const rentabiliteNetNet = (annualRent - taxSurplus) / state.price * 100

  // Pret
  const mensuality = computeMensuality(state.loanAmount, state.loanLength, state.loanRate)
  console.log(mensuality)
  const totalPaidBack = mensuality * state.loanLength * 12
  const totalLoanInterests = computeTotalLoanInterest(mensuality, state.loanLength, state.loanAmount)
  const loanInterestPerYear = totalLoanInterests / state.loanLength

  return (

    <Layout title="Renta-Immo" seoDescription="Calculez la rentabilité de votre investissement immobilier en 1 click.">

      <Container>

        <br />
        <br />
        <br />

        <Row>
          {/* BIEN: INPUT */}
          <Col xs={12} md={6}>
            <Tile height={200} title={"Bien"}>
              <SliderWithTitle
                title={"Prix"}
                unit={"€"}
                min={30000}
                max={2000000}
                onChange={e => updateState('price', Number(e.target.value))}
                value={state.price}
              />

              <SliderWithTitle
                title={"Travaux à effectuer"}
                unit={"€"}
                min={0}
                max={200000}
                onChange={e => updateState('houseBuildingWork', Number(e.target.value))}
                value={state.houseBuildingWork}
              />

              <SliderWithTitle
                title={"Surface"}
                unit={"m2"}
                min={7}
                max={300}
                onChange={e => updateState('surface', Number(e.target.value))}
                value={state.surface}
              />
              <Form.Check
                custom
                type={'checkbox'}
                id={`custom-checkbox`}
                label={`Le bien est neuf`}
                checked={state.isHouseBrandNew}
                onChange={e => updateState('isHouseBrandNew', !state.isHouseBrandNew)}
              />
            </Tile>
          </Col>

          {/* BIEN: OUTPUT */}
          <Col xs={12} md={6}>
            <Tile height={150} title={"Prix"} >
              <ClassicNumber value={Math.round(pricePerSquareMeter)} suffix={"€ / m2"} size={50} />
            </Tile>
          </Col>
        </Row>

        <br />

        <Row>

          {/* LOCATION: INPUT */}
          <Col xs={12} md={6}>
            <Tile height={260} title={"Location"}>
              <SliderWithTitle
                title={"Loyer"}
                unit={"€ / mois"}
                min={100}
                max={4000}
                onChange={e => updateState('rent', Number(e.target.value))}
                value={state.rent}
              />
              <SliderWithTitle
                title={"Frais agence"}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('agencyMensualFee', Number(e.target.value))}
                value={state.agencyMensualFee}
              />
              <SliderWithTitle
                title={"Mois sans locataire"}
                unit={"nombre"}
                min={0}
                max={12}
                onChange={e => updateState('monthsWithNoRent', Number(e.target.value))}
                value={state.monthsWithNoRent}
              />
              <SliderWithTitle
                title={"Charge du proprio"}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('ownerMensualFees', Number(e.target.value))}
                value={state.ownerMensualFees}
              />

              <SliderWithTitle
                title={"Charge récup."}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('refundableMensualFees', Number(e.target.value))}
                value={state.refundableMensualFees}
              />

            </Tile>
          </Col>

          {/* LOCATION: OUTPUT */}
          <Col xs={12} md={6}>
            <Tile height={140} title={"Rentabilite net net"} explanation={<RentabiliteNetNetExplanationModal />} >
              <ColoredNumber value={rentabiliteNetNet} suffix={"%"} />
            </Tile>
            <br />
            <Row>
              <Col xs={12} md={6}>
                <Tile height={75} title={"Brute"} explanation={<RentabiliteBruteExplanationModal />} >
                  <ClassicNumber value={Math.round(rentabiliteBrute * 100) / 100} suffix={"%"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={6}>
                <Tile height={75} title={"Net"} >
                  <ClassicNumber value={rentabiliteNet} suffix={"%"} size={30} />
                </Tile>
              </Col>
            </Row>
          </Col>

        </Row>

        <br />

        <Row>

          <Col xs={12} md={6}>


            <br />

            {/* IMPOTS */}
            <Tile height={300} title={"Impôts"}>
              <SliderWithTitle
                title={"Revenu net imposable du foyer"}
                unit={"€ / an"}
                min={10000}
                max={300000}
                onChange={e => updateState('netAnnualRevenu', Number(e.target.value))}
                value={state.netAnnualRevenu}
              />
              <Row>
                <Col xs={12} md={5}>
                  <SelectWithTitle
                    options={numberOfFiscalPeopleOptions}
                    title={"Parts fiscales"}
                    value={state.numberOfFiscalPeople}
                    onChange={value => updateState('numberOfFiscalPeople', value)}
                    explanation={<RentabiliteBruteExplanationModal />}
                  />
                </Col>
                <Col xs={12} md={7}>
                  <br />
                  <Form.Check
                    custom
                    type={'checkbox'}
                    label={`Autre revenu immo?`}
                    checked={false}
                    onChange={e => { console.log("todo") }}
                  />
                </Col>
              </Row>
            </Tile>

            <br />

            <Tile height={300} title={"Emprunt"}>
              <SliderWithTitle
                title={"Quantité empruntée"}
                unit={"€"}
                min={0}
                max={state.price}
                onChange={e => updateState('loanAmount', Number(e.target.value))}
                value={state.loanAmount}
              />
              <SliderWithTitle
                title={"Durée du prêt"}
                unit={"Années"}
                min={0}
                max={25}
                onChange={e => updateState('loanLength', Number(e.target.value))}
                value={state.loanLength}
              />
              <SliderWithTitle
                title={"Taux d'emprunt"}
                unit={"%"}
                min={0.2}
                max={8}
                onChange={e => updateState('loanRate', Number(e.target.value))}
                value={state.loanRate}
              />
            </Tile>

            <br />

            {/* FISCALITE */}
            <Tile height={300} title={"Fiscalité"}>
              <SelectWithTitle
                options={fiscalOptions}
                title={"Fiscalité"}
                value={state.fiscality}
                onChange={value => updateState('fiscality', value)}
                explanation={<RentabiliteBruteExplanationModal />}
              />
            </Tile>



          </Col>













          <Col xs={12} md={6}>


            {/* RESULT: IMPOTS */}
            <Row>
              <Col xs={12} md={6}>
                <Tile height={75} title={"Impot Initial"} explanation={<RentabiliteBruteExplanationModal />} >
                  <ClassicNumber value={Math.round(initialAnnualTax)} suffix={"€"} size={30} />
                </Tile>
                <br />
                <Tile height={75} title={"Avec location"} >
                  <ClassicNumber value={Math.round(withLocationAnnualTax)} suffix={"€"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={6}>
                <Tile height={150} title={"Différence"} >
                  <ClassicNumber value={Math.round(withLocationAnnualTax - initialAnnualTax)} suffix={"€"} size={50} />
                </Tile>
              </Col>
            </Row>

            <br />
            <br />


            {/* RESULT: PRET */}
            <Tile height={200} title={"Intéret annuel"} explanation={<RentabiliteBruteExplanationModal />} >
              <ClassicNumber value={Math.round(loanInterestPerYear)} suffix={"€"} size={50} />
            </Tile>
            <br />
            <Row>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Mensualité"} explanation={<RentabiliteBruteExplanationModal />} >
                  <ClassicNumber value={Math.round(mensuality)} suffix={"€"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Total Remboursé"} >
                  <ClassicNumber value={Math.round(totalPaidBack)} suffix={"€"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Total intérêt"} >
                  <ClassicNumber value={Math.round(totalLoanInterests)} suffix={"€"} size={30} />
                </Tile>
              </Col>
            </Row>



          </Col>
        </Row>

        <Spacing />
      </Container >

    </Layout >
  )
}

export default IndexPage
