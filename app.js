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

const getCategoryNews = async(id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
}

newsCategories();