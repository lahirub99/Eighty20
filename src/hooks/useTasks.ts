'use client'

import { useState, useEffect } from 'react'
import { Task, CreateTaskData, UpdateTaskData } from '@/types'
import { TaskAPI } from '@/lib/api'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      const fetchedTasks = await TaskAPI.getTasks()
      setTasks(fetchedTasks)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  const createTask = async (data: CreateTaskData) => {
    try {
      const newTask = await TaskAPI.createTask(data)
      setTasks(prev => [...prev, newTask])
      return newTask
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task')
      throw err
    }
  }

  const updateTask = async (id: number, data: UpdateTaskData) => {
    try {
      const updatedTask = await TaskAPI.updateTask(id, data)
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
      return updatedTask
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task')
      throw err
    }
  }

  const deleteTask = async (id: number) => {
    try {
      await TaskAPI.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task')
      throw err
    }
  }

  const moveTask = async (taskId: number, newUrgency: number, newImportance: number) => {
    try {
      await updateTask(taskId, { urgency: newUrgency, importance: newImportance })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to move task')
      throw err
    }
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    refresh: loadTasks,
  }
}

