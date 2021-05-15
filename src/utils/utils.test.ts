import {
    applyBaremeProgressif
} from './mathFormulas'

// Example found on https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#:~:text=Le%20couple%20dispose%20de%203,en%203%20%3D%2018%20650%20%E2%82%AC.&text=Tranche%20de%20revenu%2010%20085,%25%20%3D%20942%2C15%20%E2%82%AC.
describe("applyBaremeProgressif", () => {
    it("computes correctly", () => {
      const value = applyBaremeProgressif(32000)
      expect(value).toEqual(3605.45)
    })
  })

