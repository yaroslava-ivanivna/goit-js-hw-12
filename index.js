import{a as S,i,S as b}from"./assets/vendor-DEenWwFD.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))p(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const g of o.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&p(g)}).observe(document,{childList:!0,subtree:!0});function u(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(t){if(t.ep)return;t.ep=!0;const o=u(t);fetch(t.href,o)}})();const f=e=>`<li class="gallery-card">
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
   </li>`,y=(e,r)=>S.get(`https://pixabay.com/api/?key=48347976-46935637adedce2affc2ad0dc&q=${e}&image_type=photo&orientation=horizontal$safesearch=true&page=${r}&per_page=15`),L=document.querySelector(".loader-text"),v=document.querySelector(".loader-container"),m=document.querySelector(".js-search-form"),h=document.querySelector(".js-gallery"),s=document.querySelector(".load-more-btn");let l,n=1;const w=15;let c=0,d="";function T(){v.classList.remove("hidden")}function a(){v.classList.add("hidden")}function $(){L.classList.remove("visually-hidden")}function q(){L.classList.add("visually-hidden")}function E(){const e=document.querySelector(".gallery-card");if(e){const r=e.getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}}const P=async e=>{e.preventDefault(),T();try{if(d=e.currentTarget.elements.search.value.trim(),!d){a(),i.error({title:"Error",message:"Please enter a search query!",position:"topRight"});return}n=1,s.classList.add("visually-hidden");const r=await y(d,n);if(c=r.data.totalHits,c===0){a(),i.error({title:"Error",message:"Sorry, no images found. Try another search!",position:"topRight"}),h.innerHTML="",m.reset();return}a(),h.innerHTML=r.data.hits.map(u=>f(u)).join(""),m.reset(),l?l.refresh():l=new b(".gallery a",{captionsData:"alt",captionDelay:250}),c>w?s.classList.remove("visually-hidden"):s.classList.add("visually-hidden")}catch(r){console.log(r),a(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}},R=async()=>{s.classList.add("visually-hidden"),$(),await new Promise(e=>setTimeout(e,500));try{n++;const e=await y(d,n);h.insertAdjacentHTML("beforeend",e.data.hits.map(r=>f(r)).join("")),l.refresh(),E(),s.classList.remove("visually-hidden"),n*w>=c&&(s.classList.add("visually-hidden"),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(e){console.log(e),i.error({title:"Error",message:"Something went wrong while loading more images.",position:"topRight"})}finally{a(),q()}};m.addEventListener("submit",P);s.addEventListener("click",R);
//# sourceMappingURL=index.js.map
