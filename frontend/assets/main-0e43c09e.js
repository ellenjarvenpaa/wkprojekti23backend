(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))c(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}})();const f="http://127.0.0.1:3000/",S=t=>{let e='<h2>Tarjoukset</h2><ul class="menu-list">';return t.forEach(o=>{const{dish_name:c,dish_price:n,offer_price:s,dish_photo:r}=o;e+=`
			<li class="menu-item">
				<img class="menu-img" src="${f+"media/"+r}" alt=" drink">
				<div class="menu-item-info">
					<p class="menu-item-name">${c}</p>
					<p class="menu-item-price">
						<span class="old">${n}</span>
						<span class="sale">${s}</span>
					</p>
				</div>
			</li>
		`}),e+="</ul>",e},k=t=>{let e="";return t.forEach(o=>{e+=`
		<h2>${o.category_name}</h2>
		<ul class="menu-list">
		`,o.dishes.forEach(c=>{const{dish_name:n,dish_price:s,offer_price:r,dish_photo:i}=c;e+=`
			<li class="menu-item">
			<img class="menu-img" src="${f+"media/"+i}" alt=" drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${n}</p>

					`,r?e+=`
				<p class="menu-item-price">
					<span class="old">${s}</span>
					<span class="sale">${r}</span>
				</p>`:e+=`
				<p class="menu-item-price">${s}</p>`,e+=`
			</div>
			</li>
		`}),e+=`
		</ul>
		`}),e},q=t=>`
				<h3>Error</h3>
				<p>${t}</p>
				<button type="button" class="button" id="back-btn-error">Takaisin</button>
				`,L=t=>`
				<h3>Success</h3>
				<p>${t}</p>
				<button type="button" class="button" id="back-btn-success">Takaisin</button>
				`,p=async(t,e={})=>{const o=await fetch(t,e);if(!o.ok)throw new Error(`Error ${o.status} occured`);return o.json()},g=async(t,e={})=>{const o=await fetch(t,e);if(!o.ok)throw new Error(`Error ${o.status} occured`);return o.json()},u="https://jalkkari-server.northeurope.cloudapp.azure.com/",w=await g(u+"api/dish");w.forEach(t=>{const o=(()=>{let c=`
		<h2>${t.category_name}</h2>
		<ul class="menu-list">
		`;return t.dishes.forEach(n=>{const{dish_photo:s,dish_name:r,dish_price:i,dish_id:a}=n;c+=`
			<li class="menu-item" data-dish-id=${a}>
			<img class="menu-img" src="${u+"media/"+s}" alt="drink">
			<div>
			<p class="menu-item-name">${r}</p>
			<p class="menu-item-price">${i}</p>
			</div>
			</li>
			`}),c+=`
		</ul>
		`,c})();document.querySelector(".menu-items")?.insertAdjacentHTML("beforeend",o)});const D=async t=>{try{return await g(u+`api/dish/${t}`)}catch(e){return console.error(`Error fetching dish details for dish_id ${t}:`,e),null}},T=document.querySelectorAll(".menu-item");T.forEach(t=>{t.addEventListener("click",e=>{const o=e.currentTarget.dataset.dishId;console.log(o),o&&$(Number(o))})});const $=async t=>{const e=await D(t);if(e){console.log("Dish Details:",e);const{dish_photo:o,dish_name:c,dish_price:n,dish_id:s,description:r}=e,i=`
		<div class="menu-item" data-dish-id="${s}">
		  <img class="menu-img" src="${u+"media/"+o}" alt="drink">
		  <div>
			<p class="menu-item-name">${c}</p>
			<p>${r}</p>
			<p class="menu-item-price">${n}</p>
		  </div>
		</div>
	  `,a=document.querySelector(".info-item");a?(a.innerHTML="",a.insertAdjacentHTML("beforeend",i)):console.error("infoItemContainer is null")}else console.log("Unable to fetch dish details")},y=document.querySelector("dialog"),b=document.querySelector("#product-info-dialog"),d=document.querySelector("#login-dialog"),M=document.querySelector("#shopping-cart-dialog"),l=document.querySelector("#info"),v=document.querySelectorAll(".menu-item");console.log(v);v.forEach(t=>{t.addEventListener("click",()=>{b?.showModal()}),document.body.style.overflow="auto"});const _=document.querySelector("#shopping-cart-icon");_?.addEventListener("click",()=>{M?.showModal(),document.body.style.overflow="auto"});const O=document.querySelector("#back-btn-info");O.addEventListener("click",()=>{y?.close()});const j=document.querySelector("#back-btn-login");j.addEventListener("click",()=>{d?.close()});const I=document.querySelector("#back-btn-cart");I.addEventListener("click",()=>{y?.close()});const B=document.querySelector("#quantity-plus");B.addEventListener("click",()=>{const t=document.querySelector(".quantity-number");let e=parseInt(t.value);e++,t.value=e.toString()});const H=document.querySelector("#quantity-minus");H.addEventListener("click",()=>{const t=document.querySelector(".quantity-number");let e=parseInt(t.value);e--,t.value=e.toString()});const h=document.querySelector("#login-form"),A=document.querySelector("#profile-icon"),C=document.querySelector("#login");if(!C)throw new Error("Login button not found");if(!l)throw new Error("Dialog not found");const N=async t=>{const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};return await p(u+"api/auth/login",e)},E=async()=>{const t=localStorage.getItem("token");if(!t)return;const e=await P(t),o=document.querySelector(".menu-items");o&&(o.innerHTML=""),(i=>{const a=document.querySelector(".menu-items"),m=S(i.offer_dishes);console.log(i),a?.insertAdjacentHTML("afterbegin",m),document.querySelector(".nav-item.discount")?.classList.remove("hidden")})(e);const n=await x(t);console.log(n),(i=>{const a=document.querySelector(".menu-items"),m=k(i);a?.insertAdjacentHTML("beforeend",m)})(n);const r=document.querySelectorAll(".menu-item");console.log(r),r.forEach(i=>{i.addEventListener("click",()=>{b?.showModal()}),document.body.style.overflow="auto"})},P=async t=>{const e={method:"GET",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"}};return await p(u+"api/dish/offers",e)},x=async t=>{const e={method:"GET",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"}};return await p(u+"api/dish/logged",e)};E();A?.addEventListener("click",()=>{if(localStorage.getItem("token")===null)d?.showModal(),document.body.style.overflow="auto",h?.addEventListener("submit",async e=>{try{e.preventDefault();const o={membernumber:h.membernumber.value,password:h.loginpassword.value},c=await N(o);console.log("loginData",c),localStorage.setItem("token",c.token),d?.close(),E()}catch(o){console.log(o);const c=o.message+". Kirjautuminen epäonnistui. Yritä uudelleen";l.innerHTML=q(c),l.showModal(),d?.close();const n=document.querySelector("#back-btn-error");n?.addEventListener("click",()=>{l?.close()}),console.log("close button",n),console.log(l)}});else{const e="Olet nyt kirjautunut sisään. Nauti tarjouksistasi!";l.innerHTML=L(e),l.showModal(),document.querySelector("#back-btn-success")?.addEventListener("click",()=>{l?.close()})}});
