import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent {
  private taskService = inject(TaskService);
  //המשימות שיוצגו בטבלה
  tasks$ = this.taskService.tasks$;

  // מחיקת משימה לפי המזהה שלה
  onDelete(id: number | undefined) {
    if (id && confirm('האם את בטוחה שברצונך למחוק משימה זו?')) {
      this.taskService.deleteTask(id);
    }
  }

  //עריכת משימה קיימת
  onEdit(task: Task) {
    this.taskService.setEditTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}