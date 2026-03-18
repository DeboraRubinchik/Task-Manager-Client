import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5289/tasks'; //השרת שלנו
  
  //רשימה מלאה של כל המשימות
  private tasks: Task[] = [];
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  private editTaskSubject = new BehaviorSubject<Task | null>(null);
  editTask$ = this.editTaskSubject.asObservable();
  
  tasks$ = this.tasksSubject.asObservable();

  constructor() {this.loadTasks();}

  loadTasks() {
    console.log("מנסה לפנות לכתובת:", this.apiUrl); // זה ידפיס לנו בדיוק מה נשלח
    this.http.get<Task[]>(this.apiUrl).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.tasksSubject.next([...this.tasks]);
      },
      error: (err) => console.error("שגיאת טעינה:", err)
    });
  }

  getTasks() {
    return this.tasks;
  }

  //יוצר משימה חדשה
  addTask(task: Task) {
  this.http.post<Task>(this.apiUrl, task).subscribe({
    next: (newTask) => {
      this.tasks.push(newTask);
      this.tasksSubject.next([...this.tasks]);
    },
    error: (err) => console.error("שגיאת הוספה:", err)
  });
}
  //מעדכן את רשימת המשימות
  updateTask(updatedTask: Task) {
    this.http.put<Task>(`${this.apiUrl}/${updatedTask.id}`, updatedTask).subscribe(response => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        this.tasks[index] = response;
        this.tasksSubject.next([...this.tasks]);
      }
    });
  }

  //מוחק משימה
  deleteTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.tasksSubject.next([...this.tasks]);
    });
  }

  // פונקציה שמעדכנת איזה משימה עוברת לעריכה
  setEditTask(task: Task) {
    this.editTaskSubject.next(task);
  }

  // פונקציה לניקוי מצב עריכה
  clearEditTask() {
    this.editTaskSubject.next(null);
  }
}