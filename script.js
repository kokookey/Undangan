document.addEventListener("DOMContentLoaded", function() {
    // 1. LOGIKA BUKA UNDANGAN
    const openBtn = document.getElementById("open-btn");
    const cover = document.getElementById("cover");
    const mainContent = document.getElementById("main-content");

    openBtn.addEventListener("click", function() {
        mainContent.classList.remove("hidden");
        cover.classList.add("cover-slide-up");
        setTimeout(() => {
            cover.style.display = "none";
        }, 800);
    });

    // 2. LOGIKA COUNTDOWN TIMER
    // Ubah tanggal pernikahan di bawah ini (Format: Month Day, Year HH:MM:SS)
    const weddingDate = new Date("Dec 19, 2026 10:00:00").getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

        if (distance < 0) {
            clearInterval(timer);
            document.querySelector(".countdown-box").innerHTML = "<p>Acara Sedang Berlangsung / Telah Selesai</p>";
        }
    }, 1000);

    // 3. LOGIKA FORM RSVP & DOA UCAPAN
    const rsvpForm = document.getElementById("rsvp-form");
    const wishesList = document.getElementById("wishes-list");
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzRvYvo7LgU5cYt3YutaD-QMwqX6qoQd7xJpxXURMi-0iQBFwReL26sVvCdnIeqVTFM/exec';

    rsvpForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Mengirim data ke Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(rsvpForm) })
        .then(response => {
            alert('Terima kasih! Konfirmasi dan ucapan Anda telah tersimpan.');
            rsvpForm.reset();
        })
        .catch(error => console.error('Error!', error.message));
});
});
