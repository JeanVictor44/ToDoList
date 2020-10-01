//Api Web Storage -> Provê dois mecanismos para armazenar informações no Browser do usuário
// 1- sessionStorage -> grava os dados, porém os exclui se houver qualque reload ou fechamento do Browser
// 2- localStorage -> Grava os dados e os matém mesmo que o browser seja fechado ou dê reload

const button = document.querySelector('button')
const input = document.querySelector('input[type="text"]')
const boxAllTask = document.querySelector('ul') 


function verifyLocalStorage(keys){
    return function(){
        keys.forEach(key => boxAllTask.innerHTML += localStorage.getItem(key))
    }
}

function createItems(){
    const taskTyped = input.value
    const boxTask = document.createElement('li')
    
    if(taskTyped.length > 0){
        const checkBox = document.createElement('input')
        checkBox.setAttribute('type','checkbox') 
        const paragraph = document.createElement('p')
        paragraph.textContent = taskTyped 
        console.log(paragraph)
        boxTask.appendChild(checkBox) 
        boxTask.appendChild(paragraph)
        boxAllTask.appendChild(boxTask)
        
        //Gravar item no localStorage
        localStorage.setItem(document.querySelectorAll('li').length,`<li> <input type="checkbox"> <p>${taskTyped}</p></li>`) 
        input.value = ""
    }
}

function insertTask(e){
    if(e.key == 'Enter'){
        button.click()
    }
}

window.addEventListener('load',verifyLocalStorage(Object.keys(localStorage) ))
button.addEventListener('click',createItems)
document.addEventListener('keydown',insertTask)

//adicionar funcionalidade de gravar se a checkbox estava checkada ou não
// Adicionar funcionalidade de informar data de conclusão da atividade, e horário
