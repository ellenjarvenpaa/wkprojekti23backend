import{a as i}from"./style-ce433336.js";const u=async(e,o={})=>{const n=await fetch(e,o);if(!n.ok)throw new Error(`Error ${n.status} occured`);return n.json()},f=async()=>{const e=localStorage.getItem("token");if(console.log(e),!e)console.log(window.location.href),window.location.href.includes("login-admin.html")||(window.location.href="login-admin.html");else return!0};f();const h=await u(i+"api/dish");h.forEach(e=>{const n=(()=>{let t=`
		<h2 id="${e.category_name}">${e.category_name}</h2>
		<ul class="menu-list">
	`;return e.dishes.forEach(l=>{const{dish_name:a,dish_price:d,dish_photo:m,dish_id:r}=l;t+=`
			<li class="menu-item" data-dish-id=${r}>
			<img class="menu-img" src="${i+"media/"+m}" alt="drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${a}</p>
				<p class="menu-item-price">${d}</p>
			</div>

		`,document.querySelector(".menu-container")?.classList.contains("menu-admin")&&(t+=`<div class="menu-item-btns"><button class="menu-modify-btn button">Muokkaa</button>
			<button class="menu-delete-btn button">Poista</button></div>`),document.querySelector(".menu-container")?.classList.contains("offer-admin")&&(t+=`<div class="menu-item-btns"><button id="offer-activate" class="button">Aktivoi</button>
			<button id="offer-delete" class="button">Poista</button></div>`),t+="	</li>"}),t+=`

	</ul>
	`,t})();document.querySelector(".menu-items")?.insertAdjacentHTML("beforeend",n)});const y=document.querySelectorAll(".menu-item");y.forEach(e=>{e.addEventListener("click",o=>{})});document.getElementById("item-modify-form")?.addEventListener("submit",async e=>{e.preventDefault()});document.getElementById("delete-item-dialog")?.addEventListener("submit",async e=>{e.preventDefault()});const c=document.querySelector("#modify-item-dialog"),s=document.querySelector("#delete-item-dialog"),b=document.querySelectorAll(".menu-modify-btn"),g=document.querySelectorAll(".menu-delete-btn");b?.forEach(e=>{e.addEventListener("click",()=>{c?.showModal()})});g?.forEach(e=>{e.addEventListener("click",()=>{s?.showModal()})});const v=document.querySelector("#modify-back-btn");v.addEventListener("click",()=>{c?.close()});const k=document.querySelector("#delete-back-btn");k.addEventListener("click",()=>{s?.close()});
