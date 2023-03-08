// Get News Categories from API
const newsCategories = async() => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}
// All Category option has been displayed
const displayCategories = (categories) => {
    const categoryList = document.getElementById('category-list');
    categories.forEach((category) => {
        const p = document.createElement('p');
        p.innerHTML = `
        <span onclick="getCategoryNews('${category.category_id}')">${category.category_name}</span>
        `
        categoryList.appendChild(p);
    })
}
// Get Specific News Category from API
const getCategoryNews = async(categoryId) => {
    toggleSpinner(true); // start spinning
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}
// Display All News from specific category
const displayNews = (allNews) => {
    // Update news counting number
    const newsCounting = document.getElementById('news-counting');
    newsCounting.innerHTML = `
        <P class="mb-0">${allNews.length} news has been found.</P>
    `
    const cardsContainer = document.getElementById('cardsContainer');
    cardsContainer.textContent = ``;
    if(allNews.length > 0){
        allNews.forEach(news => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', 'mb-3', 'p-3', 'rounded-3', 'border-0');
            cardDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-3">
                    <img class="rounded-3 w-100" src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body ps-4">
                        <h5 class="card-title">${news.title}</h5>
                        <p class="card-text">${news.details.slice(0, 420)}...</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <!-- Author -->
                            <div class="author d-flex align-items-center">
                                <img class="author-image" src="${news.author.img}" alt="">
                                <p  class="mb-0 ms-2">${news.author.name ? news.author.name : 'Not Found'}</p>
                            </div>
                            <!-- Views -->
                            <div class="views d-flex align-items-center">
                                <i class="fa-solid fa-eye"></i>
                                <p class="mb-0 ms-2">${news.total_view ? news.total_view + 'M' : 'Not Found'}</p>
                            </div>
                            <!-- Details -->
                            <div class="details">
                                <button type="button" class="btn text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            `
            cardsContainer.appendChild(cardDiv);
        })
        toggleSpinner(false); // stop spinning
    }else{
        cardsContainer.innerHTML = `
        <p class='text-danger text-center fs-1 fw-bold'>No news available in this category.</p>
        `
        toggleSpinner(false); // stop spinning
    }
}
// Spinner Toggle Function
const toggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if(isLoading){
        spinner.classList.remove('d-none');
    }else{
        spinner.classList.add('d-none');
    }
}

newsCategories();