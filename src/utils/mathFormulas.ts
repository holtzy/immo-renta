// see https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu
const taxThresholds = [
    { min: 0, max: 10084, taxValue: 0 },
    { min: 10085, max: 25710, taxValue: 11 },
    { min: 25711, max: 73516, taxValue: 30 },
    { min: 73517, max: 158122, taxValue: 41 },
    { min: 158123, max: 1000000000000000, taxValue: 45 }
]

// Compute the amount of tax to pay according to the family revenu
// and the # of people composing the family
export const computeAnnualTaxes = (revenu: number, numberOfPeople: number) => {

    let taxValue = 0

    const revenuPerNumberOfPeople = revenu / numberOfPeople

    taxThresholds.forEach(step => {
        const amountInStep = revenuPerNumberOfPeople < step.min ?
            0 :
            revenuPerNumberOfPeople > step.max ?
                step.max - step.min :
                revenuPerNumberOfPeople - step.min;

        taxValue = taxValue + amountInStep * step.taxValue / 100
    })

    return taxValue * numberOfPeople

}

// Found and corrected from https://www.hellopret.fr/taux-immobilier/calcul-interet-emprunt/
export const computeMensuality = (amount: number, loanLength: number, rate: number) => {
    console.log(amount, loanLength, rate)
    const mensualityNumber = loanLength * 12;
    const monthlyRate = Math.pow((1 + rate / 100), (1 / 12)) - 1
    const mensualityValue =
        (amount * monthlyRate * Math.pow((1 + monthlyRate), mensualityNumber)) /
        (Math.pow((1 + monthlyRate), (mensualityNumber)) - 1);
    return mensualityValue
}

export const computeTotalLoanInterest = (mensuality: number, loanLength: number, amount: number) => {
    return (mensuality * loanLength * 12) - amount
}

export const computeNetNetRentability = (fiscalityType: string, annualRent: number, taxSurplus: number) => {

    // Forbidden if annualRent > 15000
    if (fiscalityType === "nonMeubleMicro") {
        return (annualRent * 0.7)

    }
}

export const computeTaxFonciere = (rent: number) => {
    return rent
}
