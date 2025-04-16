document.addEventListener('DOMContentLoaded', () => {
    const envelopeContainer = document.getElementById("envelopeContainer");
    const envelopeSeal = document.getElementById("envelopeSeal");
    const question = document.getElementById("question");
    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const sweetMessage = document.getElementById("sweetMessage");
    const music = document.getElementById("backgroundMusic");
    const muteBtn = document.getElementById("muteBtn");
    const heartsContainer = document.getElementById("heartsContainer");
    const nextBtn = document.getElementById("nextBtn");
    const floatingPhoto = document.getElementById("floatingPhoto");

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart';
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
        heartsContainer.appendChild(heart);
    }

    muteBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        muteBtn.textContent = music.muted ? "Unmute Musik" : "Mute Musik";
    });

    music.play().catch(err => {
        console.log("Autoplay diblokir:", err);
        const autoplayMessage = document.createElement("div");
        autoplayMessage.className = "autoplay-message";
        autoplayMessage.innerHTML = `<p>Klik di mana saja untuk memutar musik 🎵</p>`;
        document.body.appendChild(autoplayMessage);
        document.body.addEventListener("click", () => {
            music.play().then(() => {
                autoplayMessage.remove();
            }).catch(err => {
                console.error("Gagal muter musik:", err);
            });
        }, { once: true });
    });

    music.addEventListener('error', (e) => {
        console.error("Gagal muat musik:", e);
        alert("Maaf, musik gagal dimuat. Pastikan file 'boba_date.mp3' ada di folder yang benar.");
    });

    envelopeSeal.addEventListener("click", () => {
        envelopeContainer.classList.add("closing");
        setTimeout(() => {
            envelopeContainer.classList.add("hidden");
            question.classList.remove("hidden");
            question.classList.add("show");
        }, 1300);
    });

    yesBtn.addEventListener("click", () => {
        question.style.opacity = "0";
        setTimeout(() => {
            question.classList.add("hidden");
            const popup = document.createElement("div");
            popup.className = "popup";
            popup.innerHTML = `
                <p>Horeee!!! Dede Akis masih mau sama aku!!! 😭❤️ Aku janji gak bakal nyebelin (tapi boong dikit 😜)</p>
                <button id="closePopupBtn">Next</button>
            `;
            document.body.appendChild(popup);
            document.getElementById("closePopupBtn").addEventListener("click", closePopup);
        }, 500);
    });

    noBtn.addEventListener("click", () => {
        const maxX = window.innerWidth - noBtn.offsetWidth - 40;
        const maxY = window.innerHeight - noBtn.offsetHeight - 40;
        const newX = Math.max(40, Math.min(maxX, Math.random() * maxX));
        const newY = Math.max(40, Math.min(maxY, Math.random() * maxY));
        noBtn.style.position = "absolute";
        noBtn.style.left = newX + "px";
        noBtn.style.top = newY + "px";
        noBtn.style.transition = "all 0.3s ease";

        const noMessagePopup = document.createElement("div");
        noMessagePopup.className = "no-message-popup";
        noMessagePopup.innerHTML = `<p>Yakin ga sayang? 😏</p>`;
        document.body.appendChild(noMessagePopup);
        setTimeout(() => {
            noMessagePopup.remove();
        }, 2000);
    });

    function closePopup() {
        document.querySelector(".popup").remove();
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
        sweetMessage.classList.remove("hidden");
        sweetMessage.style.display = "block";
        sweetMessage.style.opacity = "1";

        if (nextBtn) {
            nextBtn.classList.remove("hidden");
            nextBtn.style.display = "inline-block";
        }

        if (floatingPhoto) {
            floatingPhoto.classList.add("show");
        }
    }
});
