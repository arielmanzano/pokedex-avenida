export const parseId = (id) => {
    if (id > 99) return `${id}`
    if (id < 99 && id > 9) return `0${id}`
    if (id <= 9) return `00${id}`
}

export const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}