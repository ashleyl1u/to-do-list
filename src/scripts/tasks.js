
import '../styles/tasks.css';
import { openOverlay, closeOverlay} from './overlay';
import { lists, renderLists } from './lists';
import {format} from 'date-fns';
import editIcon from '../icons/edit.svg';
import deleteIcon from '../icons/delete.svg';
import addIcon from '../icons/add.svg';
import {setClickedStyle, showOnlyTodayTasks, updateTaskCount} from './side-bar';
import '../styles/task-form.css';

export class Task{
  constructor(title, note = '', dueDate = ''){
    this.title = title;
    this.note = note;
    this.dueDate = dueDate; 
  }

  set title(title){
    this._title = title;
  }

  set note (note){
    this._note = note;
  }

  get title(){
    return this._title;
  }

  get note(){
    return this._note;
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate (dueDate) {
    this._dueDate = dueDate;
  }

}


export function renderContent(list) {
  const listContentContainer = document.createElement('div');

  const mainListTitle = document.createElement('div');
  mainListTitle.setAttribute('id', 'main-list-header-container');
  listContentContainer.appendChild(mainListTitle);
  
  const tasksHeader = document.createElement('div');
  tasksHeader.classList.add('tasks-header');

  const listName = document.createElement('h1');
  listName.textContent = list._title;
  listName.classList.add('list-title');


  const newTaskBtn = document.createElement('button');
  const addImg = new Image();
  addImg.src = addIcon;
  addImg.classList.add('add-icon');
  newTaskBtn.setAttribute('id',`new-task-btn-${list._title}`);
  newTaskBtn.classList.add('new-task-btn');
  newTaskBtn.textContent += '+';

  tasksHeader.appendChild(listName);
  tasksHeader.appendChild(newTaskBtn);

  listContentContainer.appendChild(tasksHeader);

  const taskContainer = document.createElement('div');
  taskContainer.setAttribute('id',  `uncompleted-task-container-${list._title}`);

  const completedTaskContainer = document.createElement('div');
  completedTaskContainer.setAttribute('id', `completed-task-container-${list._title}`);
  completedTaskContainer.style.display = 'none';

  
  const listInfoContainer = document.createElement('div');
  listInfoContainer.classList.add('list-info-container');
  
  const listInfo = document.createElement('div');
  listInfo.setAttribute('id', `list-info-${list._title}`);
  listInfo.textContent = `${list._tasks.length} Tasks Remaining · ${list._completedTasks.length} Completed`;
  listInfo.classList.add('list-info');


  const showHideBtn = document.createElement('button');
  showHideBtn.textContent = 'show';
  showHideBtn.setAttribute('id',`show-hide-btn-${list._title}`);
  showHideBtn.classList.add('show-hide-btn');

  listInfoContainer.appendChild(listInfo);
  listInfoContainer.appendChild(showHideBtn);
  listContentContainer.appendChild(listInfoContainer);

  listContentContainer.appendChild(taskContainer);
  listContentContainer.appendChild(completedTaskContainer);

  document.getElementById('content').appendChild(listContentContainer);



  addContentListeners(list);


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

  document.getElementById(`list-info-${list._title}`).textContent = `${taskRemaining} Tasks Remaining · ${taskCompleted} Completed`;


}

function addContentListeners(list){

  document.getElementById(`new-task-btn-${list._title}`).addEventListener('click', () => {
    openOverlay();
    renderTaskForm(list, 'add', 'n/a');
  });

  document.getElementById(`show-hide-btn-${list._title}`).addEventListener('click', () => {
    const completedTaskContainer = document.getElementById(`completed-task-container-${list._title}`);

    const showHideBtn = document.getElementById(`show-hide-btn-${list._title}`);
    const listStatus = showHideBtn.textContent;
     listStatus === 'show' ? completedTaskContainer.style.display = 'block' : completedTaskContainer.style.display = 'none';
     listStatus === 'show' ? showHideBtn.textContent = 'hide': showHideBtn.textContent = 'show';
  });


 
}

export function formatDate (dueDate){
  if(dueDate === ''){
    return '';
  }
  const dateInfo = dueDate.split('-');
  const date = new Date(dateInfo[0], dateInfo[1], dateInfo[2]);
  return (format(date,'MMM d, yyyy'));
}

function renderUncompletedTasks(task, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.classList.add(`task-content-${list._title}`);
  taskContent.setAttribute('id', `task-content-uncomplete-${index}-${list._title}`);
  

  const taskContentLeft = document.createElement('div');
  taskContentLeft.classList.add('task-content-left');
  
  const taskContentRight = document.createElement('div');
  taskContentRight.classList.add('task-content-right');

  const taskContentMain = document.createElement('div');
  taskContentMain.classList.add('task-main-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-unchecked-${list._title}`);
  checkbox.classList.add( `checkbox-unchecked`);
  checkbox.setAttribute('id', index);

  taskContentMain.appendChild(checkbox);

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  taskTitle.textContent = task._title;

  const taskNote = document.createElement('h6');
  taskNote.textContent = task._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(task._dueDate);

  taskContentMain.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);

  taskContentLeft.appendChild(taskContentMain);
  taskContentLeft.appendChild(taskInfo);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');
  btnContainer.setAttribute('id', `btn-container-${list._title}-uncomplete-${index}`);

  const taskDeleteBtn = document.createElement('button');
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  taskDeleteBtn.appendChild(deleteImg);
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.classList.add(`task-delete-btn`);
  taskDeleteBtn.setAttribute('id', `unchecked-${index}`);

  const taskEditBtn = document.createElement('button');
  const editImg = new Image ();
  editImg.src = editIcon;
  taskEditBtn.appendChild(editImg);
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.classList.add(`task-edit-btn`);
  taskEditBtn.setAttribute('id', `unchecked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);
  

  taskContentRight.appendChild(btnContainer);

  taskContent.appendChild(taskContentLeft);
  taskContent.appendChild(taskContentRight);

  document.getElementById(`uncompleted-task-container-${list._title}`).appendChild(taskContent);
}

function renderCompletedTasks(completeTask, index, list){
  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');
  taskContent.classList.add(`task-content-${list._title}`);
  taskContent.classList.add('complete');
  taskContent.setAttribute('id', `task-content-complete-${index}-${list._title}`);

  const taskContentLeft = document.createElement('div');
  taskContentLeft.classList.add('task-content-left');
  
  const taskContentRight = document.createElement('div');
  taskContentRight.classList.add('task-content-right');

  const taskContentMain = document.createElement('div');
  taskContentMain.classList.add('task-main-content');

  const checkbox = document.createElement('div');
  checkbox.classList.add( `checkbox-checked-${list._title}`);
  checkbox.classList.add( `checkbox-checked`);
  checkbox.setAttribute('id', index);

  taskContentMain.appendChild(checkbox);

  const checkboxStatus = document.createElement('div');
  checkbox.appendChild(checkboxStatus);
  checkboxStatus.classList.add('checked');

  const taskInfo = document.createElement('div');
  taskInfo.classList.add('task-info');

  const taskTitle = document.createElement('h4');
  
  taskTitle.textContent = completeTask._title;

  const taskNote = document.createElement('h6');
  taskNote.textContent = completeTask._note;

  const taskDueDate = document.createElement('h5');
  taskDueDate.textContent = formatDate(completeTask._dueDate);

  taskContentMain.appendChild(taskTitle);
  taskInfo.appendChild(taskNote);
  taskInfo.appendChild(taskDueDate);

  taskContentLeft.appendChild(taskContentMain);
  taskContentLeft.appendChild(taskInfo);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('task-btn-container');
  btnContainer.setAttribute('id', `btn-container-${list._title}-complete-${index}`);

  const taskDeleteBtn = document.createElement('button');
  const deleteImg = new Image();
  deleteImg.src = deleteIcon;
  taskDeleteBtn.appendChild(deleteImg);
  taskDeleteBtn.classList.add(`task-delete-btn-${list._title}`);
  taskDeleteBtn.classList.add(`task-delete-btn`);
  taskDeleteBtn.setAttribute('id', `checked-${index}`);

  const taskEditBtn = document.createElement('button');
  const editImg = new Image ();
  editImg.src = editIcon;
  taskEditBtn.appendChild(editImg);
  taskEditBtn.classList.add(`task-edit-btn-${list._title}`);
  taskEditBtn.classList.add(`task-edit-btn`);
  taskEditBtn.setAttribute('id', `checked-${index}`);

  btnContainer.appendChild(taskEditBtn);
  btnContainer.appendChild(taskDeleteBtn);

  taskContentRight.appendChild(btnContainer);

  taskContent.appendChild(taskContentLeft);
  taskContent.appendChild(taskContentRight);

  document.getElementById(`completed-task-container-${list._title}`).appendChild(taskContent);
}


export function renderTasks (list) {
  const tasks = list._tasks;
  const completedTasks = list._completedTasks;

  document.getElementById(`uncompleted-task-container-${list._title}`).innerHTML = '';
  tasks.forEach((task, index) =>{

    renderUncompletedTasks(task, index, list);
    
  });

  document.getElementById(`completed-task-container-${list._title}`).innerHTML = '';
  completedTasks.forEach((completeTask, index) => {
    renderCompletedTasks(completeTask, index, list);
    
  });

  
  addTaskListeners(list);
  
}



function addTaskListeners(list){
  document.querySelectorAll(`.checkbox-unchecked-${list._title}`).forEach((uncheckedCheckbox) => {
    uncheckedCheckbox.addEventListener('click', () => {
      updateTaskLists(uncheckedCheckbox.getAttribute('id'), list._tasks, list._completedTasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      
      updateTaskCount(list);
      updateListInfo(list);
    });
  });

  document.querySelectorAll(`.checkbox-checked-${list._title}`).forEach((checkedCheckbox) => {
    checkedCheckbox.addEventListener('click', () => {

      updateTaskLists( checkedCheckbox.getAttribute('id'), list._completedTasks, list._tasks);
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      updateTaskCount(list);
      updateListInfo(list);
    });
  });

  document.querySelectorAll(`.task-delete-btn-${list._title}`).forEach((btn) =>{
    btn.addEventListener('click', () => {
      const btnId = btn.getAttribute('id');
      const btnInfo = btnId.split('-');

      if(btnInfo[0] === 'unchecked'){
        list._tasks.splice(btnInfo[1],1);
      }
      else{
        list._completedTasks.splice(btnInfo[1],1);
      }
      renderTasks(list);
      localStorage.setItem('lists', JSON.stringify(lists));
      updateTaskCount(list);
      
      updateListInfo(list);
    });
  });


  document.querySelectorAll(`.task-edit-btn-${list._title}`).forEach((btn) =>{
    btn.addEventListener('click', () => {
      const btnInfo = btn.getAttribute('id').split('-');
      const taskList = btnInfo[0] === 'unchecked' ? list._tasks : list._completedTasks;
      const taskIndex = btnInfo[1];

      openOverlay();
      renderTaskForm(list, 'update', taskList[taskIndex]);
      fillInUpdateTaskForm(taskList[taskIndex]);
    })
  })

  document.querySelectorAll(`.task-content-${list._title}`).forEach((task) =>{
    task.addEventListener('mouseover', () => {
      const taskInfo = task.getAttribute('id').split('-');
      const taskType = taskInfo[2];
      const taskIndex = taskInfo[3];

      const btnContainer = document.getElementById(`btn-container-${list._title}-${taskType}-${taskIndex}`);
      btnContainer.style.display = 'flex';


    })
  })

  document.querySelectorAll(`.task-content-${list._title}`).forEach((task) =>{
    task.addEventListener('mouseout', () => {
      const taskInfo = task.getAttribute('id').split('-');
      const taskType = taskInfo[2];
      const taskIndex = taskInfo[3];

      const btnContainer = document.getElementById(`btn-container-${list._title}-${taskType}-${taskIndex}`);
      btnContainer.style.display = 'none';


    })
  })
  
  
}

function fillInUpdateTaskForm (taskInfo){
  document.getElementById('task-title-input').value = taskInfo._title;
  document.getElementById('task-note-input').value = taskInfo._note;
  document.getElementById('task-date-input').value = taskInfo._dueDate;
}




function updateTaskLists(index, removeArr, addArr) {
  const removedTask = removeArr.splice(index, 1);
  addArr.push(removedTask[0]);

}


function renderTaskForm(list, type, taskInfo){
  const newTaskForm = document.createElement('form');
  newTaskForm.setAttribute('id', 'task-form');

  const taskFormTop = document.createElement('div');
  taskFormTop.setAttribute('id', 'task-form-top');

  const taskFormBottom = document.createElement('div');
  taskFormBottom.setAttribute('id', 'task-form-bottom');

  const newTaskFormTitle = document.createElement('h1');
  newTaskFormTitle.textContent = 'New Task';

  const taskTitleLabel = document.createElement('label');
  taskTitleLabel.textContent = 'Tasks';

  const taskTitleInput = document.createElement('input');
  taskTitleInput.placeholder = 'Enter Task';
  taskTitleInput.setAttribute('id', 'task-title-input');

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'task-title-error-msg');

  const taskNoteLabel = document.createElement('label');
  taskNoteLabel.textContent = 'Note';

  const taskNoteInput = document.createElement('input');
  taskNoteInput.placeholder = 'Note';
  taskNoteInput.setAttribute('id', 'task-note-input');

  const taskDateLabel = document.createElement('label');
  taskDateLabel.textContent = 'Due Date'

  const taskDateInput = document.createElement('input');
  taskDateInput.setAttribute('type', 'date');
  taskDateInput.setAttribute('id', 'task-date-input');
  

  const btnContainer = document.createElement('div');
  btnContainer.setAttribute('id', 'task-form-btn-container');
  

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.setAttribute('id', 'task-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Add';
  submitBtn.setAttribute('id', 'task-submit-btn');
  submitBtn.setAttribute('name', 'action');
  submitBtn.setAttribute('value', 'add');

  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update';
  updateBtn.setAttribute('id', 'task-update-btn');
  updateBtn.setAttribute('name', 'action');
  updateBtn.setAttribute('value', 'update');

  if(type === 'add'){
    submitBtn.style.display = 'block';
    updateBtn.style.display = 'none';
  }
  if (type === 'update'){
    submitBtn.style.display = 'none';
    updateBtn.style.display = 'block';
  }

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(submitBtn);
  btnContainer.appendChild(updateBtn);

  taskFormTop.appendChild(newTaskFormTitle);
  taskFormTop.appendChild(taskTitleLabel);
  taskFormTop.appendChild(taskTitleInput);
  taskFormTop.appendChild(errorMsg);
  taskFormTop.appendChild(taskNoteLabel);
  taskFormTop.appendChild(taskNoteInput);
  taskFormTop.appendChild(taskDateLabel);
  taskFormTop.appendChild(taskDateInput);
  taskFormBottom.appendChild(btnContainer);

  newTaskForm.appendChild(taskFormTop);
  newTaskForm.appendChild(taskFormBottom);


  document.getElementById('overlay').innerHTML ='';
  document.getElementById('overlay').appendChild(newTaskForm);

  addTaskFormListeners(list, taskInfo);
}

function addTaskFormListeners(list, taskInfo){
  document.getElementById('task-cancel-btn').addEventListener('click',() => {
    closeOverlay();
  })

  document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const action = e.submitter.value;

    const taskTitle = document.getElementById('task-title-input').value;
    const taskNote = document.getElementById('task-note-input').value;
    const taskDueDate = document.getElementById('task-date-input').value;

    if(taskTitle === ''){
      document.getElementById('task-title-error-msg').textContent = '*Required';
      document.getElementById('task-title-input').style.outlineColor = 'red';
    }
    else{
      if(action === 'add'){
      
        list._tasks.push(new Task(taskTitle, taskNote, taskDueDate));
        renderTasks(list);
        resetTaskForm();
        closeOverlay();
        updateTaskCount(list);
        updateListInfo(list);


      }

      if (action === 'update'){
        taskInfo._title = taskTitle;
        taskInfo._note = taskNote;
        taskInfo._dueDate = taskDueDate;
        renderTasks(list);
        resetTaskForm();
        closeOverlay();
        updateTaskCount(list);
        
      }

      localStorage.setItem('lists', JSON.stringify(lists));
      
      const mainListTitle = document.getElementById('main-list-title');
      if(mainListTitle !== null){
        if(mainListTitle.textContent === 'TODAY'){
          showOnlyTodayTasks(list);
        }
      }

      lists.forEach((list) => {
        updateListInfo(list);
      });
      
    }
    
  });


  document.getElementById('task-title-input').addEventListener('focus', () => {
    document.getElementById('task-title-error-msg').textContent = '';
    document.getElementById('task-title-input').style.outlineColor = 'var(--grey-8)';
  })

}

function resetTaskForm(){
  document.getElementById('task-form').reset();
}



