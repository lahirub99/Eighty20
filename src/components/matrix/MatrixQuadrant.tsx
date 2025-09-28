'use client'

import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Task } from '@/types'
import { QuadrantConfig, Quadrant } from '@/types'
import { TaskCard } from './TaskCard'

interface MatrixQuadrantProps {
  quadrant: Quadrant
  config: QuadrantConfig
  tasks: Task[]
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
  onTaskDelete: (taskId: number) => void
}

export function MatrixQuadrant({ quadrant, config, tasks, onTaskUpdate, onTaskDelete }: MatrixQuadrantProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: quadrant,
  })

  // Define colors for each quadrant
  const getQuadrantStyles = (quadrant: Quadrant) => {
    const styles = {
      q1: {
        backgroundColor: '#FEE2E2',
        borderColor: '#DC2626',
        color: '#991B1B',
      },
      q2: {
        backgroundColor: '#FEF3C7',
        borderColor: '#D97706',
        color: '#92400E',
      },
      q3: {
        backgroundColor: '#DBEAFE',
        borderColor: '#2563EB',
        color: '#1E40AF',
      },
      q4: {
        backgroundColor: '#D1FAE5',
        borderColor: '#059669',
        color: '#047857',
      },
    }
    return styles[quadrant]
  }

  const quadrantStyles = getQuadrantStyles(quadrant)

  return (
    <div
      ref={setNodeRef}
      className={`
        p-6 rounded-xl border-2 min-h-[200px] transition-all duration-300 backdrop-blur-sm
        ${isOver ? 'ring-2 ring-blue-400 ring-opacity-50 scale-105' : ''}
        hover:shadow-xl hover:scale-105 hover:backdrop-blur-md
        quadrant-enhanced
      `}
      style={quadrantStyles}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-2">{config.title}</h3>
        <p className="text-sm opacity-80 mb-4">{config.description}</p>
        <div className="text-sm">
          <p className="font-medium">Urgent: {config.urgency ? 'Yes' : 'No'}</p>
          <p className="font-medium">Important: {config.importance ? 'Yes' : 'No'}</p>
        </div>
      </div>

      <div className="mt-4">
        {tasks.length > 0 ? (
          <SortableContext items={tasks.map(task => task.id.toString())} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={onTaskUpdate}
                  onDelete={onTaskDelete}
                />
              ))}
            </div>
          </SortableContext>
        ) : (
          <div className="p-3 bg-white/50 rounded border-2 border-dashed border-gray-300 drop-zone">
            <p className="text-sm text-gray-600">Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  )
}