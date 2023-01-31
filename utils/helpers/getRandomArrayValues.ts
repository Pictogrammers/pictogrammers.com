const getRandomArrayValues = (arr: Array<any>, size: number): Array<any> => {
  const result = new Array(size);
  let len = arr.length;
  const taken = new Array(len);

  if (size > len) {
    throw new RangeError('getRandomArrayValues: more elements taken than available');
  }

  while (size--) {
    const x = Math.floor(Math.random() * len);
    result[size] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
};

export default getRandomArrayValues;