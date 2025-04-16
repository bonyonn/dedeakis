// ------------------------
// LAYER 1: PUZZLE
// ------------------------

const title = document.getElementById("title");   
const finalText = "RAHASIA NEGARA";
const chars = "!@#$%^&*()_+=-{}[]|:;'<>,.?/ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function randomChar() {
  return chars[Math.floor(Math.random() * chars.length)];
}

function animateTitleLoop() {
  let index = 0;

  const interval = setInterval(() => {
    const display = finalText
      .split("")
      .map((char, i) => {
        if (i < index) return finalText[i];
        return randomChar();
      })
      .join("");

    title.textContent = display;

    index++;
    if (index > finalText.length) clearInterval(interval);
  }, 100);

  setTimeout(animateTitleLoop, 3000); // loop animasi setiap 3 detik
}

// mulai animasi pertama
animateTitleLoop();

// Fungsi validasi input puzzle
function checkPuzzle() {
  const input = document.getElementById("puzzleInput").value
    .toLowerCase()
    .replace(/\s/g, '');

  const correctAnswers = ["dedeakis", "dede akis"];
  const warning = document.getElementById("warning");
  const successMessage = document.getElementById("successMessage");
  const overlay = document.getElementById("transitionOverlay");

  if (correctAnswers.includes(input)) {
    warning.classList.add("hidden");
    successMessage.classList.remove("hidden");

    // Munculkan overlay hitam setelah 2 detik
    setTimeout(() => {
      overlay.classList.remove("hidden");
      overlay.classList.add("show");
    }, 2000);

    // Arahkan ke halaman berikutnya setelah transisi
    setTimeout(() => {
      window.location.href = "halaman-lanjut.html";
    }, 3500);
  } else {
    warning.classList.remove("hidden");
  }
}

// ------------------------
// LAYER 2: QUIZ KEMESRAAN PASANGAN
// ------------------------

// ==== LAYER 2: KUIS KEMESRAAN PASANGAN ====
const quizData = [
  { q: "Tim sepak bola favorit?", a: "Manchester United" },
  { q: "Tim eSports favorit?", a: "RRQ" },
  { q: "Hobi?", a: "Main game, nonton" },
  { q: "Tanggal lahir?", a: "7 Desember 2000" },
  { q: "Tempat date apa yang pengen dikunjungi?", a: "Museum date" },
  { q: "Makanan favorit?", a: "Ayam Geprek" },
  { q: "Jumlah kucing?", a: "3" },
  { q: "Genre film favorit?", a: "Horor" },
  { q: "Apa yang bikin aku tertarik sama kamu?", a: "Pintar dan pengertian" },
  { q: "Apa yang jadi prioritas aku diantara kamu, RRQ, ML, streaming?", a: "Kamu, RRQ, ML, streaming" }
];

// Fungsi submit quiz
function submitQuiz() {
  let score = 0;

  quizData.forEach((item, index) => {
    const selected = document.querySelector(`select[name="q${index + 1}"]`).value;
    if (selected && selected === item.a) score++;
  });

  let feedback = "", emoticon = "";

  if (score >= 9) {
    feedback = "Kamu tahu aku luar dalam. Gak nyangka bisa sekompak ini. Salut!";
    emoticon = "💖";
  } else if (score >= 6) {
    feedback = "Lumayan ngerti, tapi masih banyak yang kamu lewatin. Perhatiin lagi, ya.";
    emoticon = "😊";
  } else if (score >= 3) {
    feedback = "Kita udah lama deket, tapi kamu masih banyak gak tahu soal aku. Sedikit kecewa sih.";
    emoticon = "😬";
  } else {
    feedback = "Kamu beneran pernah deket sama aku gak sih? Yang kamu isi barusan nyakitin juga sebenernya.";
    emoticon = "💔";
  }

  const modal = document.createElement("div");
  modal.className = "result-modal";
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Hasil Kuis</h2>
      <p><strong>Skor:</strong> ${score}/10</p>
      <p><strong>Emotikon:</strong> ${emoticon}</p>
      <p>${feedback}</p>
      <button id="nextStageBtn">Lanjut ke Stage Selanjutnya</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("nextStageBtn").addEventListener("click", () => {
    window.location.href = "layer3.html";
  });

  fetch("https://script.google.com/macros/s/AKfycbxYwTv2HGnCSjgWTcZMtTxl3V4a6p1VUtHLkzJRypVAQBdHpI2hqFajjAjEol-ZgIq3HA/exec", {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: {
        nama: "Dede Akis ❤️",
        skor: `${score}/10`,
        emotikon: emoticon,
        kalimat: feedback
      }
    })
  });
}