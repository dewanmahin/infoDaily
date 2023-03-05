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
        console.log(category.category_name)
        const p = document.createElement('p');
        p.onclick = ex;
        p.innerText = `${category.category_name}`
        categoryList.appendChild(p);
    })
}

const ex = () => {
    alert("hello")
}

newsCategories();