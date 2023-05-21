function timeStampToString(startDate: number, endDate: number) {
  return `${new Date(startDate).toLocaleDateString()} - ${new Date(
    endDate
  ).toLocaleDateString()}`;
}

export default timeStampToString;
