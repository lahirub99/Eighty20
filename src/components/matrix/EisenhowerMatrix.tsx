'use client'

import { useState } from 'react'
import { DndContext, DragEndEvent, DragStartEvent, closestCenter } from '@dnd-kit/core'
import { Task } from '@/types'
import { QUADRANT_CONFIG, isHighUrgency, isHighImportance, getSmartDefaults } from '@/types'
import { Quadrant } from '@/types'
import { MatrixQuadrant } from './MatrixQuadrant'

interface EisenhowerMatrixProps {
  tasks: Task[]
  onTaskMove: (taskId: number, newUrgency: number, newImportance: number) => void
  onTaskUpdate: (taskId: number, updates: Partial<Task>) => void
  onTaskDelete: (taskId: number) => void
}

export function EisenhowerMatrix({ tasks, onTaskMove, onTaskUpdate, onTaskDelete }: EisenhowerMatrixProps) {
  const [, setActiveId] = useState<string | null>(null)

  // Categorize tasks by quadrant using 1-10 scale (5+ for high, <5 for low)
  const getTasksByQuadrant = (quadrant: Quadrant) => {
    return tasks.filter(task => {
      const config = QUADRANT_CONFIG[quadrant]
      const matchesUrgency = config.urgency ? isHighUrgency(task.urgency) : !isHighUrgency(task.urgency)
      const matchesImportance = config.importance ? isHighImportance(task.importance) : !isHighImportance(task.importance)
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

    // Find the current task to determine source quadrant
    const currentTask = tasks.find(task => task.id === taskId)
    if (!currentTask) return

    // Determine source quadrant
    const currentUrgency = isHighUrgency(currentTask.urgency)
    const currentImportance = isHighImportance(currentTask.importance)
    let sourceQuadrant: Quadrant
    
    if (currentUrgency && currentImportance) sourceQuadrant = 'q1'
    else if (!currentUrgency && currentImportance) sourceQuadrant = 'q2'
    else if (currentUrgency && !currentImportance) sourceQuadrant = 'q3'
    else sourceQuadrant = 'q4'

    // Get smart defaults for the move
    const { urgency: newUrgency, importance: newImportance } = getSmartDefaults(sourceQuadrant, targetQuadrant)

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