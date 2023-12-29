const TIMESTEP = 0.1

let lbl_food = document.getElementById("lbl_food")
let lbl_money = document.getElementById("lbl_money")
let lbl_motivation = document.getElementById("lbl_haste")

// cat house
let div_catHouse = document.getElementById("div_catHouse")
let span_catCost = document.getElementById("cost_cat")
let span_scavengeAmount = document.getElementById("amt_scavenge")

// research panel
let div_research = document.getElementById("div_research")
div_research.style.display = 'none'

// panel navigation
let btn_catHouse = document.getElementById("btn_catHouse")
let btn_research = document.getElementById("btn_research")
btn_catHouse.onclick = () => { 
  div_catHouse.style.display = 'flex'
  div_research.style.display = 'none' }
btn_research.onclick = () => { 
  div_catHouse.style.display = 'none'
  div_research.style.display = 'flex' }

let state = {
  food: 50,
  cats: 0,
  haste: 1,
  time: Date.now()
}

if (document.cookie.length > 0) {
  state = JSON.parse(document.cookie.substring(6))
  let elapsed = (Date.now() - state.time) / 1000
  let growth = state.cats * state.haste * elapsed
  console.log(elapsed+" seconds have elapsed, resulting in "+growth+" food.")
  state.food += growth
}

function save() {
  state.time = Date.now()
  document.cookie = "state="+JSON.stringify(state)
}

let lastTime = Date.now()
function update() {

  let time = Date.now()
  let since = (time - lastTime) / 1000
  lastTime = time

  state.food += state.cats * since * state.haste

  lbl_food.innerText = state.food.toFixed(1)
  lbl_cats.innerText = state.cats
  lbl_haste.innerText = state.haste.toFixed(2)
  span_catCost.innerText = catCost().toFixed(2)
  span_scavengeAmount.innerText = scavengeAmount().toFixed(2)
}

function catCost() {
  return 50 * Math.pow(1.5, state.cats)
}

function scavengeAmount() {
  return 1 + state.cats / 10
}

function init() {

  let btn_scavenge = 	document.getElementById("btn_scavenge")
  let btn_adopt = document.getElementById("btn_adopt")
  let btn_haste = document.getElementById("btn_execute")
  
  btn_scavenge.onclick = () => {
    state.food += scavengeAmount()
    save()
  }
  
  btn_adopt.onclick = () => {
    let cost = catCost()
    if (state.food < cost) return
    state.food -= cost
    state.cats ++
    save()
  }
  
  btn_haste.onclick = () => {
  	if (state.cats < 1) return
    state.cats --
    state.haste += .01
    save()
  }

  setInterval(update, 1000 * TIMESTEP)
  setInterval(save, 10 * 1000)
}

document.onload = init()
