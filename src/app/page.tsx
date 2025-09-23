'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { EisenhowerMatrix } from '@/components/matrix/EisenhowerMatrix'
import { TaskModal } from '@/components/tasks/TaskModal'
import { useTasks } from '@/hooks/useTasks'
import { useState } from 'react'
import { CreateTaskData, UpdateTaskData } from '@/types'

export default function HomePage() {
  const { tasks, loading, error, createTask, updateTask, deleteTask, moveTask } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleTaskMove = async (taskId: number, newUrgency: number, newImportance: number) => {
    try {
      await moveTask(taskId, newUrgency, newImportance)
    } catch (err) {
      console.error('Failed to move task:', err)
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

  const handleCreateTask = async (data: CreateTaskData) => {
    try {
      await createTask(data)
    } catch (err) {
      console.error('Failed to create task:', err)
    }
  }

  const completedToday = tasks.filter(task => 
    task.status === 'completed' && 
    task.completedAt && 
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  ).length

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your tasks...</p>
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
          <button 
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Eighty20 Dashboard</h1>
        <p className="text-muted-foreground">
          Focus on the 20% of tasks that drive 80% of your results using the Eisenhower Matrix.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Eisenhower Matrix */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Eisenhower Matrix</CardTitle>
              <CardDescription>
                Organize your tasks by urgency and importance. Drag tasks between quadrants to reprioritize.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EisenhowerMatrix
                tasks={tasks}
                onTaskMove={handleTaskMove}
                onTaskUpdate={handleTaskUpdate}
                onTaskDelete={handleTaskDelete}
              />
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>Your productivity overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Tasks</span>
                <span className="text-2xl font-bold">{tasks.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Completed Today</span>
                <span className="text-2xl font-bold" style={{ color: '#10B981' }}>{completedToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Focus Time</span>
                <span className="text-2xl font-bold" style={{ color: '#3B82F6' }}>0h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest task updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.length > 0 ? (
                tasks.slice(0, 3).map(task => (
                  <div key={task.id} className="text-sm">
                    <span className="font-medium">{task.title}</span>
                    <span className="text-muted-foreground ml-2">
                      {task.status === 'completed' ? '✓ Completed' : '⏳ In Progress'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">
                  No recent activity. Start by adding your first task!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card 
        className="border-2"
        style={{ 
          background: 'linear-gradient(to right, #DBEAFE, #FEF3C7)',
          borderColor: '#3B82F6'
        }}
      >
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to boost your productivity?</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first task to the Eisenhower Matrix
            </p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Add Your First Task
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  )
}