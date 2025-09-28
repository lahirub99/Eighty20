'use client'

import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useTasks } from '@/hooks/useTasks'
import { CreateTaskData, UpdateTaskData } from '@/types'

export default function TasksPage() {
  const { tasks, loading, error, createTask, updateTask, deleteTask } = useTasks()

  const handleCreateTask = async (data: CreateTaskData) => {
    try {
      await createTask(data)
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const handleTaskUpdate = async (taskId: number, updates: UpdateTaskData) => {
    try {
      await updateTask(taskId, updates)
    } catch (err) {
      console.error('Failed to update task:', err)
    }
  }

  const handleTaskDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId)
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Tasks</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Task Management</h1>
        <p className="text-muted-foreground">
          Manage your tasks and organize them using the Eisenhower Matrix
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task Form */}
        <div className="lg:col-span-1">
          <TaskForm onSubmit={handleCreateTask} />
        </div>

        {/* Task List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
              <CardDescription>
                All your tasks organized by urgency and importance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TaskList 
                tasks={tasks}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}