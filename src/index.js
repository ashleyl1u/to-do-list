import './styles/main.css';
import { renderContent, Task , renderTasks} from './scripts/tasks';
import {  List , lists} from './scripts/lists';
import { renderSideBar } from './scripts/side-bar';



/*

const tempTask = new List('Grocery');
tempTask.tasks.push(new Task('Buy cookies', ''));
tempTask.tasks.push(new Task('Buy apples', ''));

tempTask.completedTasks.push(new Task('Buy oranges', ''));

const tempTask2 = new List('Homework');
tempTask2.tasks.push(new Task('Finish assignment', 'Math'));


lists.push(tempTask);
lists.push(tempTask2);
*/

renderSideBar();

document.getElementById('content').innerHTML='';
lists.forEach((list) => {
  
  renderContent(list);
  renderTasks(list);
});

/*
  create an all page 
 get item --> if null --> create a list
*/ 