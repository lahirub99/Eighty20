import { Task, CreateTaskData, UpdateTaskData } from '@/types'

const API_BASE = '/api'

export class TaskAPI {
  static async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE}/tasks`)
    if (!response.ok) {
      throw new Error('Failed to fetch tasks')
    }
    return response.json()
  }

  static async createTask(data: CreateTaskData): Promise<Task> {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create task')
    }
    return response.json()
  }

  static async updateTask(id: number, data: UpdateTaskData): Promise<Task> {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update task')
    }
    return response.json()
  }

  static async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete task')
    }
  }
}

