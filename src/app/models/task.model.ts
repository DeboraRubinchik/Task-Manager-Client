export interface Task {
  id?: number;
  title: string;
  description?: string;
  priority: 'נמוכה' | 'בינונית' | 'גבוהה';
  dueDate: string;
  status: 'ממתינה' | 'בתהליך' | 'הושלמה';
}