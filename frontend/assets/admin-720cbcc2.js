const r=async(e,o={})=>{const n=await fetch(e,o);if(!n.ok)throw new Error(`Error ${n.status} occured`);return n.json()},s="http://127.0.0.1:3000/",f=await r(s+"api/dish");f.forEach(e=>{const n=(()=>{let t=`
		<h2>${e.category_name}</h2>
		<ul class="menu-list">
	`;return e.dishes.forEach(d=>{const{dish_name:a,dish_price:l,dish_photo:m,dish_id:u}=d;t+=`
			<li class="menu-item" data-dish-id=${u}>
			<img class="menu-img" src="${s+"media/"+m}" alt="drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${a}</p>
				<p class="menu-item-price">${l}</p>
			</div>

		`,document.querySelector(".menu-container")?.classList.contains("menu-admin")&&(t+=`<div class="menu-item-btns"><button class="menu-modify-btn button">Muokkaa</button>
			<button class="menu-delete-btn button">Poista</button></div>`),document.querySelector(".menu-container")?.classList.contains("offer-admin")&&(t+=`<div class="menu-item-btns"><button id="offer-activate" class="button">Aktivoi</button>
			<button id="offer-delete" class="button">Poista</button></div>`),t+="	</li>"}),t+=`

	</ul>
	`,t})();document.querySelector(".menu-items")?.insertAdjacentHTML("beforeend",n)});const b=document.querySelectorAll(".menu-item");b.forEach(e=>{e.addEventListener("click",o=>{})});document.getElementById("item-modify-form")?.addEventListener("submit",async e=>{e.preventDefault()});document.getElementById("delete-item-dialog")?.addEventListener("submit",async e=>{e.preventDefault()});const c=document.querySelector("#modify-item-dialog"),i=document.querySelector("#delete-item-dialog"),y=document.querySelectorAll(".menu-modify-btn"),h=document.querySelectorAll(".menu-delete-btn");y?.forEach(e=>{e.addEventListener("click",()=>{c?.showModal()})});h?.forEach(e=>{e.addEventListener("click",()=>{i?.showModal()})});const v=document.querySelector("#modify-back-btn");v.addEventListener("click",()=>{c?.close()});const E=document.querySelector("#delete-back-btn");E.addEventListener("click",()=>{i?.close()});
