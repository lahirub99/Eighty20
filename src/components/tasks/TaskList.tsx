'use client'

import { Task } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface TaskListProps {
  tasks: Task[]
  onTaskUpdate?: (taskId: number, updates: Partial<Task>) => void
  onTaskDelete?: (taskId: number) => void
}

export function TaskList({ tasks, onTaskUpdate, onTaskDelete }: TaskListProps) {
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
      {tasks.map((task) => (
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
              </div>
              <div className="flex items-center gap-2">
                <Badge style={getStatusColor(task.status)}>
                  {task.status.replace('_', ' ')}
                </Badge>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onTaskUpdate?.(task.id, { status: 'completed' })}
                  >
                    ✓
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onTaskDelete?.(task.id)}
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
              {task.dueDate && (
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}