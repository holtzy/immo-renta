// see https://www.economie.gouv.fr/particuliers/tranches-imposition-impot-revenu
const taxThresholds = [
    { min: 0, max: 10084, taxValue: 0 },
    { min: 10085, max: 25710, taxValue: 11 },
    { min: 25711, max: 73516, taxValue: 30 },
    { min: 73517, max: 158122, taxValue: 41 },
    { min: 158123, max: 1000000000000000, taxValue: 45 }
]

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
