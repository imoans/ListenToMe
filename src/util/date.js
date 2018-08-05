// @flow

export const getStartOfDayISOString = (date: Date = new Date()) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDay()).toISOString()
}

export const getMDFormat = (date: Date = new Date()) => {
  return `${date.getMonth() + 1}/${date.getDay()}`
}
