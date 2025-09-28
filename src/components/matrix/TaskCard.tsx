'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'

interface TaskCardProps {
  task: Task
  onUpdate: (taskId: number, updates: Partial<Task>) => void
  onDelete: (taskId: number) => void
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description || '',
    urgency: task.urgency,
    importance: task.importance,
    dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
  })

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id.toString() })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

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

  const handleSave = () => {
    const updates = {
      title: editData.title,
      description: editData.description,
      urgency: editData.urgency,
      importance: editData.importance,
      dueDate: editData.dueDate ? new Date(editData.dueDate) : undefined,
    }
    onUpdate(task.id, updates)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description || '',
      urgency: task.urgency,
      importance: task.importance,
      dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
    })
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: Task['status']) => {
    onUpdate(task.id, { status: newStatus })
  }

  const handleUrgencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 5 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setEditData({ ...editData, urgency: numValue })
    }
  }

  const handleImportanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 5 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setEditData({ ...editData, importance: numValue })
    }
  }

  if (isEditing) {
    return (
      <Card className="bg-white shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Edit Task</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label htmlFor={`title-${task.id}`} className="text-xs">Title</Label>
            <Input
              id={`title-${task.id}`}
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="text-sm"
            />
          </div>
          <div>
            <Label htmlFor={`description-${task.id}`} className="text-xs">Description</Label>
            <Textarea
              id={`description-${task.id}`}
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              rows={2}
              className="text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor={`urgency-${task.id}`} className="text-xs">Urgency</Label>
              <Input
                id={`urgency-${task.id}`}
                type="number"
                min="1"
                max="10"
                value={editData.urgency}
                onChange={handleUrgencyChange}
                className="text-sm"
              />
            </div>
            <div>
              <Label htmlFor={`importance-${task.id}`} className="text-xs">Importance</Label>
              <Input
                id={`importance-${task.id}`}
                type="number"
                min="1"
                max="10"
                value={editData.importance}
                onChange={handleImportanceChange}
                className="text-sm"
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`dueDate-${task.id}`} className="text-xs">Due Date</Label>
            <Input
              id={`dueDate-${task.id}`}
              type="date"
              value={editData.dueDate}
              onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex gap-1">
            <Button size="sm" onClick={handleSave} className="text-xs">
              Save
            </Button>
            <Button size="sm" variant="outline" onClick={handleCancel} className="text-xs">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-3 shadow-lg hover:shadow-xl transition-all duration-300
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
        cursor-grab active:cursor-grabbing hover:-translate-y-1
        task-card
      `}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{task.title}</h4>
          {task.description && (
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          )}
          {task.dueDate && (
            <p className="text-xs text-blue-600 mt-1">
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge style={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
            <span className="text-xs text-gray-500">
              U:{task.urgency} I:{task.importance}
            </span>
          </div>
        </div>
        <div className="flex gap-1 ml-2">
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              handleStatusChange('completed')
            }}
            title="Mark as completed"
          >
            ✓
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              setIsEditing(true)
            }}
            title="Edit task"
          >
            ✏️
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
            title="Delete task"
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  )
}