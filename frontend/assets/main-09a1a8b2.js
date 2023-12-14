import"./style-50bee6af.js";const f="http://127.0.0.1:3000/",E=t=>{let e='<h2>Tarjoukset</h2><ul class="menu-list">';return t.forEach(n=>{const{dish_name:o,dish_price:s,offer_price:r,dish_photo:i}=n;e+=`
			<li class="menu-item">
				<img class="menu-img" src="${f+"media/"+i}" alt=" drink">
				<div class="menu-item-info">
					<p class="menu-item-name">${o}</p>
					<p class="menu-item-price">
						<span class="old">${s}</span>
						<span class="sale">${r}</span>
					</p>
				</div>
			</li>
		`}),e+="</ul>",e},S=t=>{let e="";return t.forEach(n=>{e+=`
		<h2>${n.category_name}</h2>
		<ul class="menu-list">
		`,n.dishes.forEach(o=>{const{dish_name:s,dish_price:r,offer_price:i,dish_photo:c}=o;e+=`
			<li class="menu-item">
			<img class="menu-img" src="${f+"media/"+c}" alt=" drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${s}</p>

					`,i?e+=`
				<p class="menu-item-price">
					<span class="old">${r}</span>
					<span class="sale">${i}</span>
				</p>`:e+=`
				<p class="menu-item-price">${r}</p>`,e+=`
			</div>
			</li>
		`}),e+=`
		</ul>
		`}),e},q=t=>`
				<h3>Error</h3>
				<p>${t}</p>
				<button type="button" class="button" id="back-btn-error">Takaisin</button>
				`,D=t=>`
				<h3>Success</h3>
				<p>${t}</p>
				<button type="button" class="button" id="back-btn-success">Takaisin</button>
				`,p=async(t,e={})=>{const n=await fetch(t,e);if(!n.ok)throw new Error(`Error ${n.status} occured`);return n.json()},g=async(t,e={})=>{const n=await fetch(t,e);if(!n.ok)throw new Error(`Error ${n.status} occured`);return n.json()},u="http://127.0.0.1:3000/",w=await g(u+"api/dish");w.forEach(t=>{const n=(()=>{let o=`
		<h2>${t.category_name}</h2>
		<ul class="menu-list">
		`;return t.dishes.forEach(s=>{const{dish_photo:r,dish_name:i,dish_price:c,dish_id:a}=s;o+=`
			<li class="menu-item" data-dish-id=${a}>
			<img class="menu-img" src="${u+"media/"+r}" alt="drink">
			<div>
			<p class="menu-item-name">${i}</p>
			<p class="menu-item-price">${c}</p>
			</div>
			</li>
			`}),o+=`
		</ul>
		`,o})();document.querySelector(".menu-items")?.insertAdjacentHTML("beforeend",n)});const T=async t=>{try{return await g(u+`api/dish/${t}`)}catch(e){return console.error(`Error fetching dish details for dish_id ${t}:`,e),null}},L=document.querySelectorAll(".menu-item");L.forEach(t=>{t.addEventListener("click",e=>{const n=e.currentTarget.dataset.dishId;console.log(n),n&&$(Number(n))})});const $=async t=>{const e=await T(t);if(e){console.log("Dish Details:",e);const{dish_photo:n,dish_name:o,dish_price:s,dish_id:r,description:i}=e,c=`
		<div class="menu-item" data-dish-id="${r}">
		  <img class="menu-img" src="${u+"media/"+n}" alt="drink">
		  <div>
			<p class="menu-item-name">${o}</p>
			<p>${i}</p>
			<p class="menu-item-price">${s}</p>
		  </div>
		</div>
	  `,a=document.querySelector(".info-item");a?(a.innerHTML="",a.insertAdjacentHTML("beforeend",c)):console.error("infoItemContainer is null")}else console.log("Unable to fetch dish details")},y=document.querySelector("dialog"),b=document.querySelector("#product-info-dialog"),d=document.querySelector("#login-dialog"),M=document.querySelector("#shopping-cart-dialog"),l=document.querySelector("#info"),k=document.querySelectorAll(".menu-item");console.log(k);k.forEach(t=>{t.addEventListener("click",()=>{b?.showModal()}),document.body.style.overflow="auto"});const _=document.querySelector("#shopping-cart-icon");_?.addEventListener("click",()=>{M?.showModal(),document.body.style.overflow="auto"});const j=document.querySelector("#back-btn-info");j.addEventListener("click",()=>{y?.close()});const I=document.querySelector("#back-btn-login");I.addEventListener("click",()=>{d?.close()});const B=document.querySelector("#back-btn-cart");B.addEventListener("click",()=>{y?.close()});const H=document.querySelector("#quantity-plus");H.addEventListener("click",()=>{const t=document.querySelector(".quantity-number");let e=parseInt(t.value);e++,t.value=e.toString()});const O=document.querySelector("#quantity-minus");O.addEventListener("click",()=>{const t=document.querySelector(".quantity-number");let e=parseInt(t.value);e--,t.value=e.toString()});const h=document.querySelector("#login-form"),A=document.querySelector("#profile-icon"),C=document.querySelector("#login");if(!C)throw new Error("Login button not found");if(!l)throw new Error("Dialog not found");const x=async t=>{const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)};return await p(u+"api/auth/login",e)},v=async()=>{const t=localStorage.getItem("token");if(!t)return;const e=await N(t),n=document.querySelector(".menu-items");n&&(n.innerHTML=""),(c=>{const a=document.querySelector(".menu-items"),m=E(c.offer_dishes);console.log(c),a?.insertAdjacentHTML("afterbegin",m),document.querySelector(".nav-item.discount")?.classList.remove("hidden")})(e);const s=await U(t);console.log(s),(c=>{const a=document.querySelector(".menu-items"),m=S(c);a?.insertAdjacentHTML("beforeend",m)})(s);const i=document.querySelectorAll(".menu-item");console.log(i),i.forEach(c=>{c.addEventListener("click",()=>{b?.showModal()}),document.body.style.overflow="auto"})},N=async t=>{const e={method:"GET",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"}};return await p(u+"api/dish/offers",e)},U=async t=>{const e={method:"GET",headers:{Authorization:"Bearer "+t,"Content-Type":"application/json"}};return await p(u+"api/dish/logged",e)};v();A?.addEventListener("click",()=>{if(localStorage.getItem("token")===null)d?.showModal(),document.body.style.overflow="auto",h?.addEventListener("submit",async e=>{try{e.preventDefault();const n={membernumber:h.membernumber.value,password:h.loginpassword.value},o=await x(n);console.log("loginData",o),localStorage.setItem("token",o.token),d?.close(),v()}catch(n){console.log(n);const o=n.message+". Kirjautuminen epäonnistui. Yritä uudelleen";l.innerHTML=q(o),l.showModal(),d?.close();const s=document.querySelector("#back-btn-error");s?.addEventListener("click",()=>{l?.close()}),console.log("close button",s),console.log(l)}});else{const e="Olet nyt kirjautunut sisään. Nauti tarjouksistasi!";l.innerHTML=D(e),l.showModal(),document.querySelector("#back-btn-success")?.addEventListener("click",()=>{l?.close()})}});
