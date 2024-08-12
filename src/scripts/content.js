
import {  } from "./tasks";
import { renderTasks } from "./tasks";
import { lists , renderListHeader} from "./lists";
import { setClickedStyle } from "./side-bar";
import { format } from "date-fns";


export function renderListContent(list){
  document.getElementById('content').innerHTML='';
  renderListHeader(list);
  renderTasks(list);
}

export function renderAllListContent(){
  setClickedStyle('all-btn');
  document.getElementById('content').innerHTML='';
  lists.forEach((list) => {
    renderListHeader(list);
    renderTasks(list);
  });
  renderContentHeader('ALL');

  document.querySelectorAll('.list-title').forEach((header) =>{
    header.style.fontWeight = '500';
  });
}


export function renderTodayListContent(){
    setClickedStyle('today-btn');

    document.getElementById('content').innerHTML = '';
    lists.forEach((list) => {
      renderListHeader(list);
      renderTasks(list);
      showOnlyTodayTasks(list);
    });
    renderContentHeader('TODAY');

    lists.forEach((list) => {
      updateListInfo(list);
    });
    
    document.querySelectorAll('.list-title').forEach((header) =>{
      header.style.fontWeight = '500';
    });

}

function renderContentHeader(title){
  const mainTitle = document.createElement('h1');
  mainTitle.textContent = title;
  mainTitle.setAttribute('id', `main-list-title`);
  mainTitle.classList.add('main-list-title');

  document.getElementById('main-list-header-container').appendChild(mainTitle);

}


export function showOnlyTodayTasks(list){
  const today = new Date();
  const todaysDate = format(today, 'yyyy-MM-dd');
  
  list._tasks.forEach((task, index) => {
    const taskDate = task._dueDate;
    if(taskDate === ''){
      document.getElementById(`task-content-uncomplete-${index}-${list._title}`).style.display = 'none';
    }
    else if (taskDate !== todaysDate){
      document.getElementById(`task-content-uncomplete-${index}-${list._title}`).style.display = 'none';
    }
    
  })

  list._completedTasks.forEach((task, index) => {
    const taskDate = task._dueDate;
    if(taskDate === ''){
      document.getElementById(`task-content-complete-${index}-${list._title}`).style.display = 'none';
    }
    else if (taskDate !== todaysDate){
      document.getElementById(`task-content-complete-${index}-${list._title}`).style.display = 'none';
    }
  })
}

export function updateListInfo(list){
  let taskRemaining = list._tasks.length;
  let taskCompleted = list._completedTasks.length;

  const mainListTitle = document.getElementById('main-list-title');
  if(mainListTitle !== null){
    if(mainListTitle.textContent === 'TODAY'){
      taskRemaining =0;
      taskCompleted = 0;

      const today = new Date();
      const todaysDate = format(today, 'yyyy-MM-dd');
      
      list._tasks.forEach((task) => {
        const taskDate = task._dueDate;
        if (taskDate === todaysDate){
          taskRemaining++;
        }
      })

      list._completedTasks.forEach((task) => {
        const taskDate = task._dueDate;
        if (taskDate === todaysDate){
          taskCompleted++;
        }
      })
    }
  }

  console.log((`list-info-${list._title}`));
  document.getElementById(`list-info-${list._title}`).textContent = `${taskRemaining} Tasks Remaining · ${taskCompleted} Completed`;


}