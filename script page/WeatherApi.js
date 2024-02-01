
async function fetchWeather() {
    const apiKey = "567f7e49b5b7c272971e1b485921d392";
    const locations = [
        "Lengkong",
        "Dago",
        "Makassar",
        "Ciwidey",
        "Bojongsoang",
        "London",
        "Jakarta",
    ];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${randomLocation}&appid=${apiKey}&units=metric&lang=id`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Data request tidak falid pada status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.main || !data.main.temp || !data.weather || !data.weather[0] || !data.weather[0].description) {
            throw new Error("Format data tidak falid");
        }

        const temperature = data.main.temp;
        const description = data.weather[0].description;

        // Update weatherInfo innerHTML to include the title, location, and weather details
        const weatherInfo = document.getElementById("weatherPage");
        weatherInfo.innerHTML = `
    <h2>Informasi cuaca ☁️</h2>
    <p>Cuaca sekarang di ${randomLocation} : ${description}</p>
    <p>Temperature: ${temperature} °C</p>
    <p1>NOTE : Data cuaca akan selalu di update setiap 7 detik</p1>`;
    } catch (error) {
        console.error("Gagal mendapatkan data cuaca dari api", error);
    }
}

