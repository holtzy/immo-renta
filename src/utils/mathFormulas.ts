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

export const computeLoanTable = (amount: number, loanLength: number, rate: number) => {

    const mensualiteNumber = loanLength * 12;
    console.log("mensualityNumber", mensualiteNumber)

    const monthlyRate = Math.pow((1 + rate / 100), (1 / 12)) - 1
    console.log("monthlyRate", monthlyRate)

    const mensualiteValue =
        (amount * monthlyRate * Math.pow((1 + monthlyRate), mensualiteNumber)) /
        (Math.pow((1 + monthlyRate), (mensualiteNumber)) - 1);

    console.log("mensualiteValue", mensualiteValue)

    for (let year = 1; year <= loanLength; year++) {
        console.log("year", year)
        const interest = amount * rate / 100
        //const remaining = amount -
    }

}
