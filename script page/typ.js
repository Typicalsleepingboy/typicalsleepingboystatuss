document.addEventListener('DOMContentLoaded', function () {
  const websiteList = document.getElementById('websiteList');
  const overallStatus = document.getElementById('overallStatus');

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
  ];

  const delayBetweenRequests = 2000;

  async function doCORSRequest(url) {
    try {
      const response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking website status:', error);
      return false;
    }
  }

  function updateStatus(websiteName, isOnline) {
    const websiteElement = document.createElement('div');
    websiteElement.className = 'website';
    websiteElement.innerHTML = `<strong>${websiteName}:</strong> ${isOnline ? '<span class="online">Online 🟢</span>' : '<span class="offline">Offline 🔴</span>'}`;

    websiteList.appendChild(websiteElement);

    // Update overall status
    if (!isOnline) {
      allWebsitesOnline = false;
    }
  }

  let allWebsitesOnline = true;

  async function checkAllWebsites() {
    websiteList.innerHTML = ''; // Clear previous elements

    for (const website of websites) {
      const isOnline = await doCORSRequest(website.url);
      updateStatus(website.name, isOnline);

      // Add a delay between requests
      await new Promise(resolve => setTimeout(resolve, delayBetweenRequests));
    }

    // Update overall status card
    overallStatus.textContent = allWebsitesOnline ? 'Semua Website Sedang Aktif 🟢' : 'Ada salah satu website yang down 🔴';
    overallStatus.className = allWebsitesOnline ? 'overall-status online' : 'overall-status offline';
  }

  // Check status every 30 seconds (adjust as needed)
  setInterval(checkAllWebsites, 30000);

  // Check status when the page is loaded
  checkAllWebsites();

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