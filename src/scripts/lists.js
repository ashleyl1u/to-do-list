import { closeOverlay } from "./overlay";
import { renderContent , renderTasks} from "./tasks";


export class List {
  constructor(title){
    this.title = title;
    this.tasks = [];
    this.completedTasks = [];
  }

  get tasks(){
    return this._tasks;
  }

  set tasks(tasks){
    this._tasks = tasks;
  }

  get title(){
    return this._title;
  }

  set title(title){
    this._title = title;
  }

  get completedTasks(){
    return this._completedTasks;
  }

  set completedTasks(completedTasks){
    this._completedTasks = completedTasks;
  }
}


let listsString = localStorage.getItem('lists');
export let lists = JSON.parse(listsString);


if (lists === null){
  console.log('nothing');
  lists = [];
}



export function renderLists() {
  const listContainer = document.getElementById('list-container');
  listContainer.innerHTML = '';

  lists.forEach((list, index) =>{
    const listContent = document.createElement('div');
    listContent.classList.add('list-content');
    listContent.setAttribute('id', index);

    const listBtn = document.createElement('div');
    listBtn.textContent = list._title;

    const listDeleteBtn = document.createElement('button');
    listDeleteBtn.textContent = 'x';
    listDeleteBtn.classList.add('delete-list-btn');
    listDeleteBtn.setAttribute('id', index);


    listContent.appendChild(listBtn);
    listContent.appendChild(listDeleteBtn);

    listContainer.appendChild(listContent);
  });

  addListListeners();
}

function addListListeners(){
  document.querySelectorAll('.delete-list-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      removeList(btn.getAttribute('id'));
    });
  });

  document.querySelectorAll('.list-content').forEach((list) => {
    list.addEventListener('click', () => {
      document.getElementById('content').innerHTML='';
      renderContent(lists[list.getAttribute('id')]);
      renderTasks(lists[list.getAttribute('id')]);
    });
  });
}

function removeList(index) {
  lists.splice(index,1);
  renderLists();
  localStorage.setItem('lists', JSON.stringify(lists));
}





export function renderNewListForm(){
  const newListForm = document.createElement('form');
  newListForm.setAttribute('id','new-list-form');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'List Name:';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'list-name-input');

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'list-name-error-msg');

  const formBtn = document.createElement('button');
  formBtn.textContent = 'Enter';
  formBtn.setAttribute('id', 'list-submit-btn');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.setAttribute('id', 'list-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  
  newListForm.appendChild(nameLabel);
  newListForm.appendChild(nameInput);
  newListForm.appendChild(errorMsg);
  newListForm.appendChild(formBtn);
  newListForm.appendChild(cancelBtn);

  document.getElementById('overlay').innerHTML ='';
  document.getElementById('overlay').appendChild(newListForm);

  addNewListListeners();
}


function addNewListListeners() {
  document.getElementById('list-cancel-btn').addEventListener('click', () => {
    closeOverlay();
    resetForm();
  });

  document.getElementById('new-list-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const listName = document.getElementById('list-name-input').value;
    
    if(listName === ''){
      document.getElementById('list-name-error-msg').textContent = '*Required';
    }
    else{
      resetForm();
      closeOverlay();
      addList(listName);
      renderLists();
    }
    
  });

  document.getElementById('list-name-input').addEventListener('focus', () => {
    document.getElementById('list-name-error-msg').textContent = '';
  });
}


function addList (listName){
  lists.push(new List(listName));
  localStorage.setItem('lists', JSON.stringify(lists));
  
}

function resetForm(){
  document.getElementById('list-name-input').value = '';
  document.getElementById('list-name-error-msg').textContent= '';
}