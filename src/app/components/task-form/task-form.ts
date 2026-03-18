import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  
  taskForm!: FormGroup;
  isEditMode = false;
  editingTaskId?: number;

  ngOnInit(): void {
    //אתחול ראשוני של הטופס שלנו
    this.initForm();
    //אנחנו בודקים האם המשתמש לחץ על כפתור השינוי
    this.taskService.editTask$.subscribe(task => {
      if (task) {
        this.isEditMode = true;
        this.editingTaskId = task.id;
        //מעדכן את כל השדות בטופס לפי האובייקט שקיבלנו
        this.taskForm.patchValue(task);
      } else {
        this.isEditMode = false;
        this.editingTaskId = undefined;
      }
    });
  }

  //מגדירים את מבנה הטופס
  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['בינונית', Validators.required],
      dueDate: ['', Validators.required],
      status: ['ממתינה', Validators.required]
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const taskData = this.taskForm.value;
      if (this.isEditMode) {
        //שליחת עדכון למשימה הקיימת
        this.taskService.updateTask({ ...taskData, id: this.editingTaskId });
        this.taskService.clearEditTask();
        alert('המשימה עודכנה בהצלחה!');
      } else {
        // הוספת משימה חדשה
        this.taskService.addTask(taskData);
        alert('המשימה נוספה בהצלחה!');
      }

      //איפוס הטופס למצב התחלתי
      this.taskForm.reset({
        priority: 'בינונית',
        status: 'ממתינה'
      });
      this.isEditMode = false;
    }
  }
}