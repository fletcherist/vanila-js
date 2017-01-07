function gcd (a, b) {
  while (a !== b) {
    if (a > b) {
      a -= b
    } else {
      b -= a
    }
  }
  return a
}

function gcd2 (a, b) {
  if (a === 0) {
    return b
  } else {
    return gcd2(b % a, b)
  }
}

function binarySearch (array, searchValue) {
  let low = 0
  let high = array.length
  let middle = Math.floor((low + high) / 2)

  while (low <= high) {
    if (searchValue === array[middle]) {
      return middle
    } else if (searchValue > array[middle]) {
      low = middle + 1
    } else {
      high = middle -1
    }
  }

  return -1
}

function sort (array) {
  for (let i = 0; i < array.length -1; i++) {
    for (let e = i + 1; e < array.length; e++) {
      if (array[i] > array[e]) {
        let tmp = array[i]
        array[i] = array[e]
        array[e] = tmp
      }
    }
  }

  return array
}

function arrayShuffle (array) {
  let i = array.length
  while (i > 1) {
    i = i - 1
    let j = Math.floor(Math.random() * array.length)
    const tmp = array[i]
    array[i] = array[j]
    array[j] = tmp
  }

  return array
}


