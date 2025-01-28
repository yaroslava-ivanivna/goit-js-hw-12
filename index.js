import{a as p,i as d,S as y}from"./assets/vendor-DEenWwFD.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const f=r=>`<li class="gallery-card">
  <a class="gallery-link-image" href="${r.largeImageURL}"> 
      <img
      class="gallery-image"
      src="${r.webformatURL}"
      data-source="${r.largeImageURL}"
      alt="${r.tags}"
    /> </a>

   <div class="image-info">
      <p class="image-additional-info"><strong>Likes:</strong> ${r.likes}</p>
      <p class="image-additional-info"><strong>Views:</strong> ${r.views}</p>
      <p class="image-additional-info"><strong>Comments:</strong> ${r.comments}</p>
      <p class="image-additional-info"><strong>Downloads:</strong> ${r.downloads}</p>
    </div>
   </li>`,h=(r,o)=>p.get(`https://pixabay.com/api/?key=48347976-46935637adedce2affc2ad0dc&q=${r}&image_type=photo&orientation=horizontal$safesearch=true&page=${o}&per_page=15`),g=document.querySelector(".loader");function L(){g.classList.remove("visually-hidden")}function i(){g.classList.add("visually-hidden")}const c=document.querySelector(".js-search-form"),u=document.querySelector(".js-gallery"),m=document.querySelector(".load-more-btn");let l,v=1;const S=async r=>{r.preventDefault(),L();try{const o=r.currentTarget.elements.search.value.trim();if(o===""){i(),d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const s=await h(o,v);if(s.data.total===0){i(),d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),u.innerHTML="",c.reset();return}i();const a=s.data.hits.map(e=>f(e)).join("");u.innerHTML=a,c.reset(),m.classList.remove("visually-hidden"),m.addEventListener("click",$),l?l.refresh():l=new y(".gallery a",{captionsData:"alt",captionDelay:250})}catch(o){console.log(o),i()}};c.addEventListener("submit",S);const $=r=>{};
//# sourceMappingURL=index.js.map
