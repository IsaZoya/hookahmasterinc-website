const brands = [
  {name:'Fumari', type:'Bright Classics', flavors:['Lemon Mint','White Gummy Bear','Red Gummy Bear','Tropical Punch','Mojito','Ambrosia','Spiced Chai','Tangelo','Island Papaya','Red Gummy Ice']},
  {name:'Al Fakher', type:'Traditional Favorites', flavors:['Double Apple','Mint','Gum Mint','Magic Love','Orange Mint','Grape Mint','Blueberry Mint','Peach','Guava','Watermelon','Kiwi','Mango','Coconut','Vanilla','Cherry','Citrus Mint','Cloud 92']},
  {name:'Trifecta', type:'Special Blends', flavors:['Twice the Ice','TNT','Indian Kheer']},
  {name:'Afzal', type:'Pan Collection', flavors:['Pan Raas','Pan Masala','Bombay Pan','Kesar Pan']},
  {name:'Starbuzz', type:'Lounge Legends', flavors:['Bluemist','Safari Melon Dew','Sex on the Beach','Code 69','Orange Mint','Coco Jumbo','Pirates Cave']},
  {name:'Adalya', type:'Modern Favorites', flavors:['Love 66','Lady Killer','Punkman','Sheikh Money','Blue Melon']},
  {name:'Tangiers', type:'Bold Premium', flavors:['Cane Mint','Extreme Cane Mint',"Eric's Mango",'Kashmir Mango','Mango Fling','Foreplay on the Peach','Kashmir Peach','Orange Soda','Blueberry Grapefruit','Strawberry Lemonade','Blackberry Lime','Pineapple','Welsh Cream','Schnozzberry','Maraschino Cherry','Lemon Blossom','Green Apple Stuff','Pear Watermelon','Mixed Fruit','Coconut']},
  {name:'MustHave', type:'Luxury Collection', flavors:['Pinkman','Rocketman','Space Flavor','Tropic Juice','Mango','Kiwi Smoothie','Orange Dream','Cookie','Candy Cow','Lemon Pie','Lemongrass','Holland Pie','Choco Mint','Ice Mint','Frosty','Apple Drops','Blackberry','Black Currant','Blueberry Candy','Ararat','Cherry Cola','Cucunada','Coconut Shake','Cheesecake','Cinnamon','Citrus Spritz','Caribbean Rum','Grapefruit','Earl Grey','Estragon','Feijoa','Gooseberry','Berry Moroz','Honey Halls','Ice Cream','Jumulao','Green Fizz','Fizzy Dizzy','Morocco','Nord Star','Mandarin','Milky Rice','Milk Oolong','Mango Sling','Orange Tea','Sweet Melon','Strawberry Lychee','Red Bomb','Pistachio','Pineapple Rings','Prosecco','Paradise','Vanilla Cream','Unicorn Treats','Watermelon','Tipsy','Violet']},
  {name:'Darkside', type:'Deep Cut Flavors', flavors:['Bergmonster','Basil Blast','Admiral Akbar','Brazil Breeze','Banana Papa','Bounty Hunter','Blueberry Blast','Bluesry Blast','Crystal Grape','Cyber Kiwi','Cream Soda','Dark Mint','Dark Passion','Deep Blue Sea','Desert Eagle','Dark Ice Cream','Dark Cola','Dark Melon','Lake Grapefruit','Genesis Raspberry','Guava Rebel','Falling Star','Mango Lassi 2.0','Goosebumps','Honey Dust','Ice Greczy','Killer Milk','Lemon Blast','Pear','Red Jam','Space Jam','Pomelo','Torpedo','Polar Cream','Red Alert','Fruity']},
  {name:'Eternal Smoke', type:'Smooth Smoke', flavors:['Eternal Smoke','Lime Lit','Peach Lit','Blueberry Lit','Watermelon Lit','Smoothie Sunshine','Midnight Passion','Aloha Night','Intense Peace']},
  {name:'Alwaha', type:'Classics', flavors:['Pan Rasna','Big Boy']},
  {name:'Hot Drinks', type:'Cafe Menu', flavors:['Kadak Chai','Pink Chai','Karak Chai','Black Tea','Green Tea','Mint Tea','Moroccan Mint Tea','Turkish Coffee','Armenian Coffee','Arabic Coffee','Perfect Coffee']}
];

const rail = document.getElementById('brandRail');
const slider = document.getElementById('flavorSlider');
const activeBrand = document.getElementById('activeBrand');
const activeType = document.getElementById('activeType');
const flavorCount = document.getElementById('flavorCount');
let brandIndex = 0;
let page = 0;
const pageSize = 8;

function renderRail(){
  rail.innerHTML = brands.map((brand, i) => `<button class="brand-tab ${i===brandIndex?'active':''}" data-index="${i}">${brand.name}</button>`).join('');
  rail.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>{brandIndex=Number(btn.dataset.index);page=0;render();}));
}
function render(){
  const brand = brands[brandIndex];
  const pages = Math.max(1, Math.ceil(brand.flavors.length / pageSize));
  page = (page + pages) % pages;
  const items = brand.flavors.slice(page*pageSize, page*pageSize+pageSize);
  activeBrand.textContent = brand.name;
  activeType.textContent = brand.type;
  slider.style.animation='none'; slider.offsetHeight; slider.style.animation='slideIn .35s ease';
  slider.innerHTML = items.map((f, i)=>`<div class="flavor-chip"><strong>${f}</strong><span>${brand.name} selection ${page*pageSize+i+1}</span></div>`).join('');
  flavorCount.textContent = `${brand.flavors.length} items - page ${page+1} of ${pages}`;
  renderRail();
}
document.getElementById('prevFlavor').addEventListener('click',()=>{page--; render();});
document.getElementById('nextFlavor').addEventListener('click',()=>{page++; render();});
render();

const gate = document.getElementById('ageGate');
if(localStorage.getItem('hm_age_verified_v2') === 'yes') gate.classList.add('hidden');
document.getElementById('ageYes').addEventListener('click',()=>{localStorage.setItem('hm_age_verified_v2','yes'); gate.classList.add('hidden');});
document.getElementById('ageNo').addEventListener('click',()=>{document.body.innerHTML='<div class="age-denied"><div><h1>Access Restricted</h1><p>You must be 21 years of age or older to access this website.</p></div></div>';});
