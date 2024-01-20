export default function timestampConverter(timestamp) {
  // crop the timestamp to get only the date
  const date = timestamp.slice(0, 10)
  // split the date into an array
  const dateArray = date.split('-')
  // reverse the array
  const reversedDateArray = dateArray.reverse()
  // join the array into a string
  const dateString = reversedDateArray.join('.')
  // return the string
  return dateString
}


