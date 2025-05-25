function toggleDark() {
  document.body.classList.toggle('dark-mode');
}

const chords = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flatMap = {
  'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
};
const reverseFlatMap = {
  'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
};

function transposeChord(chord, step) {
  const parts = chord.split('/');
  const base = parts[0];
  const bass = parts[1];

  const match = base.match(/^([A-G][b#]?)(.*)$/);
  if (!match) return chord;

  let [_, root, suffix] = match;

  // Gunakan enharmonik jika root pakai b
  if (flatMap[root]) root = flatMap[root];

  let index = chords.indexOf(root);
  if (index === -1) return chord;

  let newRoot = chords[(index + step + chords.length) % chords.length];
  if (chord.includes('b') && reverseFlatMap[newRoot]) {
    newRoot = reverseFlatMap[newRoot];
  }

  let transposed = newRoot + suffix;

  // Jika ada bass chord (slash chord)
  if (bass) {
    const bassMatch = bass.match(/^([A-G][b#]?)(.*)$/);
    if (bassMatch) {
      let bassRoot = bassMatch[1];
      if (flatMap[bassRoot]) bassRoot = flatMap[bassRoot];
      let bassIndex = chords.indexOf(bassRoot);
      if (bassIndex !== -1) {
        let newBass = chords[(bassIndex + step + chords.length) % chords.length];
        if (bass.includes('b') && reverseFlatMap[newBass]) {
          newBass = reverseFlatMap[newBass];
        }
        transposed += '/' + newBass + bassMatch[2];
      }
    }
  }

  return transposed;
}
function transpose(step) {
  const chordArea = document.getElementById("chordArea");
  const originalText = chordArea.innerText;

  const regex = /?([A-G][#b]?(?:m|maj7|m7|7|sus2|sus4|dim|aug|add\d*)?(?:\/[A-G][#b]?)?)?/g;

  const transposedText = originalText.replace(regex, (match, chord) => {
    const newChord = transposeChord(chord, step);
    return `<span class="chord">${newChord}</span>`;
  });

  chordArea.innerHTML = transposedText;  // Gunakan innerHTML agar tag <span> diterapkan
}


function highlightChords() {
  const chordArea = document.getElementById("chordArea");
  const originalText = chordArea.innerText;

  const regex = /?([A-G][#b]?(?:m|maj7|m7|7|sus2|sus4|dim|aug|add\d*)?(?:\/[A-G][#b]?)?)?/g;

  const highlighted = originalText.replace(regex, (match, chord) => {
    return `<span class="chord">${chord}</span>`;
  });

  chordArea.innerHTML = highlighted;
}

// Jalankan saat halaman dimuat
window.onload = highlightChords;

let currentFontSize = 16;

function changeFontSize(change) {
  currentFontSize += change;
  document.getElementById("chordArea").style.fontSize = currentFontSize + "px";
}

function toggleDark() {
  document.body.classList.toggle("dark-mode");
  document.querySelector("header").classList.toggle("dark-mode");
  document.getElementById("chordArea").classList.toggle("dark-mode");
}


  const searchInput = document.getElementById("searchInput");
  const songItems = document.querySelectorAll(".song-item");

  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    songItems.forEach(function (item) {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(keyword) ? "block" : "none";
    });
  });




  const laguData = [
  { judul: "Neka paksa bail", artis: "Dcibal", file: "lagu1.html" },
  { judul: "Toe sala mo", artis: "Dcibal", file: "lagu2.html" },
  { judul: "Toe cahir daku nai", artis: "Nana ranu", file: "lagu3.html" },
  { judul: "Pergilah Kasih", artis: "Chrisye", file: "lagu4.html" },
  { judul: "Hati-hati di Jalan", artis: "Tulus", file: "lagu5.html" },
];

function cariLagu() {
  const input = document.getElementById("searchInput").value.toLowerCase().trim();
  const hasilDiv = document.getElementById("hasilPencarian");
  hasilDiv.innerHTML = ""; // bersihkan hasil sebelumnya

  const hasil = laguData.filter(item =>
    item.judul.toLowerCase().includes(input) ||
    item.artis.toLowerCase().includes(input)
  );

  if (hasil.length > 0) {
    hasil.forEach(item => {
      const div = document.createElement("div");
      div.className = "song-item";
      div.innerHTML = `${item.artis} - ${item.judul}`;
      div.onclick = () => window.location.href = item.file;
      hasilDiv.appendChild(div);
    });
  } else {
    hasilDiv.innerHTML = "<p>Lagu atau artis tidak ditemukan.</p>";
  }
}

  