import * as React from "react"

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import Tile from "../components/Tile";
import { SliderWithTitle } from "../components/SliderWithTitle";
import { SelectWithTitle } from "../components/SelectWithTitle";
import { ColoredNumber } from "../components/ColoredNumber";
import { ClassicNumber, EvolutionNumber } from "../components/ClassicNumber";
import Layout from "../components/Layout";
import Spacing from "../components/Spacing";
import {
  RentabiliteBruteExplanationModal,
  RentabiliteNetNetExplanationModal,
  NewVsOldHouseExplanationModal
} from "../components/ExplanationModals"

import { computeTaxFonciere, computeAnnualTaxes, computeMensuality, computeTotalLoanInterest, computeNetNetRentability } from '../utils/mathFormulas'
import { formatNumberWithThousands, formatNumberWithoutThousands } from '../utils/utils'


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
  initialHouseBuildingWork: number;
  annualHouseBuildingWork: number;
  netAnnualRevenu: number;
  numberOfFiscalPeople: number;
  loanAmount: number;
  loanLength: number;
  loanRate: number;
  taxeFonciere?: number;
}

const initialState: InitialState = {
  surface: 40,
  price: 98000,
  rent: 400,
  fiscality: "nonMeubleMicro",
  monthsWithNoRent: 1,
  agencyMensualFee: 0,
  ownerMensualFees: 100,
  refundableMensualFees: 100,
  isHouseBrandNew: false,
  initialHouseBuildingWork: 0,
  annualHouseBuildingWork: 0,
  netAnnualRevenu: 60000,
  numberOfFiscalPeople: 2,
  loanAmount: 0,
  loanLength: 20,
  loanRate: 1.5,
}
initialState.taxeFonciere = initialState.rent

