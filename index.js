let wrapper = document.querySelector('.container');
let InputEl = document.querySelector('.enter-task');
let containerEl = document.querySelector('.reverse');
let checkedInput = document.getElementById('checked');
let list = JSON.parse(localStorage.getItem('list'))

if(list){
  list.forEach(task => {
    createTask(task)
  });
}
// localStorage.setItem('createTask', 'createTask()')
function createTask(task){
  let insertedText = InputEl.value;

  if(task){
    insertedText = task.name
  }
  
  
  if(insertedText!== ''){
    
    var newTask = document.createElement('div')

    if(task && task.checked){
     newTask.classList.add('active')
   }
     containerEl.appendChild(newTask);
     newTask.classList.add('new-task')
     newTask.innerHTML = `<span>${insertedText}</span>  <div class="control">
     <input type="checkbox" name="" id="checked" checked>
     <i class="fa-solid fa-trash"></i>
     </div> `
     
     InputEl.value = ''
    
    // adding eventlistener to the trash icon
    if(containerEl.contains(newTask)){
      let iconEl =document.querySelectorAll('.new-task i')
      iconEl.forEach(element => {
        element.addEventListener('click',(e)=>{
          if(newTask.contains(e.target)){
            newTask.remove()
            upDateLocalStorage() 
          }
        })
      });
    }
    
    // adding eventlistener to the checkbox
    if(containerEl.contains(newTask)){
      let checkedInputs =document.querySelectorAll('.new-task input')
      checkedInputs.forEach(input => {
        input.addEventListener('click',(e)=>{
          e.preventDefault()
          if(newTask.classList.contains('active')){
          
            newTask.classList.remove('active')
            upDateLocalStorage() 
          }else{
            
            newTask.classList.add('active')
            upDateLocalStorage() 
          }
        })
      });
    }
  }
  upDateLocalStorage() 
}


function upDateLocalStorage(){
  const divs = document.querySelectorAll('.new-task')
    list = []
  divs.forEach(divEl => {
    list.push({
      name: divEl.innerText,
      checked: divEl.classList.contains('active')
    })
  });
  localStorage.setItem('list', JSON.stringify(list))
}

wrapper.addEventListener('submit', (event)=>{
  event.preventDefault()

  createTask()
})

// console.log(localStorage.getItem('create'));
