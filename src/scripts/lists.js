import { renderListHeader , renderTasks} from "./tasks";
import { setClickedStyle } from "./side-bar";
import { renderListContent, renderAllListContent } from "./content";
import deleteIcon from '../icons/delete.svg';
import '../styles/list-form.css';


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


export let lists = JSON.parse(localStorage.getItem('lists')) === null ? [] : JSON.parse(localStorage.getItem('lists'));

function updateLocalStorage(){
  localStorage.setItem('lists', JSON.stringify(lists));
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

  document.querySelectorAll('.list-content').forEach((list, index) => {
    list.addEventListener('click', () => {
      setClickedStyle(index);
      
      const clickedList = lists[list.getAttribute('id')];
      renderListContent(clickedList);
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
  updateLocalStorage();

  renderAllListContent();
}


export function addNewList (listName){
  const newList = new List(listName); 
  lists.push(newList);
  localStorage.setItem('lists', JSON.stringify(lists));
  renderListContent(newList);
}

