'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Task } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface TaskCardProps {
  task: Task
  onUpdate: (taskId: number, updates: Partial<Task>) => void
  onDelete: (taskId: number) => void
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all
        ${isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
        cursor-grab active:cursor-grabbing
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
              onUpdate(task.id, { status: 'completed' })
            }}
          >
            ✓
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation()
              onDelete(task.id)
            }}
          >
            ×
          </Button>
        </div>
      </div>
    </div>
  )
}