import './styles/main.css';
import { renderContent, Task , renderTasks} from './scripts/tasks';
import { lists} from './scripts/lists';
import { renderSideBar, renderMainContent } from './scripts/side-bar';




renderSideBar();
document.getElementById('content').innerHTML = '';
lists.forEach((list) => {
  renderContent(list);
  renderTasks(list);
});
renderMainContent('ALL');
