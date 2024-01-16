document.addEventListener('DOMContentLoaded', function () {
  const websiteList = document.getElementById('websiteList');
  const overallStatus = document.getElementById('overallStatus');
  const weatherInfo = document.getElementById('weatherInfo');


  const discordWebhookUrl = 'https://discord.com/api/webhooks/1169690186188329062/wedbSk-slQN_TIgN2DKa2dcLMll6d_8QVs_z3SNaXT8co-ryHTWkcrTrLYjl0tbYbXKY';

  const websites = [
    { name: 'Telco 07 web ', url: 'https://telco4507web.vercel.app/' },
    { name: 'Typicalsleepingboy Web ', url: 'https://typicalsleepingboy.vercel.app/' },
    { name: 'Typicalsleepingboy Status ', url: 'https://typicalsleepingboystatuss.vercel.app/' },
    { name: 'LMS Telkom University ', url: 'https://lms.telkomuniversity.ac.id/' },
    { name: 'Web Igracias Telkom ', url: 'https://igracias.telkomuniversity.ac.id/' },
    { name: 'Web Smk Telkom Mks ', url: 'https://smktelkom-mks.sch.id/' },
    { name: 'Web JKT48 ', url: 'https://jkt48.com' },
    { name: 'Web Showroom JKT48 ', url: 'https://dc.crstlnz.my.id/' },
    { name: 'Web IDN Live ', url: 'https://www.idn.app/' },
    { name: 'Typ API ', url: 'https://midtrans.com/' },
    { name: 'Monggo DB ', url: 'https://cloud.mongodb.com/v2#/org/629c5b7d3b7f3f4171b4cee4/' },
    { name: 'Monggo DB status ', url: 'https://status.mongodb.com/' },
    { name: 'Weather Api ', url: 'https://api.openweathermap.org/data/2.5/weather?q=567f7e49b5b7c272971e1b485921d392'},
  ];

    // SCRIPT UNTUK WEBSITENYA//

  const delayBetweenRequests = 2000;
  let allWebsitesOnline = true;

  async function doCORSRequest(url) {
    try {
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking website status:', error);
      return false;
    }
  }


    // SCRIPT UNTUK KIRIM NOTIFIKASI DISCORD/

  async function sendDiscordNotification(title, description, color) {
    const payload = {
      embeds: [
        {
          title,
          description,
          color,
          footer: {
            text: 'Powered by ♥️ Typicalsleepingboy',
          },
        },
      ],
    };
  

    try {
      const response = await fetch(discordWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Gagal mengirim notifikasi ke discord: ${response.status}`);
      }
    } catch (error) {
      console.error('Error mengirim notifikasi ke discord:', error);
    }
  }

  async function updateStatus(websiteName, isOnline) {
    const websiteElement = document.createElement('div');
    websiteElement.className = 'website';

    if (isOnline) {
      websiteElement.innerHTML = `<strong>${websiteName}:</strong> <span class="online">Online 🟢</span>`;

      // Send Discord notification when a website is back online
      if (!allWebsitesOnline) {
        const onlineTitle = `Website Back Online: ${websiteName} 🟢`;
        const onlineDescription = `Website ${websiteName} is now back online. Good news!`;
        const onlineColor = 0x00ff00; // Green color for online status
        sendDiscordNotification(onlineTitle, onlineDescription, onlineColor);
      }
    } else {
      allWebsitesOnline = false;

      // Send Discord notification when a website is down
      const downTitle = `Website Down: ${websiteName} 🔴`;
      const downDescription = `Website ${websiteName} is currently down. We will fix it soon.`;
      const downColor = 0xff5733; // Orange color for down status
      sendDiscordNotification(downTitle, downDescription, downColor);

      websiteElement.innerHTML = `<strong>${websiteName}:</strong> <span class="offline">Offline 🔴</span>`;
    }

    websiteList.appendChild(websiteElement);
  }

  async function checkAllWebsites() {
    websiteList.innerHTML = '';

    for (const website of websites) {
      const isOnline = await doCORSRequest(website.url);
      updateStatus(website.name, isOnline);
      await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
    }

    overallStatus.textContent = allWebsitesOnline
      ? 'Semua Website Sedang Aktif 🟢'
      : 'Ada salah satu website yang down 🔴';
    overallStatus.className = allWebsitesOnline ? 'overall-status online' : 'overall-status offline';
  }


  // SCRIPT UNTUK API WEATHER//

  async function fetchWeather() {
    const apiKey = '567f7e49b5b7c272971e1b485921d392';
    const locations = ['Lengkong', 'Dago', 'Makassar', 'Ciwidey', 'Bojongsoang'];
    const randomLocation = locations[Math.floor(Math.random() * locations.length)];
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${randomLocation}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Data request tidak falid pada status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.main || !data.main.temp || !data.weather || !data.weather[0] || !data.weather[0].description) {
        throw new Error('Format data tidak falid');
      }

      const temperature = data.main.temp;
      const description = data.weather[0].description;

      // Update weatherInfo innerHTML to include the title, location, and weather details
      weatherInfo.innerHTML = `
        <h2>Informasi cuaca ☁️</h2>
        <p>Cuaca sekarang di ${randomLocation} : ${description}</p>
        <p>Temperature: ${temperature} °C</p>
        <p1>NOTE : Data cuaca akan selalu di update setiap 7 detik</p1>
      `;
    } catch (error) {
      console.error('Gagal mendapatkan data cuaca dari api', error);
    }
  }

  setInterval(() => {
    fetchWeather();
  }, 7000);

  checkAllWebsites();
  fetchWeather();

    // SCRIPT UNTUK KLIK KANAN//

  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert("yaaa kamu pasti mau nyuri yaaa, kasihan tidak bisa🆘🥱🥱🥱🥱🥱🥱🆘 \n\n\n made by ♥️ Typicalsleepingboy");
  });

  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
      e.preventDefault();
      alert("yaaa kamu pasti mau nyuri yaaa, kasihan tidak bisa🆘🥱🥱🥱🥱🥱🥱🆘 \n\n\n made by ♥️ Typicalsleepingboy");
    }
  });
});