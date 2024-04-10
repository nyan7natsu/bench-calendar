'use strict';

enum TaskStatus {
    OPEN = 'オープン',
    IN_PROGRESS = '作業中',
    DONE = '終了',
    CLOSED = 'クローズ'
}

interface TaskProgress {
    name: string;
    description: string;
    start_at: string;
    end_at: string;
    color: string;
}

interface Task {
    name: string;
    assignee: string;
    status: TaskStatus;
    deadline: string;
    progress: TaskProgress[];
}

const getProgressCalendar = (): HTMLTableSectionElement | undefined => {
    const progressCalendar = document.getElementById('progress-calendar') as HTMLTableElement | null;
    if (!progressCalendar) {
        return;
    } else {
        return progressCalendar.getElementsByTagName('tbody')[0];
    }
}

const initializeCalendar = () => {
    const progressCalendar = getProgressCalendar();
    if (!progressCalendar) {
        console.error('Task calendar not found.\nMay be not loaded yet.');
        return;
    }
    const headerRow = progressCalendar.getElementsByTagName('tr')[0];
    const currentDate = new Date();

    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    const lastMonthDays = lastMonth.getDate();

    const currentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const currentMonthDays = currentMonth.getDate();

    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0);
    const nextMonthDays = nextMonth.getDate();

    const totalDays = lastMonthDays + currentMonthDays + nextMonthDays;

    for (let i = 1; i <= totalDays; i++) {
        const newCell = document.createElement('td');
        if (i <= lastMonthDays) {
            newCell.innerText = `${lastMonth.getMonth() + 1}/${i}`
            newCell.classList.add('last-month', 'past');
        } else if (i <= lastMonthDays + currentMonthDays) {
            newCell.innerText = `${currentDate.getMonth() + 1}/${i - lastMonthDays}`
            if (i - lastMonthDays === currentDate.getDate()) {
                newCell.classList.add('today', 'current-month');
            } else if (i - lastMonthDays < currentDate.getDate()) {
                newCell.classList.add('past', 'current-month');
            } else {
                newCell.classList.add('future', 'current-month');
            }
        } else {
            newCell.innerText = `${nextMonth.getMonth() + 1}/${i - lastMonthDays - currentMonthDays}`
            newCell.classList.add('next-month', 'future');
        }
        headerRow.insertAdjacentElement('beforeend', newCell);
    }

    progressCalendar.insertAdjacentElement('beforeend', headerRow);

    const calendarContainer = document.getElementById('progress-calendar-container') as HTMLDivElement | null;
    if (!calendarContainer) {
        console.error('Calendar container not found.\nMay be not loaded yet.');
        return;
    }
    const scrollLeftMax = calendarContainer.scrollWidth - calendarContainer.clientWidth;
    calendarContainer.scrollLeft = (scrollLeftMax / 3) + (scrollLeftMax / totalDays * currentDate.getDate())
}

const getTaskTable = (): HTMLTableSectionElement | undefined => {
    const taskTable = document.getElementById('task-table') as HTMLTableElement | null;
    if (!taskTable) {
        return;
    } else {
        return taskTable.getElementsByTagName('tbody')[0];
    }
}

const addTask = (task: Task) => {
    const taskTable = getTaskTable();
    if (!taskTable) {
        console.error('Task table not found.\nMay be not loaded yet.');
        return;
    }
    const newRow = document.createElement('tr');
    const nameCell = document.createElement('td');
    const assigneeCell = document.createElement('td');
    const statusCell = document.createElement('td');
    const deadlineCell = document.createElement('td');

    nameCell.innerText = task.name;
    assigneeCell.innerText = task.assignee;
    statusCell.innerText = task.status;
    deadlineCell.innerText = task.deadline;

    newRow.insertAdjacentElement('beforeend', nameCell);
    newRow.insertAdjacentElement('beforeend', assigneeCell);
    newRow.insertAdjacentElement('beforeend', statusCell);
    newRow.insertAdjacentElement('beforeend', deadlineCell);

    taskTable.insertAdjacentElement('beforeend', newRow);

    console.log('Task added:', task);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeCalendar();
});
