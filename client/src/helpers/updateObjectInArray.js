export const updateObjectInArray = (array, j, cb) => {
  return array.map((item, i) => {
    if (i !== j) return item
    return cb(item)
  })
}
