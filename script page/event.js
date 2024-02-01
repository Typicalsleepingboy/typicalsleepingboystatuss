document.addEventListener("DOMContentLoaded", async function () {
    const eventInfo = document.getElementById("eventInfo");

    async function fetchEventData() {
        const apiUrl = `https://api.crstlnz.my.id/api/next_schedule`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Gagal untuk mendapat data di api event. Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching event data:", error);
        }
    }

    function displayEvents(events) {
        eventInfo.innerHTML = "";

        events.forEach((event) => {
            const eventContainer = document.createElement("div");
            eventContainer.classList.add("event-container");
            const newsImage = document.createElement("img");

            const eventTitle = document.createElement("h3");
            eventTitle.textContent = event.title;

            const eventjudul = document.createElement("h2");
            eventjudul.textContent = "Pertujukan theater🎦: ";

            const eventDescription = document.createElement("p");
            eventDescription.textContent = event.description;

            const eventDate = document.createElement("h1");
            const date = new Date(event.date);
            eventDate.textContent = `Date: ${date.toLocaleDateString()}`;

            newsImage.src = `https://res.cloudinary.com/haymzm4wp/image/upload/assets/jkt48${event.label}`;
            newsImage.alt = "News Image";

            const eventLink = document.createElement("a");
            eventLink.href = event.url;
            eventLink.target = "_blank";
            eventLink.textContent = "More Info❕ ";

            eventContainer.appendChild(newsImage);
            eventContainer.appendChild(eventjudul);
            eventContainer.appendChild(eventDate);
            eventContainer.appendChild(eventTitle);
            
            eventContainer.appendChild(eventLink);
            eventContainer.appendChild(eventDescription);

            eventInfo.appendChild(eventContainer);
        });
    }

    const eventData = await fetchEventData();
    displayEvents(eventData);
});
