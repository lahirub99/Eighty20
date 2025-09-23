'use client'

import { TaskForm } from '@/components/tasks/TaskForm'
import { TaskList } from '@/components/tasks/TaskList'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Task } from '@/types'

// This would normally fetch from the API
const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Write and submit the quarterly project proposal',
    urgency: 4,
    importance: 4,
    status: 'pending',
    dueDate: new Date('2024-01-15'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Plan team retreat',
    description: 'Organize the annual team building retreat',
    urgency: 2,
    importance: 4,
    status: 'pending',
    dueDate: new Date('2024-02-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    title: 'Answer emails',
    description: 'Respond to daily email inquiries',
    urgency: 4,
    importance: 2,
    status: 'in_progress',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    title: 'Check social media',
    description: 'Browse social media feeds',
    urgency: 1,
    importance: 1,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function TasksPage() {
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
          <TaskForm onSubmit={(data) => console.log('New task:', data)} />
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
                tasks={mockTasks}
                onTaskUpdate={(id, updates) => console.log('Update task:', id, updates)}
                onTaskDelete={(id) => console.log('Delete task:', id)}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}