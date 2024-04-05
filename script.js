
const BASE_URL =
"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll('.select-container select')
const btn = document.querySelector('button')
const fromcurr = document.querySelector('.from select')
const tocurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')

for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement('option')
    newOption.innerText = currcode
    newOption.value = currcode
    if(select.name === 'from' && newOption.value === 'USD'){
      newOption.selected = 'selected'
    } else if (select.name === 'to' && newOption.value === 'INR'){
      newOption.selected = 'selected'
    }
    select.append(newOption)
  }
  select.addEventListener('change', (evt)=>{
    changephoto(evt.target)
  })
}

const changephoto = (element)=>{
  const key = element.value;
  const value = countryList[key]
  let newlink = `https://flagsapi.com/${value}/flat/64.png`
  element.parentElement.querySelector('img').src = newlink
}

btn.addEventListener('click',(evt)=>{
  evt.preventDefault()
  updateinfo()
})

const updateinfo = async ()=>{
  let inputfield = document.querySelector('input')
  let inputval = inputfield.value
  if(inputval === '' || inputval < 1){
    inputval = 1
    inputfield.value = '1'
  }
  let URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`
  let response = await fetch(URL)
  let data = await response.json()
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()]
  let finalvalue = inputval * rate
  let finalamount = finalvalue.toFixed(2)
  msg.innerText = `${inputval} ${fromcurr.value} = ${finalamount} ${tocurr.value}`
}
window.addEventListener('load', ()=>{
  updateinfo()
})