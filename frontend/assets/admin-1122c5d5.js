import{a as i}from"./style-ce433336.js";const m=async(e,o={})=>{const t=await fetch(e,o);if(!t.ok)throw new Error(`Error ${t.status} occured`);return t.json()},y=async()=>{const e=localStorage.getItem("token");if(console.log(e),!e)console.log(window.location.href),window.location.href.includes("login-admin.html")||(window.location.href="login-admin.html");else return!0};y();const f=await m(i+"api/dish");f.forEach(e=>{const t=(()=>{let n=`
		<h2 id="${e.category_name}">${e.category_name}</h2>
		<ul class="menu-list">
	`;return e.dishes.forEach(r=>{const{dish_name:a,dish_price:l,dish_photo:d,dish_id:c}=r;n+=`
			<li class="menu-item" data-dish-id=${c}>
			<img class="menu-img" src="${i+"media/"+d}" alt="drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${a}</p>
				<p class="menu-item-price">${l}</p>
			</div>

		`,document.querySelector(".menu-container")?.classList.contains("menu-admin")&&(n+=`<div class="menu-item-btns"><button class="menu-modify-btn button">Muokkaa</button>
			<button class="menu-delete-btn button">Poista</button></div>`),document.querySelector(".menu-container")?.classList.contains("offer-admin")&&(n+=`<div class="menu-item-btns"><button id="offer-activate" class="button">Aktivoi</button>
			<button id="offer-delete" class="button">Poista</button></div>`),n+="	</li>"}),n+=`

	</ul>
	`,n})();document.querySelector(".menu-items")?.insertAdjacentHTML("beforeend",t)});const p=async(e,o)=>{try{return await m(i+`api/dish/${e}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)})}catch(t){throw console.error("Error modifying item:",t),t}},g=document.querySelectorAll(".menu-item");let s;g.forEach(e=>{e.addEventListener("click",o=>{s=o.currentTarget.dataset.dishId,console.log(s)})});document.getElementById("item-modify-form")?.addEventListener("submit",async e=>{if(console.log(),e.preventDefault(),s){const o=parseInt(s);console.log(o);const t=document.querySelector('input[name="dish_name"]'),n=document.querySelector('input[name="dish_price"]'),r=document.querySelector('textarea[name="description"]'),a=document.querySelector('select[name="category_id"]'),l=document.querySelector('input[name="dish_photo"]'),d={dish_name:t?.value,dish_price:n?.value,description:r?.value,category_id:a?.value,dish_photo:l?.files?.[0]};try{const c=await p(o,d);console.log(c)}catch(c){throw console.error("Error modifying item:",c),c}u?.close(),location.reload()}});const b=async e=>{try{return await m(i+`api/dish/${e}`,{method:"DELETE"})}catch(o){console.error("Error deleting item:",o)}};document.getElementById("delete-item-dialog")?.addEventListener("submit",async e=>{if(e.preventDefault(),s){const o=parseInt(s);console.log(o);try{const t=await b(o);console.log(t)}catch(t){throw console.error("Error deleting item:",t),t}h?.close(),location.reload()}});const u=document.querySelector("#modify-item-dialog"),h=document.querySelector("#delete-item-dialog"),E=document.querySelectorAll(".menu-modify-btn"),v=document.querySelectorAll(".menu-delete-btn");E?.forEach(e=>{e.addEventListener("click",()=>{u?.showModal()})});v?.forEach(e=>{e.addEventListener("click",()=>{h?.showModal()})});const w=document.querySelector("#modify-back-btn");w.addEventListener("click",()=>{u?.close()});const S=document.querySelector("#delete-back-btn");S.addEventListener("click",()=>{h?.close()});
