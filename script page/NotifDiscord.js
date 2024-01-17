
// API FILE//
const discordWebhookUrl = "https://discord.com/api/webhooks/1197047484783001734/Yu8cqwlNwdfsKJWnEikZJg_7XGGcahu1-tpNa4vUrwH2koD9qx8f444MdIhgIpDhR3Mq";
// API FILE//

function getStoredStatus(websiteName) {
    const storedStatus = localStorage.getItem(`status_${websiteName}`);
    return storedStatus === "true";
}

function setStoredStatus(websiteName, status) {
    localStorage.setItem(`status_${websiteName}`, status);
}

async function sendDiscordNotification(title, description, color) {
    const payload = {
        embeds: [
            {
                title,
                description,
                color,
                footer: {
                    text: "Powered by ♥️ Typicalsleepingboy",
                },
            },
        ],
    };

    try {
        const response = await fetch(discordWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Gagal mengirim notifikasi ke discord: ${response.status}`);
        }
    } catch (error) {
        console.error("Error mengirim notifikasi ke discord:", error);
    }
}