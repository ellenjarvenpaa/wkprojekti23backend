(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const a="http://127.0.0.1:3000/",u=i=>{let s='<h2 id="offers">Tarjoukset</h2><ul class="menu-list">';return i.forEach(n=>{const{dish_name:o,dish_price:e,offer_price:t,dish_photo:r,dish_id:c}=n;s+=`
			<li class="menu-item" data-dish-id=${c}>
				<img class="menu-img" src="${a+"media/"+r}" alt=" drink">
				<div class="menu-item-info">
					<p class="menu-item-name">${o}</p>
					<p class="menu-item-price">
						<span class="old">${e}</span>
						<span class="sale">${t}</span>
					</p>
				</div>
			</li>
		`}),s+="</ul>",s},d=i=>{let s="";return i.forEach(n=>{s+=`
		<h2 id="${n.category_name}">${n.category_name}</h2>
		<ul class="menu-list">
		`,n.dishes.forEach(o=>{const{dish_name:e,dish_price:t,offer_price:r,dish_photo:c,dish_id:l}=o;s+=`
			<li class="menu-item" data-dish-id=${l}>
			<img class="menu-img" src="${a+"media/"+c}" alt=" drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${e}</p>

					`,r?s+=`
				<p class="menu-item-price">
					<span class="old">${t}</span>
					<span class="sale">${r}</span>
				</p>`:s+=`
				<p class="menu-item-price">${t}</p>`,s+=`
			</div>
			</li>
		`}),s+=`
		</ul>
		`}),s},m=i=>`
				<h3>Error</h3>
				<p>${i}</p>
				<button type="button" class="button" id="back-btn-error">Takaisin</button>
				`,p=i=>`
				<h3>Success</h3>
				<p>${i}</p>
				<button type="button" class="button" id="back-btn-success">Takaisin</button>
				`;export{a,d as b,m as e,u as m,p as s};
