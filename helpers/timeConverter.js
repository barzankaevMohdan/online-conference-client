import moment from 'moment'

export const getMinutes = (str) => {
  return moment.duration(str).asMinutes()
}

export const toStringTime = (time, timeFormat) => {
  return moment.utc(time).format(timeFormat)
}

export const getCurrentTime = (timeFormat) => {
  return moment().format(timeFormat)
}
