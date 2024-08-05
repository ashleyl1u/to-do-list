import { closeOverlay } from "./overlay";
import { renderContent , renderTasks} from "./tasks";
import deleteIcon from '../icons/delete.svg';


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
    const deleteImg = new Image();
    deleteImg.src = deleteIcon;
    listDeleteBtn.appendChild(deleteImg);
    listDeleteBtn.classList.add('delete-list-btn');
    listDeleteBtn.setAttribute('id', `delete-list-btn-${index}`);

    const listTaskCount = document.createElement('h6');
    listTaskCount.textContent = list._tasks.length;
    listTaskCount.classList.add('list-task-count');
    listTaskCount.setAttribute('id', `list-task-count-${index}`);
  



    listContent.appendChild(listBtn);
    listContent.appendChild(listDeleteBtn);
    listContent.appendChild(listTaskCount);

    listContainer.appendChild(listContent);
  });

  addListListeners();
}

function addListListeners(){
  document.querySelectorAll('.delete-list-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      const listIndex = btn.getAttribute('id').split('-')[3];
      removeList(listIndex);
    });
  });

  document.querySelectorAll('.list-content').forEach((list) => {
    list.addEventListener('click', () => {
      document.getElementById('content').innerHTML='';
      renderContent(lists[list.getAttribute('id')]);
      renderTasks(lists[list.getAttribute('id')]);
    });

    list.addEventListener('mouseover', () =>  {
      const deletebtn = document.getElementById(`delete-list-btn-${list.getAttribute('id')}`);
      deletebtn.style.display = 'block';

      const taskCount = document.getElementById(`list-task-count-${list.getAttribute('id')}`);
      taskCount.style.display = 'none';
    });
    list.addEventListener('mouseout', () =>  {
      const deletebtn = document.getElementById(`delete-list-btn-${list.getAttribute('id')}`);
      deletebtn.style.display = 'none';

      const taskCount = document.getElementById(`list-task-count-${list.getAttribute('id')}`);
      taskCount.style.display = 'block';
    });
  });


}

function removeList(index) {
  lists.splice(index,1);
  renderLists();
  localStorage.setItem('lists', JSON.stringify(lists));

  document.getElementById('content').innerHTML='';
  lists.forEach((list) => {
    renderContent(list);
    renderTasks(list);
  });
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
    let errorFlag = false;

    lists.forEach((list) => {
      
      if(list._title === listName){
        document.getElementById('list-name-error-msg').textContent = '*List Already Exists';
        errorFlag = true;
       
      }
    });
    
    if(listName === ''){
      document.getElementById('list-name-error-msg').textContent = '*Required';
      errorFlag = true;
    }


    if(errorFlag === false){

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
  const newList = new List(listName)
  lists.push(newList);
  localStorage.setItem('lists', JSON.stringify(lists));
  document.getElementById('content').innerHTML='';
  renderContent(newList);
  renderTasks(newList);
}

function resetForm(){
  document.getElementById('list-name-input').value = '';
  document.getElementById('list-name-error-msg').textContent= '';
}