function toggleTextInStringArray(text: string, arr: string[]) {
  if (arr.includes(text)) {
    return arr.filter((el) => el !== text);
  }
  return [...arr, text];
}

export default toggleTextInStringArray;