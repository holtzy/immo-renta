// see https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu
const taxThresholds = [
    { min: 0, max: 10084, taxValue: 0 },
    { min: 10085, max: 25710, taxValue: 11 },
    { min: 25711, max: 73516, taxValue: 30 },
    { min: 73517, max: 158122, taxValue: 41 },
    { min: 158123, max: 1000000000000000, taxValue: 45 }
]

// Prend une somme d'argent et la passe dans un barème progressif d'imposition
export const applyBaremeProgressif = (amount: number) => {
    let taxValue = 0
    taxThresholds.forEach(step => {
        const amountInStep = amount < step.min ?
            0 :
            amount > step.max ?
                step.max - step.min :
                amount - step.min;
        taxValue = taxValue + amountInStep * step.taxValue / 100
    })
    return taxValue
}

// Compute the amount of tax to pay according to the family revenu
// and the # of people composing the family
// First and Second child are counted as half an adult
// Third child is counted as an adult
// But the reduction of tax due to a child is limited to 1500 euros
// Calculation: https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu#
// Calculation with children: https://www.economie.gouv.fr/particuliers/quotient-familial
export const computeAnnualTaxes = (revenu: number, numberOfAdult: number, numberOfKid: number) => {

    // Step 0: how many "parts" are declared
    const numberofKidParts = numberOfKid > 2 ?
        0.5 + 0.5 + numberOfKid - 2 :
        numberOfKid / 2
    const numberOfParts = numberOfAdult + numberofKidParts

    // Step 1: divide the total revenue by the "nombre de parts"
    const revenuPerNumberOfPeople = revenu / numberOfParts

    // Step 2: application du barême progressif en prenant en compte les enfants & sans enfants avec plafonnement
    const baremeOutputWithKids = applyBaremeProgressif(revenuPerNumberOfPeople)
    const baremeOutputNoKids = applyBaremeProgressif(numberOfAdult) - 1570 * numberOfKid

    // Keep the worst option between both and multiply by the number of part
    return Math.max(baremeOutputWithKids, baremeOutputNoKids) * numberOfParts
}

// Found and corrected from https://www.hellopret.fr/taux-immobilier/calcul-interet-emprunt/
export const computeMensuality = (amount: number, loanLength: number, rate: number) => {
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


export const computeTaxFonciere = (rent: number) => {
    return rent
}

export const computeRentaBrut = (
    annualRent: number,
    price: number,
    initialHouseBuildingWork: number,
    notarialFee: number
) => {
    return annualRent / (price + initialHouseBuildingWork + notarialFee) * 100
}

export const computeRentaNet = (
    annualRent: number,
    price: number,
    initialHouseBuildingWork: number,
    notarialFee: number,
    agencyMensualFee: number,
    ownerMensualFees: number,
    taxeFonciere: number
) => {
    return (annualRent - 12 * agencyMensualFee - 12 * ownerMensualFees - taxeFonciere) / (price + initialHouseBuildingWork + notarialFee) * 100
}


export const computeRentaNetNet = (
    annualRent: number,
    price: number,
    initialHouseBuildingWork: number,
    notarialFee: number,
    agencyMensualFee: number,
    ownerMensualFees: number,
    taxeFonciere: number,
    taxSurplus: number,
    loanInterestPerYear: number
) => {
    return (annualRent - 12 * agencyMensualFee - 12 * ownerMensualFees - taxeFonciere - taxSurplus - loanInterestPerYear) /
        (price + initialHouseBuildingWork + notarialFee) * 100
}

