// loadCatagory for menbar 
const loadCatagory= async()=>{
    const res= await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data= await res.json();
    return data.data.news_category;
}

// set catagory to manubar 
const setManu= async()=>{
    const data= await loadCatagory();
    const navManu= document.getElementById('menu-bar-item');
    
    data.forEach(item => {
    // console.log(item.category_id)
    const li = document.createElement('li');

    // set inner html in manubar 
    li.innerHTML=`
    <a class="text-sm" onclick="loadPortal('${item.category_id}')">${item.category_name} </a>
    `
    navManu.appendChild(li)
    
    });
}
setManu()

const loadPortal=(idportal)=>{
    fetch(`https://openapi.programming-hero.com/api/news/category/${idportal}`)
    .then(res=> res.json())
    .then(data=> displayPortal(data.data))
}

// display portal item 
const displayPortal=(data)=>{
    // console.log(data)
    const displayContainer= document.getElementById('display-portal')
    displayContainer.textContent='';
    data.forEach(portalData=>{
        // console.log(portalData)
        const {thumbnail_url, title,total_view,author,details,_id}=portalData;
        // console.log(author)
        const div= document.createElement('div')
        div.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl')

        // adding inner html 
        div.innerHTML=` 
        <figure><img src="${thumbnail_url}" alt="Album"></figure>
        <div class="card-body">
          <h2 class="card-title">${title}</h2>
          <p class="text-justify">${details.slice(0,250)}</p>
          <label tabindex="0" class="btn btn-ghost avatar w-5/6 mt-8">
          <div class="w-10 rounded-full">
            <img src="${author.img}" />
            </div>
         <p class="text-xs font-thin">Author Name:  ${author.name}</p>
         <h5><i class="fa fa-thin fa-eye"></i> ${total_view? total_view:'no data found'}</h5>
         <p>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star-half-stroke icon-fill"></i>
          </p>
        </label>
         <label onclick="displayDetailsNews('${_id}')" for="my-modal-4" class="w-5 absolute bottom-2 right-2 btn modal-button"><i class="fa fa-light fa-chevron-right"> </i></label>
          
        </div>
         
        `
        displayContainer.appendChild(div);
    } )

}

// load details for  modal
const  displayDetailsNews= async id=>{
    const url= `https://openapi.programming-hero.com/api/news/${id}`

    fetch(url)
    .then(res=> res.json())
    .then(data=> displayModal(data.data))
    // const res= await fetch(url)
    // const data= await res.json()
    // return data;
  
}

const displayModal= data=>{
    // const data= await displayDetailsNews();
    // console.log(data)
    const modalBody= document.getElementById('modal-body')
    modalBody.textContent="";
    data.forEach(item=> {
        
        console.log(item)
        
        const {author, title, details, thumbnail_url,total_view}=item;
        modalBody.innerHTML=`
        <p class=" text-center m-8"> Author name : ${author.name? author.name: 'no data found'}</P>
        <img class="p-2" src="${author.img}" alt="">
        <h3 class="text-lg font-bold mt-8">
            Article:  ${title}
        </h3>
        <img class="p-2 mx-20 inset-0" src="${thumbnail_url}" alt="">
        <p class=" text-center m-8"> ${details? details: 'no data found'}</P>
        <p class="inline"> Rating:
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star icon-fill"></i>
         <i class="fa fa-solid fa-star-half-stroke icon-fill"></i>
          </p>
          <h5 class="inline font-black ml-12"><i class="fa fa-thin fa-eye"> ${total_view}</i></h5>

        `
    })

}


   