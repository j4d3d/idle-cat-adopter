const TIMESTEP = 0.1

let lbl_food = document.getElementById("lbl_food")
let lbl_money = document.getElementById("lbl_money")
let lbl_motivation = document.getElementById("lbl_haste")

let span_catCost = document.getElementById("cost_cat")
let span_scavengeAmount = document.getElementById("amt_scavenge")

let state = {
	food: 50,
  cats: 0,
  haste: 1,
}

function update() {

	state.food += state.cats * TIMESTEP * state.haste

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
  }
  
  btn_adopt.onclick = () => {
  	let cost = catCost()
  	if (state.food < cost) return
  	state.food -= cost
    state.cats ++
  }
  
  btn_haste.onclick = () => {
  	if (state.cats < 1) return
    state.cats --
    state.haste += .01
  }

	setInterval(update, 1000 * TIMESTEP)
}

document.onload = init()
