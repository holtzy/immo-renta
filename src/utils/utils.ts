export const formatNumberWithThousands = (num: number) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

export const formatNumberWithoutThousands = (num: string) => {
    return Number(num.replace(' ', ''))
}
