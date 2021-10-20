export function setsLocalStorageDB(newDB) {
  localStorage.setItem('questionDB', JSON.stringify(newDB))
}

export function getLocalStorageDB() {
  const data = JSON.parse(localStorage.getItem('questionDB'))
  console.log(data)
  return data
}
