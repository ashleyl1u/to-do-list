import '../styles/overlay.css';
import '../styles/list-form.css';
import { addNewList, lists , renderLists} from './lists';
import { renderTasks, addNewTask, updateTask } from './tasks';
import { updateTaskCount } from './side-bar';
import { updateListInfo, showOnlyTodayTasks} from './content';


export function openOverlay(){
  document.getElementById('overlay').style.display = 'block';
}

export function closeOverlay(){
  document.getElementById('overlay').style.display = 'none';
}




export function renderNewListForm(){
  openOverlay();
  const newListForm = document.createElement('form');
  newListForm.setAttribute('id','new-list-form');

  const formTitle = document.createElement('h1');
  formTitle.textContent = 'New List';
  formTitle.setAttribute('id','new-list-form-title');

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name';

  const nameInput = document.createElement('input');
  nameInput.setAttribute('id', 'list-name-input');
  nameInput.placeholder = 'Enter List Name';

  const errorMsg = document.createElement('div');
  errorMsg.setAttribute('id', 'list-name-error-msg');

  const inputContainer = document.createElement('div');
  inputContainer.setAttribute('id', 'new-list-form-input-container');

  inputContainer.appendChild(nameLabel);
  inputContainer.appendChild(nameInput);
  inputContainer.appendChild(errorMsg);

  const formBtn = document.createElement('button');
  formBtn.textContent = 'Add';
  formBtn.setAttribute('id', 'list-submit-btn');

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.setAttribute('id', 'list-cancel-btn');
  cancelBtn.setAttribute('type', 'reset');

  const formTop = document.createElement('div');
  formTop.setAttribute('id', 'new-list-form-top');

  const formBottom = document.createElement('div');
  formBottom.setAttribute('id', 'new-list-form-bottom');

  

  formTop.appendChild(formTitle);
  formTop.appendChild(inputContainer);
  formBottom.appendChild(cancelBtn);
  formBottom.appendChild(formBtn);
  

  newListForm.appendChild(formTop);
  newListForm.appendChild(formBottom);

  document.getElementById('overlay').innerHTML ='';
  document.getElementById('overlay').appendChild(newListForm);

  addNewListListeners();
}


function addNewListListeners() {
  document.getElementById('list-cancel-btn').addEventListener('click', () => {
    closeOverlay();
  });

  document.getElementById('new-list-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const listName = document.getElementById('list-name-input').value;
    let errorFlag = false;

    lists.forEach((list) => {
      
      if(list._title === listName){
        displayErrorMsg('*List Already Exists', 'list-name-error-msg', 'list-name-input');
        errorFlag = true;
       
      }
    });
    
    if(listName === ''){
      displayErrorMsg('*Required', 'list-name-error-msg', 'list-name-input');
      errorFlag = true;
    }


    if(errorFlag === false){

      resetForm('new-list-form');
      closeOverlay();
      addNewList(listName);
      renderLists();
    }
    
  });

  document.getElementById('list-name-input').addEventListener('focus', () => {
    document.getElementById('list-name-error-msg').textContent = '';
    document.getElementById('list-name-input').style.outlineColor = 'var(--grey-8)';
  });
}


export function renderTaskForm(list, type, taskToUpdate){
  openOverlay();
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

  addTaskFormListeners(list, taskToUpdate);
}

function addTaskFormListeners(list, taskToUpdate){
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
      displayErrorMsg('*Required', 'task-title-error-msg', 'task-title-input');
    }
    else{
      if(action === 'add'){
        addNewTask(list, new Task (taskTitle, taskNote, taskDueDate));
        resetForm('task-form');
        closeOverlay();

      }

      if (action === 'update'){
        updateTask(taskToUpdate, taskTitle, taskNote, taskDueDate, list);

        
        resetForm('task-form');
        closeOverlay();
        
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

function displayErrorMsg(msg, errorDiv, inputElement){
  document.getElementById(errorDiv).textContent = `${msg}`;
  document.getElementById(inputElement).style.outlineColor = 'red';
}

function resetForm(formElementId){
  document.getElementById(formElementId).reset();
}