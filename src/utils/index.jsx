const generateColorByScore = (score) => {
  if (score < 4) return "rgba(255,100,100)";
  if (score > 4 && score < 7) return "#f4d92d";
  return "#90C8AC";
};

const generateFeedback = (score) => {
  if (score < 4) {
    return "Semangat belajar lagi ya, aku yakin kamu pasti bisa.";
  }
  if (score > 4 && score < 7) {
    return "Masih harus ditingkatkan lagi belajarnya, tetap semangat!";
  }
  return "Wah, hasil kamu sudah bagus. Pertahankan progress kamu.";
};

export { generateColorByScore, generateFeedback };
