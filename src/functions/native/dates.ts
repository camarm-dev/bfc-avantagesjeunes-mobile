
const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]

function readableDate(dateString: string) {
    const readableDate = new Date(dateString)
    return `${readableDate.getDate()} ${months[readableDate.getMonth()]} ${readableDate.getFullYear()}`
}

export {
    readableDate
}