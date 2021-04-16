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
  NewVsOldHouseExplanationModal,
  InterestRateExplanationModal,
  PartFiscalExplanationModal
} from "../components/ExplanationModals"

import { AreaChart } from "../viz/AreaChart"

import {
  computeTaxFonciere,
  computeAnnualTaxes,
  computeMensuality,
  computeTotalLoanInterest,
  computeRentaBrut,
  computeRentaNet,
  computeRentaNetNet
} from '../utils/mathFormulas'
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
  fiscality: "meuble",
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

  console.log("numberOfFiscalPeople", state.numberOfFiscalPeople)
  // Taxes
  const initialAnnualTax = computeAnnualTaxes(state.netAnnualRevenu, state.numberOfFiscalPeople)
  const initialTMI = initialAnnualTax / state.netAnnualRevenu * 100
  const loyerImposable =
    state.fiscality === "nonMeubleMicro" ?
      annualRent * 0.7 :
      state.fiscality === "meuble" ?
        annualRent * 0.5 :
        annualRent
  const withLocationAnnualTax = computeAnnualTaxes((state.netAnnualRevenu + loyerImposable), state.numberOfFiscalPeople)
  const taxSurplus = withLocationAnnualTax - initialAnnualTax
  const withLocationTMI = withLocationAnnualTax / (state.netAnnualRevenu + loyerImposable) * 100

  // Loan
  const mensuality = computeMensuality(state.loanAmount, state.loanLength, state.loanRate)
  const totalPaidBack = mensuality * state.loanLength * 12
  const totalLoanInterests = computeTotalLoanInterest(mensuality, state.loanLength, state.loanAmount)
  const loanInterestPerYear = totalLoanInterests / state.loanLength

  // Rentability
  const rentabiliteBrute = computeRentaBrut(annualRent, state.price, state.initialHouseBuildingWork, notarialFee)
  const rentabiliteNet = computeRentaNet(annualRent, state.price, state.initialHouseBuildingWork, notarialFee, state.agencyMensualFee, state.ownerMensualFees, state.taxeFonciere)
  const rentabiliteNetNet = computeRentaNetNet(annualRent, state.price, state.initialHouseBuildingWork, notarialFee, state.agencyMensualFee, state.ownerMensualFees, state.taxeFonciere, taxSurplus, loanInterestPerYear)


  // Tiles
  const houseInputTile = (
    <Tile title={"Bien"}>
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
  )

  const houseOutputBigTile = (
    <div>
      <Row >
        <Col xs={12} md={6}>
          <Tile title={"Prix au m²"} >
            <ClassicNumber
              value={formatNumberWithThousands(Math.round(pricePerSquareMeter))}
              suffix={"€/m²"}
              size={40} />
          </Tile>
        </Col>
        <Col xs={12} md={6}>
          <Tile title={"Frais de notaire"} >
            <ClassicNumber
              value={formatNumberWithThousands(Math.round(notarialFee))}
              suffix={"€"}
              size={40} />
          </Tile>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <Tile title={"Prix total"} >
            <ClassicNumber
              value={formatNumberWithThousands(Math.round(totalPrice))}
              suffix={"€"}
              size={40} />
          </Tile>
        </Col>
        <Col xs={12} md={6}>

        </Col>
      </Row>
    </div>
  )

  const houseOutputSmallTile = (
    <Tile title={""} hasBorder>
      <div className={"result-explanation-text"}>
        <span>&rarr; Le prix total de votre bien s'élève à </span>
        <span><code>{formatNumberWithThousands(Math.round(totalPrice))}</code></span>
        <span> euros. Il inclut </span>
        <span><code>{formatNumberWithThousands(Math.round(notarialFee))}</code></span>
        <span> euros de frais de notaire. Cela représente </span>
        <span><code>{formatNumberWithThousands(Math.round(pricePerSquareMeter))}</code></span>
        <span> euros par m2.</span>
      </div>
    </Tile>
  )

  const loanInputTile = (
    <Tile title={"Emprunt"}>
      <SliderWithTitle
        title={"Quantité empruntée"}
        unit={"€"}
        min={0}
        max={totalPrice}
        onChange={e => updateState('loanAmount', formatNumberWithoutThousands(e.target.value))}
        value={state.loanAmount}
      />
      <SliderWithTitle
        title={"Apport"}
        unit={"€"}
        min={0}
        max={totalPrice}
        onChange={e => updateState('loanAmount', totalPrice - formatNumberWithoutThousands(e.target.value))}
        value={totalPrice - state.loanAmount}
      />
      <SliderWithTitle
        title={"Durée du prêt"}
        unit={"Années"}
        min={1}
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
        explanation={<InterestRateExplanationModal />}
      />
    </Tile>
  )

  const loanOutputBigTile = (
    <div>
      <Tile title={"Intéret annuel"} explanation={<RentabiliteBruteExplanationModal />} >
        <ClassicNumber value={formatNumberWithThousands(Math.round(loanInterestPerYear))} suffix={"€"} size={50} />
      </Tile>
      <Row>
        <Col xs={12} md={4}>
          <Tile title={"Mensualité"} explanation={<RentabiliteBruteExplanationModal />} >
            <ClassicNumber value={formatNumberWithThousands(Math.round(mensuality))} suffix={"€"} size={30} />
          </Tile>
        </Col>
        <Col xs={12} md={4}>
          <Tile title={"Total Remboursé"} >
            <ClassicNumber value={formatNumberWithThousands(Math.round(totalPaidBack))} suffix={"€"} size={30} />
          </Tile>
        </Col>
        <Col xs={12} md={4}>
          <Tile title={"Total intérêt"} >
            <ClassicNumber value={formatNumberWithThousands(Math.round(totalLoanInterests))} suffix={"€"} size={30} />
          </Tile>
        </Col>
      </Row>
    </div>
  )

  const loanOutputSmallTile = (
    <Tile title={""} hasBorder>
      {state.loanAmount === 0 ?
        (<div className={"result-explanation-text"}>
          <span>&rarr; Pas besoin d'emprunt pour financer votre achat? Veinard! </span>
          <span>😛</span>
          <span>. Sinon, renseignez les champs ci-dessus.</span>
        </div>) :
        (<div className={"result-explanation-text"}>
          <span>&rarr; Pour rembourser votre prêt de </span>
          <span><code>{state.loanAmount}</code></span>
          <span> vous paierez des mensualités de </span>
          <span><code>{formatNumberWithThousands(Math.round(mensuality))}</code></span>
          <span> euros. Au final c'est </span>
          <span><code>{formatNumberWithThousands(Math.round(totalPaidBack))}</code></span>
          <span> euros que vous rembourserez à la banque.</span>
        </div>)
      }
    </Tile>
  )

  const taxInputTile = (
    <Tile title={"Impôts"}>
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
        onChange={e => updateState('numberOfFiscalPeople', e.target.value)}
        explanation={<PartFiscalExplanationModal />}
      />
      <Form.Check
        custom
        type={'checkbox'}
        label={`Autre revenu immo?`}
        checked={false}
        onChange={e => { console.log("todo") }}
      />
    </Tile>
  )

  const taxOutputBigTile = (
    <div>
      <Tile title={"Impot Initial"} explanation={<RentabiliteBruteExplanationModal />} >
        <EvolutionNumber
          valueBefore={formatNumberWithThousands(Math.round(initialAnnualTax))}
          valueAfter={formatNumberWithThousands(Math.round(withLocationAnnualTax))}
          suffix={"€"}
          size={30} />
      </Tile>
      <Tile title={"Taux moyen d'imposion (TMI)"} explanation={<RentabiliteBruteExplanationModal />} >
        <EvolutionNumber
          valueBefore={Math.round(initialTMI * 100) / 100}
          valueAfter={Math.round(withLocationTMI * 100) / 100}
          suffix={"%"}
          size={30} />
      </Tile>
      <Tile title={"Surplus d'împot"} >
        <ClassicNumber value={Math.round(withLocationAnnualTax - initialAnnualTax)} suffix={"€"} size={50} />
      </Tile>
    </div>
  )

  const taxOutputSmallTile = (
    <Tile title={""} hasBorder>
      <div className={"result-explanation-text"}>
        <span>&rarr; Votre taux d'imposition moyen est de </span>
        <span><code>{Math.round(initialTMI * 100) / 100}</code></span>
        <span>%. Au total, vous payez </span>
        <span><code>{formatNumberWithThousands(Math.round(initialAnnualTax))}</code></span>
        <span> euros d'împot par an. Attention, la location d'un logement va probablement faire augmenter cette somme!</span>
      </div>
    </Tile>
  )

  const fiscalityInputTile = (
    <div>
      <Row>
        <Col xs={12} md={6}>
          <p>La fiscalité est un élément clé de votre projet immobilier. Veuillez choisir votre option privilégiée ci contre.
          </p>
          <Form.Group>
            <SelectWithTitle
              title={"Fiscalité"}
              onChange={e => updateState('fiscality', e.target.value)}
              options={fiscalOptions}
            />
          </Form.Group >
        </Col>
      </Row>
    </div>
  )

  const fiscalityOutputSmallTile = (
    <Tile title={""} hasBorder>
      <div className={"result-explanation-text"}>
        <span>&rarr; About fiscality mate </span>
        <span><code>{state.loanAmount}</code></span>
        <span> Et voila ce qu'il se passe </span>
        <span><code>{formatNumberWithThousands(Math.round(mensuality))}</code></span>
      </div>
    </Tile>
  )

  const locationInputTile = (
    <Tile title={"Location"}>
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
  )

  const locationOutputBigTile = (
    <div>
      <Tile title={"Rentabilite nette nette"} explanation={<RentabiliteNetNetExplanationModal />} >
        <ColoredNumber value={Math.round(rentabiliteNetNet * 100) / 100} suffix={"%"} />
      </Tile>
      <br />
      <Row>
        <Col xs={12} md={6}>
          <Tile title={"Brute"} explanation={<RentabiliteBruteExplanationModal />} >
            <ClassicNumber value={Math.round(rentabiliteBrute * 100) / 100} suffix={"%"} size={30} />
          </Tile>
        </Col>
        <Col xs={12} md={6}>
          <Tile title={"Nette de charge"} >
            <ClassicNumber value={Math.round(rentabiliteNet * 100) / 100} suffix={"%"} size={30} />
          </Tile>
        </Col>
      </Row>
    </div>
  )

  const locationOutputSmallTile = (
    <Tile title={""} hasBorder>
      <div className={"result-explanation-text"}>
        <span>&rarr; Vos loyers rapportent </span>
        <span><code>{annualRent}€</code></span>
        <span> par an, soit une rentabilité brute de </span>
        <span><code>{Math.round(rentabiliteBrute * 100) / 100}%</code></span>
        <span>. Une fois les différentes charges prises en compte, la rentabilité nette nette s'élève à </span>
        <span><code>{Math.round(rentabiliteNetNet * 100) / 100}%</code></span>
        <span>.</span>
      </div>
    </Tile>
  )


  const rentabilityEvolutionTile = (
    <Tile title={"Evolution de la rentabilité"} hasBorder>
      <AreaChart data="hello" />
    </Tile>
  )

  return (

    <Layout title="Immo Renta" seoDescription="Calculez la rentabilité de votre investissement immobilier en 1 click.">

      {/* All Inputs */}
      <Container>
        <br /><br /><br />
        <Row>
          <Col xs={12} md={6}>
            {houseInputTile}
            {houseOutputSmallTile}
            <br /><hr /><br />
            {loanInputTile}
            {loanOutputSmallTile}
          </Col>

          <Col xs={12} md={6}>
            {taxInputTile}
            {taxOutputSmallTile}
            <br /><hr /><br />
            {locationInputTile}
            {locationOutputSmallTile}
          </Col>
        </Row>
      </Container>

      {/* Fiscality input */}
      <div className={"highlighted-section"} >
        <Container >
          <Row>
            {fiscalityInputTile}
          </Row>
        </Container>
      </div>

      {/* Results */}
      <Container>

        <hr />
        <br /><br />

        {/* Results */}
        <Row>
          <Col xs={12} md={6}>
            {locationOutputBigTile}
          </Col>
          <Col xs={12} md={6}>
            {rentabilityEvolutionTile}
          </Col>
        </Row>



        <Spacing />
      </Container >

    </Layout >
  )
}

export default IndexPage
