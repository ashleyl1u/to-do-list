import './styles/main.css';
import { renderContent, Task } from './scripts/tasks';
import {  List } from './scripts/lists';
import { renderSideBar } from './scripts/side-bar';



renderSideBar();
/*
const tempTask = new List('Athena');
tempTask.tasks.push(new Task('Homework', 'please'));
tempTask.tasks.push(new Task('grocery', 'please'));
tempTask.tasks.push(new Task(' assignment', 'please'));

tempTask.completedTasks.push(new Task('Complete work', 'please'));

renderContent(tempTask);*/