document.addEventListener("DOMContentLoaded", function () {
  const websiteList = document.getElementById("websiteList");
  const overallStatus = document.getElementById("overallStatus");
  

  const websites = [
    { name: "Telco 07 web ", url: "https://telco4507web.vercel.app/" },
    {
      name: "Typicalsleepingboy Web ",
      url: "https://typicalsleepingboy.vercel.app/",
    },
    {
      name: "Typicalsleepingboy Status ",
      url: "https://typicalsleepingboystatuss.vercel.app/",
    },
    {
      name: "LMS Telkom University ",
      url: "https://lms.telkomuniversity.ac.id/",
    },
    {
      name: "Web Igracias Telkom ",
      url: "https://igracias.telkomuniversity.ac.id/",
    },
    { name: "Web Smk Telkom Mks ", url: "https://smktelkom-mks.sch.id/" },
    { name: "Web JKT48 ", url: "https://jkt48.com" },
    { name: "Web Showroom JKT48 ", url: "https://dc.crstlnz.my.id/" },
    { name: "Web IDN Live ", url: "https://www.idn.app/" },
    { name: "Typ API ", url: "https://midtrans.com/" },
    {
      name: "Monggo DB ",
      url: "https://cloud.mongodb.com/v2#/org/629c5b7d3b7f3f4171b4cee4/",
    },
    { name: "Monggo DB status ", url: "https://status.mongodb.com/" },
    {
      name: "Weather Api ",
      url: "https://api.openweathermap.org/data/2.5/weather?q=567f7e49b5b7c272971e1b485921d392",
    },
  ];

  // SCRIPT UNTUK WEBSITENYA//

  async function doCORSRequest(url) {
    try {
      const response = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      );
      return response.ok;
    } catch (error) {
      console.error("Error checking website status:", error);
      return false;
    }
  }

  async function updateStatus(websiteName, isOnline) {
    const websiteElement = document.createElement("div");
    websiteElement.className = "website";

    if (isOnline) {
      websiteElement.innerHTML = `<strong>${websiteName}:</strong> <span class="online">Online 🟢</span>`;
    } else {
      websiteElement.innerHTML = `<strong>${websiteName}:</strong> <span class="offline">Offline 🔴</span>`;
    }

    websiteList.appendChild(websiteElement);
  }

  async function checkAllWebsites() {
    websiteList.innerHTML = "";

    for (const website of websites) {
      const isOnline = await doCORSRequest(website.url);
      const storedStatus = getStoredStatus(website.name);

      if (isOnline !== storedStatus) {
        const statusTitle = isOnline
          ? `Website Back Online: ${website.name} 🟢`
          : `Website Down: ${website.name} 🔴`;
        const statusDescription = isOnline
          ? `Website ${website.name} is now back online. Good news!`
          : `Website ${website.name} is currently down. We will fix it soon.`;
        const statusColor = isOnline ? 0x00ff00 : 0xff5733;

        sendDiscordNotification(statusTitle, statusDescription, statusColor);
      }

      updateStatus(website.name, isOnline);
      setStoredStatus(website.name, isOnline);
    }

    const allWebsitesOnline = websites.every((website) =>
      getStoredStatus(website.name)
    );

    overallStatus.textContent = allWebsitesOnline
      ? "Semua Website Sedang Aktif 🟢"
      : "Ada salah satu website yang down 🔴";
    overallStatus.className = allWebsitesOnline
      ? "overall-status online"
      : "overall-status offline";
  }


  setInterval(() => {
    fetchWeather();
  }, 7000);

  async function updateCard() {
    checkAllWebsites();
    fetchWeather();
  }

  updateCard();
  setInterval(updateCard, 200000);
});


const script = document.createElement("script");
script.src = "/script page/NotifDiscord.js";
document.head.appendChild(script);

const weatherScript = document.createElement("script");
weatherScript.src = "/script page/WeatherApi.js";
document.head.appendChild(weatherScript);

const DontuseScript = document.createElement("script");
DontuseScript.src = "/script page/dontuse.js";
document.head.appendChild(DontuseScript);





























