document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById("newsList");
    const currentPageElement = document.getElementById("currentPage");
    let currentPage = 1;
    let totalPages = 1538;
    const itemsPerPage = 5;

    async function fetchNews(page) {
        const newsEndpoint = `https://api.crstlnz.my.id/api/news?page=${page}&pageSize=${itemsPerPage}`;

        try {
            const response = await fetch(newsEndpoint);
            const data = await response.json();

            if (data.news) {
                displayNews(data.news);
            } else {
                console.error("Gagal mendapatkan berita dari Api crstlnz");
            }
        } catch (error) {
            console.error("Error fetching news data:", error);
        }
    }

    function displayNews(articles) {
        newsList.innerHTML = "";
    
        articles.forEach((article) => {
            const newsItem = document.createElement("li");
            const newsImage = document.createElement("img");
            
    
            newsImage.src = `https://res.cloudinary.com/haymzm4wp/image/upload/assets/jkt48${article.label}`;
            newsImage.alt = "News Image";
    
            newsItem.appendChild(newsImage);

            const newsDate = document.createElement("p"); 
            const articleDate = new Date(article.date); 
            newsDate.textContent = articleDate.toLocaleDateString(); 
            newsItem.appendChild(newsDate);
    
            const newsInfo = document.createElement("div");
            newsInfo.className = "news-info";
    
            const newsTitle = document.createElement("a");
            newsTitle.href = article.url;
            newsTitle.target = "_blank";
            newsTitle.textContent = article.title;
    
            newsInfo.appendChild(newsTitle);
    
    

            newsItem.appendChild(newsInfo);
    
            newsList.appendChild(newsItem);
        });
    }
    

    function updatePagination() {
        currentPageElement.textContent = currentPage;
        document.getElementById("prevPageBtn").disabled = currentPage === 1;
        document.getElementById("nextPageBtn").disabled = currentPage === totalPages;
    }

    window.changePage = function (offset) {
        currentPage += offset;
        if (currentPage < 1) {
            currentPage = 1;
        }
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        fetchNews(currentPage);
        updatePagination();
    };

    fetchNews(currentPage);
});