'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core'
import { Task } from '@/types'
import { QUADRANT_CONFIG } from '@/types'
import { Quadrant } from '@/types'
import { MatrixQuadrant } from './MatrixQuadrant'

interface EisenhowerMatrixProps {
  tasks: Task[]
  onTaskMove: (taskId: number, newUrgency: number, newImportance: number) => void
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
  onTaskDelete: (taskId: number) => void
}

export function EisenhowerMatrix({ tasks, onTaskMove, onTaskUpdate, onTaskDelete }: EisenhowerMatrixProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  // Categorize tasks by quadrant
  const getTasksByQuadrant = (quadrant: Quadrant) => {
    return tasks.filter(task => {
      const config = QUADRANT_CONFIG[quadrant]
      const matchesUrgency = config.urgency ? task.urgency >= 3 : task.urgency < 3
      const matchesImportance = config.importance ? task.importance >= 3 : task.importance < 3
      return matchesUrgency && matchesImportance
    })
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const taskId = parseInt(active.id as string)
    const targetQuadrant = over.id as Quadrant

    // Calculate new urgency and importance based on target quadrant
    const config = QUADRANT_CONFIG[targetQuadrant]
    const newUrgency = config.urgency ? 4 : 1
    const newImportance = config.importance ? 4 : 1

    onTaskMove(taskId, newUrgency, newImportance)
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {Object.entries(QUADRANT_CONFIG).map(([key, config]) => (
          <MatrixQuadrant
            key={key}
            quadrant={key as Quadrant}
            config={config}
            tasks={getTasksByQuadrant(key as Quadrant)}
            onTaskUpdate={onTaskUpdate}
            onTaskDelete={onTaskDelete}
          />
        ))}
      </DndContext>
    </div>
  )
}