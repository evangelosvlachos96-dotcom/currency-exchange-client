const formatDate = (date) => {
  const mongoDate = new Date(date)
  const formattedDate = `${mongoDate.getFullYear()}-${(mongoDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${mongoDate.getDate().toString().padStart(2, '0')}`
  return formattedDate
}

export { formatDate }