const fiscalOptions = [
  { value: 'meuble', label: 'Meublé non professionel' },
  { value: 'nonMeubleMicro', label: 'Non meublé - frais réel' },
  { value: 'nonMeubleReel', label: 'Non meublé - micro-foncier' }
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


const IndexPage = () => {

  // States
  const [state, setState] = React.useState<InitialState>(initialState)
  const updateState = (item: string, value: any) => {
    const newState = { ...state, [item]: value }
    // Some variables of the state potentially need to be autocomputed
    if (isTaxeFonciereAutoComputed) {
      newState.taxeFonciere = computeTaxFonciere(state.rent) // todo how to compute this?
    }
    setState(newState)
  }
  const [isTaxeFonciereAutoComputed, setIsTaxeFonciereAutoComputed] = React.useState(true)

  // Values computed from state
  const pricePerSquareMeter = state.price / state.surface
  const annualRent = Number(state.rent) * 12 - state.rent * state.monthsWithNoRent
  const notarialFee = state.isHouseBrandNew ? state.price * 4 / 100 : state.price * 8 / 100
  const totalPrice = state.price + notarialFee + state.initialHouseBuildingWork

  // Taxes
  const initialAnnualTax = computeAnnualTaxes(state.netAnnualRevenu, state.numberOfFiscalPeople)
  const initialTMI = initialAnnualTax / state.netAnnualRevenu * 100
  const loyerImposable = state.fiscality === "nonMeubleMicro" ?
    annualRent * 0.7 :
    state.fiscality === "meuble" ?
      annualRent * 0.5 :
      annualRent
  const withLocationAnnualTax = computeAnnualTaxes((state.netAnnualRevenu + loyerImposable), state.numberOfFiscalPeople)
  const taxSurplus = withLocationAnnualTax - initialAnnualTax
  const withLocationTMI = withLocationAnnualTax / (state.netAnnualRevenu + loyerImposable) * 100

  // Rentability
  const rentabiliteBrute = annualRent / (state.price + state.initialHouseBuildingWork + notarialFee) * 100
  const rentabiliteNet = (annualRent - 12 * state.agencyMensualFee - 12 * state.ownerMensualFees - state.taxeFonciere) / state.price * 100
  const rentabiliteNetNet = computeNetNetRentability(state.fiscality, annualRent, taxSurplus)

  // Loan
  const mensuality = computeMensuality(state.loanAmount, state.loanLength, state.loanRate)
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
            <Tile height={290} title={"Bien"}>
              <SliderWithTitle
                title={"Prix"}
                unit={"€"}
                min={30000}
                max={2000000}
                onChange={e => updateState('price', formatNumberWithoutThousands(e.target.value))}
                value={state.price}
              />
              <SliderWithTitle
                title={"Travaux à l'achat"}
                unit={"€"}
                min={0}
                max={200000}
                onChange={e => updateState('initialHouseBuildingWork', formatNumberWithoutThousands(e.target.value))}
                value={state.initialHouseBuildingWork}
              />
              <SliderWithTitle
                title={"Travaux d'entretien estimés"}
                unit={"€/an"}
                min={0}
                max={10000}
                onChange={e => updateState('annualHouseBuildingWork', formatNumberWithoutThousands(e.target.value))}
                value={state.annualHouseBuildingWork}
              />
              <SliderWithTitle
                title={"Surface"}
                unit={"m²"}
                min={7}
                max={300}
                onChange={e => updateState('surface', formatNumberWithoutThousands(e.target.value))}
                value={state.surface}
              />
              <SliderWithTitle
                title={"Taxe foncière"}
                unit={"€/an"}
                min={0}
                max={10000}
                onChange={e => updateState('taxeFonciere', formatNumberWithoutThousands(e.target.value))}
                value={Math.round(state.taxeFonciere)}
                disabled={isTaxeFonciereAutoComputed}
                hasAutoEstimate
                onAutoEstimateChange={e => {
                  // If I switch to auto estimate, I have to estimate the tax!
                  if (!isTaxeFonciereAutoComputed) {
                    updateState('taxeFonciere', computeTaxFonciere(state.rent))
                  }
                  setIsTaxeFonciereAutoComputed(!isTaxeFonciereAutoComputed)
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Check
                  custom
                  type={'checkbox'}
                  id={`custom-checkbox`}
                  label={`Le bien est neuf`}
                  checked={state.isHouseBrandNew}
                  onChange={e => updateState('isHouseBrandNew', !state.isHouseBrandNew)}
                />
                <NewVsOldHouseExplanationModal />
              </div>
            </Tile>
          </Col>

          {/* BIEN: OUTPUT LARGE SCREEN */}
          <Col xs={12} md={6} className={"d-none d-xs-none d-sm-none d-md-block"}>
            <Row >
              <Col xs={12} md={6}>
                <Tile height={121} title={"Prix au m²"} >
                  <ClassicNumber
                    value={formatNumberWithThousands(Math.round(pricePerSquareMeter))}
                    suffix={"€/m²"}
                    size={40} />
                </Tile>
              </Col>
              <Col xs={12} md={6}>
                <Tile height={121} title={"Frais de notaire"} >
                  <ClassicNumber
                    value={formatNumberWithThousands(Math.round(notarialFee))}
                    suffix={"€"}
                    size={40} />
                </Tile>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Tile height={121} title={"Prix total"} >
                  <ClassicNumber
                    value={formatNumberWithThousands(Math.round(totalPrice))}
                    suffix={"€"}
                    size={40} />
                </Tile>
              </Col>
              <Col xs={12} md={6}>

              </Col>
            </Row>
          </Col>

          {/* BIEN: OUTPUT SMALL SCREEN */}
          <Col xs={12} md={6} className={"d-xs-block d-sm-block d-md-none"}>
            <Tile height={90} title={""} >
              <p>
                <span>&rarr; Le prix total de votre bien s'élève à </span>
                <span><code>{formatNumberWithThousands(Math.round(totalPrice))}</code></span>
                <span> euros. Il inclut </span>
                <span><code>{formatNumberWithThousands(Math.round(notarialFee))}</code></span>
                <span> euros de frais de notaire. Cela représente </span>
                <span><code>{formatNumberWithThousands(Math.round(pricePerSquareMeter))}</code></span>
                <span> euros par m2.</span>
              }
              </p>
            </Tile>
          </Col>
        </Row>


        <br />
        <br />
        <br />


        <Row>
          {/* EMPRUNT: INPUT*/}
          <Col xs={12} md={6}>
            <Tile height={190} title={"Emprunt"}>
              <SliderWithTitle
                title={"Quantité empruntée"}
                unit={"€"}
                min={0}
                max={state.price}
                onChange={e => updateState('loanAmount', formatNumberWithThousands(e.target.value))}
                value={state.loanAmount}
              />
              <SliderWithTitle
                title={"Durée du prêt"}
                unit={"Années"}
                min={0}
                max={25}
                onChange={e => updateState('loanLength', formatNumberWithThousands(e.target.value))}
                value={state.loanLength}
              />
              <SliderWithTitle
                title={"Taux d'emprunt"}
                unit={"%"}
                min={0.2}
                max={8}
                onChange={e => updateState('loanRate', formatNumberWithThousands(e.target.value))}
                value={state.loanRate}
              />
            </Tile>
          </Col>

          {/* EMPRUNT: OUTPUT BIG SCREEN*/}
          <Col xs={12} md={6} className={"d-none d-xs-none d-sm-none d-md-block"}>
            <Tile height={75} title={"Intéret annuel"} explanation={<RentabiliteBruteExplanationModal />} >
              <ClassicNumber value={formatNumberWithThousands(Math.round(loanInterestPerYear))} suffix={"€"} size={50} />
            </Tile>
            <Row>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Mensualité"} explanation={<RentabiliteBruteExplanationModal />} >
                  <ClassicNumber value={formatNumberWithThousands(Math.round(mensuality))} suffix={"€"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Total Remboursé"} >
                  <ClassicNumber value={formatNumberWithThousands(Math.round(totalPaidBack))} suffix={"€"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={4}>
                <Tile height={75} title={"Total intérêt"} >
                  <ClassicNumber value={formatNumberWithThousands(Math.round(totalLoanInterests))} suffix={"€"} size={30} />
                </Tile>
              </Col>
            </Row>
          </Col>

          {/* EMPRUNT: OUTPUT SMALL SCREEN */}
          <Col xs={12} md={6} className={"d-xs-block d-sm-block d-md-none"}>
            <Tile height={90} title={""} >
              {state.loanAmount === 0 ?
                (<p>
                  <span>&rarr; Pas besoin d'emprunt pour financer votre achat? Veinard! </span>
                  <span>😛</span>
                  <br />
                  <span>Sinon, renseignez les champs ci-dessus.</span>
                </p>) :
                (<p>
                  <span>&rarr; Pour rembourser votre prêt de </span>
                  <span><code>{state.loanAmount}</code></span>
                  <span> vous paierez des mensualités de </span>
                  <span><code>{formatNumberWithThousands(Math.round(mensuality))}</code></span>
                  <span> euros. Au final c'est </span>
                  <span><code>{formatNumberWithThousands(Math.round(totalPaidBack))}</code></span>
                  <span> euros que vous rembourserez à la banque.</span>
                </p>)
              }
            </Tile>
          </Col>
        </Row>


        <br />
        <br />

        <Row>
          {/* IMPOTS: INPUT*/}
          <Col xs={12} md={6}>
            <Tile height={300} title={"Impôts"}>
              <SliderWithTitle
                title={"Revenu net imposable"}
                unit={"€/an"}
                min={10000}
                max={300000}
                onChange={e => updateState('netAnnualRevenu', formatNumberWithoutThousands(e.target.value))}
                value={state.netAnnualRevenu}
              />

              <SelectWithTitle
                options={numberOfFiscalPeopleOptions}
                title={"Parts fiscales"}
                value={state.numberOfFiscalPeople}
                onChange={choice => updateState('numberOfFiscalPeople', choice.value)}
                explanation={<RentabiliteBruteExplanationModal />}
              />
              <Form.Check
                custom
                type={'checkbox'}
                label={`Autre revenu immo?`}
                checked={false}
                onChange={e => { console.log("todo") }}
              />
            </Tile>
          </Col>

          {/* IMPOTS: OUTPUT*/}
          <Col xs={12} md={6}>
            <Tile height={75} title={"Impot Initial"} explanation={<RentabiliteBruteExplanationModal />} >
              <EvolutionNumber
                valueBefore={formatNumberWithThousands(Math.round(initialAnnualTax))}
                valueAfter={formatNumberWithThousands(Math.round(withLocationAnnualTax))}
                suffix={"€"}
                size={30} />
            </Tile>
            <Tile height={75} title={"Taux moyen d'imposion (TMI)"} explanation={<RentabiliteBruteExplanationModal />} >
              <EvolutionNumber
                valueBefore={Math.round(initialTMI * 100) / 100}
                valueAfter={Math.round(withLocationTMI * 100) / 100}
                suffix={"%"}
                size={30} />
            </Tile>
            <Tile height={75} title={"Surplus d'împot"} >
              <ClassicNumber value={Math.round(withLocationAnnualTax - initialAnnualTax)} suffix={"€"} size={50} />
            </Tile>
          </Col>
        </Row>

        <br />
        <br />
        <br />


        {/* FISCALITE: OUTPUT*/}
        <Row>
          <Col xs={12} md={6}>
            <Tile height={110} title={"Fiscalité"}>
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
            <Tile height={110} title={"Fiscalité"}>
            </Tile>
          </Col>
        </Row>


        <br />
        <br />
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
                onChange={e => updateState('rent', formatNumberWithoutThousands(e.target.value))}
                value={state.rent}
              />
              <SliderWithTitle
                title={"Frais agence"}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('agencyMensualFee', formatNumberWithoutThousands(e.target.value))}
                value={state.agencyMensualFee}
              />
              <SliderWithTitle
                title={"Mois sans locataire"}
                unit={"nombre"}
                min={0}
                max={12}
                onChange={e => updateState('monthsWithNoRent', formatNumberWithoutThousands(e.target.value))}
                value={state.monthsWithNoRent}
              />
              <SliderWithTitle
                title={"Charge du proprio"}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('ownerMensualFees', formatNumberWithoutThousands(e.target.value))}
                value={state.ownerMensualFees}
              />

              <SliderWithTitle
                title={"Charge récup."}
                unit={"€ / mois"}
                min={0}
                max={1000}
                onChange={e => updateState('refundableMensualFees', formatNumberWithoutThousands(e.target.value))}
                value={state.refundableMensualFees}
              />

            </Tile>
          </Col>

          {/* LOCATION: OUTPUT */}
          <Col xs={12} md={6}>
            <Tile height={140} title={"Rentabilite nette nette"} explanation={<RentabiliteNetNetExplanationModal />} >
              <ColoredNumber value={Math.round(rentabiliteNetNet * 100) / 100} suffix={"%"} />
            </Tile>
            <Row>
              <Col xs={12} md={6}>
                <Tile height={75} title={"Brute"} explanation={<RentabiliteBruteExplanationModal />} >
                  <ClassicNumber value={Math.round(rentabiliteBrute * 100) / 100} suffix={"%"} size={30} />
                </Tile>
              </Col>
              <Col xs={12} md={6}>
                <Tile height={75} title={"Nette de charge"} >
                  <ClassicNumber value={Math.round(rentabiliteNet * 100) / 100} suffix={"%"} size={30} />
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
