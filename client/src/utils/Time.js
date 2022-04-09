// 초를 분, 초 포맷으로 변경
// EX) 85 -> 01:25
export const MMSSFormat = (value) => {
  let min = parseInt(value / 60);
  min = min < 10 ? `0${min}` : `${min}`;
  let sec = value % 60;
  sec = sec < 10 ? `0${sec}` : `${sec}`;
  return `${min}:${sec}`;
};
