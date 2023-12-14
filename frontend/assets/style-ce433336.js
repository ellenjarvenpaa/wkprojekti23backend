(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const a="https://jalkkari-server.northeurope.cloudapp.azure.com/",u=r=>{let s='<h2>Tarjoukset</h2><ul class="menu-list">';return r.forEach(n=>{const{dish_name:o,dish_price:e,offer_price:t,dish_photo:i,dish_id:c}=n;s+=`
			<li class="menu-item" data-dish-id=${c}>
				<img class="menu-img" src="${a+"media/"+i}" alt=" drink">
				<div class="menu-item-info">
					<p class="menu-item-name">${o}</p>
					<p class="menu-item-price">
						<span class="old">${e}</span>
						<span class="sale">${t}</span>
					</p>
				</div>
			</li>
		`}),s+="</ul>",s},m=r=>{let s="";return r.forEach(n=>{s+=`
		<h2>${n.category_name}</h2>
		<ul class="menu-list">
		`,n.dishes.forEach(o=>{const{dish_name:e,dish_price:t,offer_price:i,dish_photo:c,dish_id:l}=o;s+=`
			<li class="menu-item" data-dish-id=${l}>
			<img class="menu-img" src="${a+"media/"+c}" alt=" drink">
			<div class="menu-item-info">
				<p class="menu-item-name">${e}</p>

					`,i?s+=`
				<p class="menu-item-price">
					<span class="old">${t}</span>
					<span class="sale">${i}</span>
				</p>`:s+=`
				<p class="menu-item-price">${t}</p>`,s+=`
			</div>
			</li>
		`}),s+=`
		</ul>
		`}),s},d=r=>`
				<h3>Error</h3>
				<p>${r}</p>
				<button type="button" class="button" id="back-btn-error">Takaisin</button>
				`,p=r=>`
				<h3>Success</h3>
				<p>${r}</p>
				<button type="button" class="button" id="back-btn-success">Takaisin</button>
				`;export{a,m as b,d as e,u as m,p as s};
