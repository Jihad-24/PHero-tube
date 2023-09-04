document.getElementById('sort-by-view').addEventListener('click', () => {
  alert("This Button Doesn't Work")
});


const handleCategory = async () => {
  const response = await fetch(" https://openapi.programming-hero.com/api/videos/categories");
  const data = await response.json();
  const trimData = await data?.data;
  const tabContainer = document.getElementById('tab-container');
  trimData.forEach((category) => {
    const div = document.createElement('div');
    div.innerHTML = `
        <a class="mr-2 btn btn-secondary mb-4" onclick="handleCategoryVideos('${category?.category_id}')" class="tab">${category?.category}</a>
        `;
    tabContainer.appendChild(div);
  });
  // console.log(trimData)
}

const handleCategoryVideos = async (categoryId) => {
  // console.log(categoryId);
  const Response = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await Response.json();
  eachData = await data.data;
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";
  if (data.status === false) {
    const emptyImageContainer = document.createElement('div');
emptyImageContainer.classList.add('grid','lg:col-span-4','md:col-span-2' ,'mx-auto')
    emptyImageContainer.innerHTML = `
        <div class="flex flex-col items-center text-center ">
            <img src="./Icon.png">
            <h1 class="text-4xl font-bold">Oops! Sorry There is no content here</h1>
        </div>
    `;
    cardContainer.appendChild(emptyImageContainer);
    return;
}
  eachData?.forEach((videos) => {
      // console.log(videos)
    const div = document.createElement('div');
    const publish = videos?.others?.posted_date;

    div.innerHTML = `
          <div class="card card-compact  bg-base-100 shadow-xl">
          <figure class="relative">
          <img class="h-52" src=${videos?.thumbnail} />
          <h3 class="absolute bottom-1 rounded-lg right-2 px-2 bg-slate-700 text-white">${videos?.others?.posted_date ? publishDate(publish) : ''}</h3>
      </figure>
             <div class="card-body flex justify-between">
            <h2 class="card-title">${videos?.title}</h2>
              <div class="card-footer justify-between mt-8">
              <div class="flex gap-4 justify-between">
                <div class="flex gap-4 justify-start">
                  <div>
                    <div class="avatar online">
                      <div class="w-14 rounded-full">
                        <img src="${videos?.authors[0]?.profile_picture}" alt="">
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <h6>${videos?.authors[0]?.profile_name}</h6>
                    <p>${videos?.authors[0]?.verified ? '<i class="fa-solid fa-circle-check text-[blue] text-xl"></i>' : ''}</p>      
                  </div>
                </div>
              </div>
              <h3 class="py-3 total-views">Total Views : ${videos?.others?.views ? videos?.others?.views : "No Views"}</h3>
              </div>
          </div>
        </div>
          `;

    cardContainer.appendChild(div);
  });
};


const publishDate = (Date) => {
  const totalSeconds = Date;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const noTime = "";
  const formattedTime = `${hours} : ${minutes} : ${seconds}`;
  if (Date !== "" || Date !== undefined) {
    return formattedTime;
  } else {
    return noTime;
  }
}




handleCategory();
handleCategoryVideos("1000");

