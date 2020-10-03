//Api Web Storage -> Provê dois mecanismos para armazenar informações no Browser do usuário
// 1- sessionStorage -> grava os dados, porém os exclui se houver qualque reload ou fechamento do Browser
// 2- localStorage -> Grava os dados e os matém mesmo que o browser seja fechado ou dê reload

const button = document.querySelector('button')
const inputTask = document.querySelector('input[type="text"]')
const boxAllTask = document.querySelector('ul') 


function verifyLocalStorage(keys){
    return function(){
        keys.forEach(key => boxAllTask.innerHTML += localStorage.getItem(key))
    }
}

function createItems(){    
    const taskTyped = inputTask.value
    if(taskTyped.length > 0){ 
        const boxTask = document.createElement('li')    
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
        inputTask.value = ""
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

// Adicionar funcionalidade para verificar no momento do carregamento se a checkbox estava checkada ou não na última entrada do usuário
// Adicionar funcionalidade de informar data de conclusão da atividade, e horário
