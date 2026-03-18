import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './components/task-form/task-form';
import { TaskListComponent } from './components/task-list/task-list'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskFormComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = signal('task-manager-client');
}
