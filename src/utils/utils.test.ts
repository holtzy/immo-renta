import {
    applyBaremeProgressif,
    getNbrDeParts,
    computeAnnualTaxes
} from './mathFormulas'

// Example found on https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#:~:text=Le%20couple%20dispose%20de%203,en%203%20%3D%2018%20650%20%E2%82%AC.&text=Tranche%20de%20revenu%2010%20085,%25%20%3D%20942%2C15%20%E2%82%AC.
describe("apply Bareme Progressif", () => {
  it("revenu = 0 ", () => {
    const value = applyBaremeProgressif(0)
    expect(value).toEqual(0)
  }),
  it("Example 1 from economie.gouv", () => {
    const value = applyBaremeProgressif(32000)
    expect(value).toEqual(3605.45)
  }),
  it("Example 2 from economie.gouv", () => {
    const value = applyBaremeProgressif(18650)
    expect(value).toEqual(942.15)
  })
})

describe("Compute Nbr de Part", () => {
  it("1 adult = 1 part", () => {
    const value = getNbrDeParts(1,0)
    expect(value).toEqual(1)
  }),
  it("1 adult + 1 kid = 1.5 part", () => {
    const value = getNbrDeParts(1,1)
    expect(value).toEqual(1.5)
  }),
  it("2 adult + 4 kid = 5 part", () => {
    const value = getNbrDeParts(2,4)
    expect(value).toEqual(5)
  })
})


describe("Compute Annual Tax", () => {
  it("0 revenue = 0 tax", () => {
    const value = computeAnnualTaxes(0,2,7)
    expect(value).toEqual(0)
  }),
  it("Example 1 from economie.gouv", () => {
    const value = computeAnnualTaxes(32000, 1, 0)
    expect(value).toEqual(3605.45)
  }),
  it("Example 2 from economie.gouv", () => {
    const value = computeAnnualTaxes(55950, 2, 2)
    expect(value).toEqual(2826.45)
  })
  it("Example 1 from economie.gouv avec plaffonement quotient", () => {
    const value = computeAnnualTaxes(100000, 2, 4)
    expect(value).toEqual(11730.900000000001)
  })
})
