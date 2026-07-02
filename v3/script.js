const brands = {
  "Fumari":["Lemon Mint","White Gummy Bear","Red Gummy Bear","Tropical Punch","Mojito","Ambrosia","Spiced Chai","Tangelo","Island Papaya","Red Gummy Ice"],
  "Al Fakher":["Double Apple","Mint","Gum Mint","Magic Love","Orange Mint","Grape Mint","Blueberry Mint","Peach","Guava","Watermelon","Kiwi","Mango","Coconut","Vanilla","Cherry","Citrus Mint","Cloud 92"],
  "Tangiers":["Cane Mint","Extreme Cane Mint","Eric's Mango","Kashmir Mango","Mango Fling","Foreplay on the Peach","Kashmir Peach","Orange Soda","Blueberry Grapefruit","Strawberry Lemonade","Blackberry Lime","Pineapple","Welsh Cream","Schnozzberry","Maraschino Cherry","Lemon Blossom","Green Apple Stuff","Pear Watermelon","Mixed Fruit","Coconut"],
  "MustHave":["Pinkman","Rocketman","Space Flavor","Tropic Juice","Mango","Kiwi Smoothie","Orange Dream","Cookie","Candy Cow","Lemon Pie","Lemongrass","Holland Pie","Choco Mint","Ice Mint","Frosty","Apple Drops","Blackberry","Black Currant","Blueberry Candy","Ararat","Cherry Cola","Cucunada","Coconut Shake","Cheesecake","Cinnamon","Citrus Spritz","Caribbean Rum","Grapefruit","Earl Grey","Estragon","Feijoa","Gooseberry","Berry Moroz","Honey Halls","Ice Cream","Jumulao","Green Fizz","Fizzy Dizzy","Morocco","Nord Star","Mandarin","Milky Rice","Milk Oolong","Mango Sling","Orange Tea","Sweet Melon","Strawberry Lychee","Red Bomb","Pistachio","Pineapple Rings","Prosecco","Paradise","Vanilla Cream","Unicorn Treats","Watermelon","Tipsy","Violet"],
  "Darkside":["Bergmonster","Basil Blast","Admiral Akbar","Brazil Breeze","Banana Papa","Bounty Hunter","Blueberry Blast","Crystal Grape","Cyber Kiwi","Cream Soda","Dark Mint","Dark Passion","Deep Blue Sea","Desert Eagle","Dark Ice Cream","Dark Cola","Dark Melon","Lake Grapefruit","Genesis Raspberry","Guava Rebel","Falling Star","Mango Lassi 2.0","Goosebumps","Honey Dust","Killer Milk","Lemon Blast","Pear","Red Jam","Space Jam","Pomelo","Torpedo","Polar Cream","Red Alert","Fruity"],
  "Eternal Smoke":["Eternal Smoke","Lime Lit","Peach Lit","Blueberry Lit","Watermelon Lit","Smoothie Sunshine","Midnight Passion","Aloha Night","Intense Peace"],
  "Adalya":["Love 66","Lady Killer","Punkman","Sheikh Money","Blue Melon"],
  "Starbuzz":["Bluemist","Safari Melon Dew","Sex on the Beach","Code 69","Orange Mint","Coco Jumbo","Pirates Cave"],
  "Hot Drinks":["Kadak Chai","Pink Chai","Karak Chai","Black Tea","Green Tea","Mint Tea","Moroccan Mint Tea","Turkish Coffee","Armenian Coffee","Arabic Coffee","Perfect Coffee"]
};

const tabs = document.getElementById('brandTabs');
const track = document.getElementById('flavorTrack');
let activeBrand = Object.keys(brands)[0];
let index = 0;

function score(name, offset){return 45 + ((name.length * 11 + offset) % 50)}
function renderTabs(){
  tabs.innerHTML = Object.keys(brands).map(b=>`<button class="${b===activeBrand?'active':''}" data-brand="${b}">${b}</button>`).join('');
  tabs.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{activeBrand=btn.dataset.brand;index=0;renderTabs();renderCards();});
}
function renderCards(){
  track.style.transform='translateX(0)';
  const flavors = brands[activeBrand];
  track.innerHTML = flavors.map((f,i)=>`<article class="flavor-card"><div><p class="eyebrow">${activeBrand}</p><h3>${String(i+1).padStart(2,'0')}</h3><div class="flavor-name">${f}</div></div><div><p>Swipe left or right to browse the ${activeBrand} collection.</p><label>Sweet</label><div class="meter"><span style="--w:${score(f,3)}%"></span></div><label>Cool</label><div class="meter"><span style="--w:${score(f,17)}%"></span></div><label>Bold</label><div class="meter"><span style="--w:${score(f,31)}%"></span></div></div></article>`).join('');
}
function updateSlide(){track.style.transform=`translateX(${-index*100}%)`;}
let startX=0, dragging=false;
document.getElementById('swipeWrap').addEventListener('pointerdown',e=>{startX=e.clientX;dragging=true;});
document.addEventListener('pointerup',e=>{if(!dragging)return; const dx=e.clientX-startX; const max=brands[activeBrand].length-1; if(dx<-45&&index<max)index++; if(dx>45&&index>0)index--; updateSlide(); dragging=false;});
renderTabs();renderCards();

function embers(){
  const field=document.getElementById('emberField');
  setInterval(()=>{const e=document.createElement('span');e.className='ember';e.style.left=Math.random()*100+'vw';e.style.setProperty('--x',(Math.random()*80-40)+'px');e.style.animationDuration=(3+Math.random()*4)+'s';field.appendChild(e);setTimeout(()=>e.remove(),7200);},220);
}
embers();

document.getElementById('year').textContent = new Date().getFullYear();

const gate=document.getElementById('ageGate');
if(localStorage.getItem('hm_age_verified')==='yes'){gate.classList.add('hidden');}
document.getElementById('ageYes').onclick=()=>{localStorage.setItem('hm_age_verified','yes');gate.classList.add('hidden');};
document.getElementById('ageNo').onclick=()=>{document.body.innerHTML='<div class="age-gate"><div class="age-panel"><h1>Access Restricted</h1><p>You must be 21 years of age or older to access this website.</p></div></div>';};
