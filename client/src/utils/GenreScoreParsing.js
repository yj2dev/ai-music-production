function GenreScoreParsing(score) {
  const result = [
    { name: "발라드", value: score["ballad"] },
    { name: "댄스", value: score["dance"] },
    { name: "랩/힙합", value: score["hiphop"] },
    { name: "트로트", value: score["trot"] },
  ];

  const totalValue = result
    .map((v) => v.value)
    .reduce((prev, curr) => prev + curr, 0);

  result[0].value = parseFloat(
    ((score["ballad"] / totalValue) * 100).toFixed(2)
  );
  result[1].value = parseFloat(
    ((score["dance"] / totalValue) * 100).toFixed(2)
  );
  result[2].value = parseFloat(
    ((score["hiphop"] / totalValue) * 100).toFixed(2)
  );
  result[3].value = parseFloat(((score["trot"] / totalValue) * 100).toFixed(2));

  return result;
}

export default GenreScoreParsing;
