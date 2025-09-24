'use client'

import { useState } from 'react'
import { Task } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'

interface TaskListProps {
  tasks: Task[]
  onTaskUpdate?: (taskId: number, updates: Partial<Task>) => void
  onTaskDelete?: (taskId: number) => void
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [urgencyFilter, setUrgencyFilter] = useState<string>('all')
  const [importanceFilter, setImportanceFilter] = useState<string>('all')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { backgroundColor: '#D1FAE5', color: '#047857' }
      case 'in_progress':
        return { backgroundColor: '#DBEAFE', color: '#1E40AF' }
      case 'cancelled':
        return { backgroundColor: '#FEE2E2', color: '#991B1B' }
      default:
        return { backgroundColor: '#F3F4F6', color: '#374151' }
    }
  }

  const getQuadrantColor = (urgency: number, importance: number) => {
    if (urgency >= 3 && importance >= 3) {
      return { 
        borderColor: '#DC2626', 
        backgroundColor: '#FEE2E2', 
        color: '#991B1B' 
      }
    }
    if (importance >= 3 && urgency < 3) {
      return { 
        borderColor: '#D97706', 
        backgroundColor: '#FEF3C7', 
        color: '#92400E' 
      }
    }
    if (urgency >= 3 && importance < 3) {
      return { 
        borderColor: '#2563EB', 
        backgroundColor: '#DBEAFE', 
        color: '#1E40AF' 
      }
    }
    return { 
      borderColor: '#059669', 
      backgroundColor: '#D1FAE5', 
      color: '#047857' 
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesUrgency = urgencyFilter === 'all' || task.urgency.toString() === urgencyFilter
    const matchesImportance = importanceFilter === 'all' || task.importance.toString() === importanceFilter

    return matchesSearch && matchesStatus && matchesUrgency && matchesImportance
  })

  const handleStatusChange = (taskId: number, newStatus: Task['status']) => {
    onTaskUpdate?.(taskId, { status: newStatus })
  }

  if (tasks.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            <p>No tasks yet. Create your first task to get started!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
          <CardDescription>Filter and search your tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="search">Search Tasks</Label>
            <Input
              id="search"
              placeholder="Search by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <select
                id="status-filter"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <Label htmlFor="urgency-filter">Urgency</Label>
              <select
                id="urgency-filter"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={urgencyFilter}
                onChange={(e) => setUrgencyFilter(e.target.value)}
              >
                <option value="all">All Urgency</option>
                <option value="1">1 - Low</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - High</option>
                <option value="4">4 - Critical</option>
              </select>
            </div>
            <div>
              <Label htmlFor="importance-filter">Importance</Label>
              <select
                id="importance-filter"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={importanceFilter}
                onChange={(e) => setImportanceFilter(e.target.value)}
              >
                <option value="all">All Importance</option>
                <option value="1">1 - Low</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - High</option>
                <option value="4">4 - Critical</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <Card 
              key={task.id} 
              className="task-card"
              style={getQuadrantColor(task.urgency, task.importance)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{task.title}</CardTitle>
                    {task.description && (
                      <CardDescription className="mt-1">{task.description}</CardDescription>
                    )}
                    {task.dueDate && (
                      <p className="text-sm text-blue-600 mt-1">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge style={getStatusColor(task.status)}>
                      {task.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(task.id, 'completed')}
                        title="Mark as completed"
                      >
                        ✓
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onTaskUpdate?.(task.id, { status: 'in_progress' })}
                        title="Mark as in progress"
                      >
                        ▶️
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onTaskDelete?.(task.id)}
                        title="Delete task"
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Urgency: {task.urgency}/4</span>
                  <span>Importance: {task.importance}/4</span>
                  {task.completedAt && (
                    <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center text-muted-foreground">
                <p>No tasks match your current filters.</p>
                <p className="text-sm">Try adjusting your search or filter criteria.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}