'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { EisenhowerMatrix } from '@/components/matrix/EisenhowerMatrix'
import { TaskModal } from '@/components/tasks/TaskModal'
import { useTasks } from '@/hooks/useTasks'
import { useState } from 'react'
import { CreateTaskData, UpdateTaskData } from '@/types'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

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

  // Calculate statistics
  const completedToday = tasks.filter(task => 
    task.status === 'completed' && 
    task.completedAt && 
    new Date(task.completedAt).toDateString() === new Date().toDateString()
  ).length

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Quadrant statistics
  const q1Tasks = tasks.filter(task => task.urgency >= 3 && task.importance >= 3)
  const q2Tasks = tasks.filter(task => task.importance >= 3 && task.urgency < 3)
  const q3Tasks = tasks.filter(task => task.urgency >= 3 && task.importance < 3)
  const q4Tasks = tasks.filter(task => task.urgency < 3 && task.importance < 3)

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
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Eighty20 Dashboard
        </h1>
        <p className="text-muted-foreground text-lg mt-2">
          Focus on the 20% of tasks that drive 80% of your results using the Eisenhower Matrix.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="glass-card animate-slide-in-right hover:shadow-xl transition-all duration-300">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📋</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-slide-in-right hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.1s' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">{completedToday}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-slide-in-right hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.2s' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{inProgressTasks}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">▶️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card animate-slide-in-right hover:shadow-xl transition-all duration-300" style={{ animationDelay: '0.3s' }}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completion Rate</p>
                <p className="text-2xl font-bold text-yellow-600">{completionRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-lg">📊</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Eisenhower Matrix */}
        <div className="lg:col-span-2">
          <Card className="glass-card animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Eisenhower Matrix
              </CardTitle>
              <CardDescription className="text-lg">
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

        {/* Quadrant Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Quadrant Overview</CardTitle>
            <CardDescription>Task distribution across quadrants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <div>
                  <p className="font-medium" style={{ color: '#991B1B' }}>Do First</p>
                  <p className="text-sm" style={{ color: '#991B1B' }}>Urgent & Important</p>
                </div>
                <Badge style={{ backgroundColor: '#DC2626', color: 'white' }}>
                  {q1Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <div>
                  <p className="font-medium" style={{ color: '#92400E' }}>Schedule</p>
                  <p className="text-sm" style={{ color: '#92400E' }}>Important, Not Urgent</p>
                </div>
                <Badge style={{ backgroundColor: '#D97706', color: 'white' }}>
                  {q2Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
                <div>
                  <p className="font-medium" style={{ color: '#1E40AF' }}>Delegate</p>
                  <p className="text-sm" style={{ color: '#1E40AF' }}>Urgent, Not Important</p>
                </div>
                <Badge style={{ backgroundColor: '#2563EB', color: 'white' }}>
                  {q3Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                <div>
                  <p className="font-medium" style={{ color: '#047857' }}>Eliminate</p>
                  <p className="text-sm" style={{ color: '#047857' }}>Neither Urgent nor Important</p>
                </div>
                <Badge style={{ backgroundColor: '#059669', color: 'white' }}>
                  {q4Tasks.length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">➕</span>
                  <div>
                    <p className="font-medium">Add New Task</p>
                    <p className="text-sm text-muted-foreground">Create a new task</p>
                  </div>
                </div>
              </button>
              
              <Link 
                href="/tasks"
                className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📋</span>
                  <div>
                    <p className="font-medium">Manage Tasks</p>
                    <p className="text-sm text-muted-foreground">View and edit all tasks</p>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/analytics"
                className="w-full p-3 text-left rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors block"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="font-medium">View Analytics</p>
                    <p className="text-sm text-muted-foreground">Track your productivity</p>
                  </div>
                </div>
              </Link>
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