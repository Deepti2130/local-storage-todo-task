const cl = console.log;
const todoform = document.getElementById("todoform");
const submitbtn = document.getElementById("submitbtn");
const updatebtn = document.getElementById("updatebtn");
const todoItemcontrol = document.getElementById("todoItem");
const todoListcontainer = document.getElementById("todoListcontainer");


const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;

        return value.toString(16);
    });
};


const onEdit = (ele) => {
let getEditId = ele.closest(`li`).id;
cl(getEditId)
localStorage.setItem("edited", getEditId);
let getObject = todoArr.find (todo => todo.todoId === getEditId)
cl(getObject)
todoItemcontrol.value = getObject.todoItem
submitbtn.classList.add('d-none')
updatebtn.classList.remove('d-none')
}

const templetingoflist = (arr) =>{
  let result = " ";

  arr.forEach(todo => {
     result += `<li class="list-group-item d-flex justify-content-between" id=${todo.todoId}>
                <span>${todo.todoItem}</span>
                <span>
                <button class="btn btn-primary btn-sm" onclick="onEdit(this)">Edit Item</button>
                <button class="btn btn-danger btn-sm">Remove Item</button>
                </span>
               </li>` 
  });
  todoListcontainer.innerHTML = result;
  
}


//let todoArr = [];

//if(localStorage.getItem("todoArr")){
   // todoArr = JSON.parse(localStorage.getItem("todoArr"));
//}

let todoArr = JSON.parse(localStorage.getItem("todoArr")) || []

if (todoArr.length > 0){
    templetingoflist(todoArr);
}

const Onsubmittodo = (event) =>{
  event.preventDefault();

  let todoobj = {
     todoItem:todoItemcontrol.value,
     todoId:generateUuid()

  }
  event.target.reset();
  //New object added in array.

  todoArr.unshift(todoobj);

  //store/update array in local storage in the form of JSON.

  localStorage.setItem("todoArr", JSON.stringify(todoArr));

  //get array from local storage in the form of JSON
  
  todoArr = JSON.parse(localStorage.getItem("todoArr"));

  //send that array in the form of object into templeting function 
  templetingoflist(todoArr);
}

const ontodoupdate =() => {
    let getupdatedId =localStorage.getItem("edited");
    cl(getupdatedId);

    let updatedObj = {
        todoItem:todoItemcontrol.value,
        todoId:getupdatedId
    }
    cl(updatedObj);
    todoItemcontrol.value = ' '

    let getIndex = todoArr.findIndex(todo => todo.todoId === getupdatedId);
    cl(getIndex);
    todoArr[getIndex] = updatedObj;
    localStorage.setItem("todoArr", JSON.stringify(todoArr));
    templetingoflist(todoArr);
    submitbtn.classList.remove('d-none')
    updatebtn.classList.add('d-none')
}   

todoform.addEventListener("submit", Onsubmittodo);
updatebtn.addEventListener("click", ontodoupdate);