// Fast implementation. Consider using Momentjs

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const useTwoDigitsNumber = (number) => {
  return number < 10
    ? `0${number}`
    : `${number}`
}

const parseMinutes = useTwoDigitsNumber
const parseHours = useTwoDigitsNumber

export function timestampToDate(timestamp){
  const d = new Date(timestamp)

  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} ${parseHours(d.getHours())}:${parseMinutes(d.getMinutes())}`
}
