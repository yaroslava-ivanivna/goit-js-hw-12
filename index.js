import{a as w,i as o,S as b}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))h(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const g of s.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&h(g)}).observe(document,{childList:!0,subtree:!0});function u(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function h(t){if(t.ep)return;t.ep=!0;const s=u(t);fetch(t.href,s)}})();const f=e=>`<li class="gallery-card">
  <a class="gallery-link-image" href="${e.largeImageURL}"> 
      <img
      class="gallery-image"
      src="${e.webformatURL}"
      data-source="${e.largeImageURL}"
      alt="${e.tags}"
    /> </a>

   <div class="image-info">
      <p class="image-additional-info"><strong>Likes:</strong> ${e.likes}</p>
      <p class="image-additional-info"><strong>Views:</strong> ${e.views}</p>
      <p class="image-additional-info"><strong>Comments:</strong> ${e.comments}</p>
      <p class="image-additional-info"><strong>Downloads:</strong> ${e.downloads}</p>
    </div>
   </li>`,y=(e,r)=>w.get(`https://pixabay.com/api/?key=48347976-46935637adedce2affc2ad0dc&q=${e}&image_type=photo&orientation=horizontal$safesearch=true&page=${r}&per_page=15`),L=document.querySelector(".loader"),m=document.querySelector(".js-search-form"),p=document.querySelector(".js-gallery"),a=document.querySelector(".load-more-btn");let l,i=1;const v=15;let c=0,d="";function S(){L.classList.remove("visually-hidden")}function n(){L.classList.add("visually-hidden")}const $=async e=>{e.preventDefault(),S();try{if(d=e.currentTarget.elements.search.value.trim(),!d){n(),o.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}i=1,a.classList.add("visually-hidden");const r=await y(d,i);if(c=r.data.totalHits,c===0){n(),o.error({title:"Error",message:"Sorry, no images found. Try another search!",position:"topRight"}),p.innerHTML="",m.reset();return}n(),p.innerHTML=r.data.hits.map(u=>f(u)).join(""),m.reset(),l?l.refresh():l=new b(".gallery a",{captionsData:"alt",captionDelay:250}),c>v?a.classList.remove("visually-hidden"):a.classList.add("visually-hidden")}catch(r){console.log(r),n(),o.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}},E=async()=>{try{i++;const e=await y(d,i);p.insertAdjacentHTML("beforeend",e.data.hits.map(r=>f(r)).join("")),l.refresh(),i*v>=c&&(a.classList.add("visually-hidden"),o.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e),o.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"})}};m.addEventListener("submit",$);a.addEventListener("click",E);
//# sourceMappingURL=index.js.map
