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

const loadCards = (cardInfo) => {
  const cardContainer = document.getElementById("card-container");
  const videoContainer = document.getElementById("video-container");
  cardContainer.innerHTML = "";
  videoContainer.innerHTML = "";
  if (cardInfo.length === 0) {
    const div = document.createElement("div");
    videoContainer.innerHTML = `
      <center>
      <img src="images/Icon.png" alt="Shoes" class="pt-40"/>
      <h1 class="pt-16 text-4xl text-[#171717] font-bold ">Oops!! Sorry, There is no content here</h2>
      </center>
      `;
    videoContainer.appendChild(div);
  }

  cardInfo.forEach((videoInfo) => {
    // console.log(videoInfo.others.posted_date);
    const verified = videoInfo.authors[0].verified;
    // console.log(verified);

    const totalMinutes = parseInt(videoInfo.others?.posted_date);
    /* const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60; */

    // const days = Math.floor(totalMinutes / 1440); // 1440 minutes in a day (24 hours * 60 minutes)
    const hours = Math.floor((totalMinutes % 1440) / 60);
    const minutes = totalMinutes % 60;

    // console.log(hours, minutes);

    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card card-compact w-auto mt-8 pt-0 bg-base-100 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
      <figure><img src="${videoInfo?.thumbnail}" alt="Shoes" class="w-full h-[200px]" /></figure>
      <div class="${isNaN(totalMinutes) ? "invisible" : "visible"}">
        <div class="ml-[195px] md:ml-[140px] lg:ml-[140px] -mt-10  w-56 text-right ">
        <p class="px-2 py-1 bg-[#171717]  text-white rounded-lg">${hours} hours ${minutes} minutes ago</p>
        </div>
      </div>
      <div class="card-body">
        
          <div class="flex justify-start items-center pl-4">
            <div class="avatar pr-4">
              <div class="w-14 rounded-full">
                <img src="${videoInfo?.authors[0]?.profile_picture}" />
              </div>
            </div>
            <div>
              <h2 class="card-title">${videoInfo?.title}</h2>
            </div>
          </div>
          <div class="flex justify-start items-center gap-2">
            <div>
              <h2 class="pl-4 font-normal">${videoInfo?.authors[0]?.profile_name}</h2>
            </div>
            <div class="${verified === true ? "visible" : "invisible"}">
              <p><i class="fa-solid fa-circle-check" style="color: #1fd13d;"></i></p>
            </div>
          </div>
          <h2 class="pl-4">${videoInfo?.others.views} Views</h2>
  
      </div>
    </div>
      `;

    cardContainer.appendChild(div);
  });

  // console.log(videoInfo);
};

const blogHandle = () => {
  window.location.href = "blog.html";
};

const sortByView = async (cardInfo) => {
  if (!cardInfo) {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catId}`);
    const data = await response.json();
    let newCardInfo = data.data;
    let sortedCards = newCardInfo.sort((p1, p2) => {
      let localViews1 = p1.others.views.split("K")[0];
      let localViews2 = p2.others.views.split("K")[0];
      let v1 = parseFloat(localViews1) * 1000;
      let v2 = parseFloat(localViews2) * 1000;
      return v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
    });
    loadCards(sortedCards);
  }
};

handleCategory();
loadCategory("1000");
