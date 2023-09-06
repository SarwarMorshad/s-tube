// console.log("connected");
const handleCategory = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const categories = data.data;
  // console.log(categories);
  displayCategoryButton(categories);
};

const displayCategoryButton = (categories) => {
  const tabContainer = document.getElementById("tab-container");
  categories.forEach((category) => {
    // console.log(category);
    const div = document.createElement("div");
    div.innerHTML = `
      <div>
      <a onclick="loadCategory('${category.category_id}')" class="tab mb-4">
      <button class="btn bg-[#25252533] text-black w-20 normal-case hover:bg-[#FF1F3D]">${category.category}</button>
      </a>
      </div>
      `;
    tabContainer.appendChild(div);
  });
};

let catId = null;
const loadCategory = async (categoryId) => {
  // console.log(categoryId);
  catId = categoryId;
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await response.json();
  cardInfo = data.data;
  // console.log(cardInfo);
  // sortByView(cardInfo);
  loadCards(cardInfo);
};

handleCategory();
