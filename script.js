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

    rsvpForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Mencegah halaman refresh

        const name = document.getElementById("sender-name").value;
        const attendance = document.getElementById("attendance").value;
        const message = document.getElementById("wish-message").value;

        // Buat elemen kartu ucapan baru
        const newWish = document.createElement("div");
        newWish.classList.add("wish-item");
        newWish.innerHTML = `
            <div class="wish-header">
                <strong>${name}</strong>
                <span class="badge">${attendance}</span>
            </div>
            <p>${message}</p>
        `;

        // Masukkan ucapan terbaru di paling atas daftar
        wishesList.prepend(newWish);

        // Kosongkan form setelah dikirim
        rsvpForm.reset();
        alert("Terima kasih atas konfirmasi dan doa restu Anda!");
    });
});