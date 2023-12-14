const n=async(r,s={})=>{const o=await fetch(r,s);if(!o.ok)throw new Error(`Error ${o.status} occured`);return o.json()};export{n as f};
