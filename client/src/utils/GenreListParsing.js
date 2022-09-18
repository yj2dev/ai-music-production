import { genreOfKR } from "./Translate";

function GenreListParsing(list) {
  const result = [];
  const fileName = Object.keys(list)[0];
  const _list = list[fileName];

  Object.keys(_list).forEach((key) => {
    console.log("Keys >> ", key, _list[key]);
    const keySplitDot = key.split(".");
    keySplitDot.pop(); // 확장명 제거
    const genre = genreOfKR(keySplitDot[0]);
    const name = keySplitDot.slice(1, keySplitDot.length).join("");
    const similarity = (_list[key] * 100).toFixed(2);
    result.push({ genre, name, similarity });
  });

  return result;
}

export default GenreListParsing;
