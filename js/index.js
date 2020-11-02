//Api Web Storage -> Provê dois mecanismos para armazenar informações no Browser do usuário
// 1- sessionStorage -> grava os dados, porém os exclui se houver qualque reload ou fechamento do Browser
// 2- localStorage -> Grava os dados e os matém mesmo que o browser seja fechado ou dê reload

const buttonToAddTask = document.querySelector('button')
const inputTask = document.querySelector('input[type="text"]')
const boxAllTask = document.querySelector('ul') 
let tasks = []


function createsTheTaskStructure(){
    const task = document.createElement('li')
    const checkbox = document.createElement('input')
    const paragraph = document.createElement('p')
    const deleteIcon = document.createElement('i')
    checkbox.setAttribute('type','checkbox')        
    deleteIcon.classList.add('fas')
    deleteIcon.classList.add('fa-trash-alt')
    return [task, checkbox, paragraph, deleteIcon]
}

function addElementsInTask(task,...elements){
    elements.forEach((element) => {
        task.appendChild(element)
    })
}
function saveStateCheckbox(checkbox, objectTask){
    return function(){
        if(checkbox.checked){
            objectTask.checked = true
        } else {
            objectTask.checked = false
        }
        /* find index element in checkbox and update the localstorage  */    
        const index = tasks.findIndex((e)=> {
            return e.id === objectTask.id
        })
        tasks.splice(index,1,objectTask)
        localStorage.setItem('todos',JSON.stringify(tasks))
    }
}

function createTask(){
    const value = inputTask.value.trim() 
    if(value){
        /* Creating the elements */        
        const [task, checkbox, paragraph, deleteIcon] = createsTheTaskStructure()
                     
        
        /* content paragraph */
        paragraph.textContent = value

        /* Add elements in task */
        addElementsInTask(task,checkbox,paragraph,deleteIcon)

        /* add task in matrix */
        const objectTask = {
            id:Date.now(),//O método Date.now() retorna o número de milisegundos decorridos desde 1° de janeiro de 1970 00:00:00
            checked:false,
            taskTyped:value
        }
         
        /* Events*/
        deleteIcon.addEventListener('click',deleteTask(objectTask.id,task))
        checkbox.addEventListener('change',saveStateCheckbox(checkbox,objectTask))
        tasks.push(objectTask)
        localStorage.setItem('todos',JSON.stringify(tasks))
        return task
    }
}
function deleteTask(id,task){
    return function(){
        boxAllTask.removeChild(task)
        tasks = tasks.filter((e) => e.id !== id)
        localStorage.setItem('todos',JSON.stringify(tasks))
    }   
}

function addTask(){
    const task = createTask()
    if(task){
        boxAllTask.appendChild(task)
        inputTask.value = ''
    }
}
function renderTodos(){
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos.length){
        /* pegar cada tarefa, criar cada checkbox, checkada ou não, e é issooo */
        todos.forEach((objectTask) => {
            const [task, checkbox, paragraph, deleteIcon] = createsTheTaskStructure()
            paragraph.textContent = objectTask.taskTyped
            checkbox.checked = objectTask.checked

            /* Events delete and save state of checkbox */
            deleteIcon.addEventListener('click',deleteTask(objectTask.id,task))
            checkbox.addEventListener('change',saveStateCheckbox(checkbox,objectTask))

            addElementsInTask(task,checkbox,paragraph,deleteIcon)
            boxAllTask.appendChild(task)
        })
        tasks = [...todos]
    }
}

window.addEventListener('load',renderTodos)
buttonToAddTask.addEventListener('click',addTask)
document.addEventListener('keydown',function(event) {
    if(event.key == 'Enter'){   
        buttonToAddTask.click()
    }
})
// Adicionar funcionalidade de informar data de conclusão da atividade, e horário