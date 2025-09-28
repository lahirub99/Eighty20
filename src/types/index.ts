export interface Task {
  id: number
  title: string
  description?: string
  urgency: number // 1-10 scale
  importance: number // 1-10 scale
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dueDate?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TaskAnalytics {
  id: number
  taskId: number
  timeSpent?: number // in minutes
  completionDate?: Date
  impactScore?: number // 1-10 scale
  satisfactionScore?: number // 1-10 scale
  notes?: string
  createdAt: Date
}

export interface CreateTaskData {
  title: string
  description?: string
  urgency: number
  importance: number
  dueDate?: Date
}

export interface UpdateTaskData {
  title?: string
  description?: string
  urgency?: number
  importance?: number
  status?: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dueDate?: Date
}

// Eisenhower Matrix Quadrants
export type Quadrant = 'q1' | 'q2' | 'q3' | 'q4'

export interface QuadrantConfig {
  id: Quadrant
  title: string
  description: string
  color: string
  urgency: boolean
  importance: boolean
  // Color system properties using inline styles
  bgColor: string
  borderColor: string
  textColor: string
}

export const QUADRANT_CONFIG: Record<Quadrant, QuadrantConfig> = {
  q1: {
    id: 'q1',
    title: 'Do First',
    description: 'Urgent & Important',
    color: 'quadrant-q1',
    urgency: true, // 5+ for high urgency
    importance: true, // 5+ for high importance
    bgColor: '#FEE2E2',
    borderColor: '#DC2626',
    textColor: '#991B1B',
  },
  q2: {
    id: 'q2',
    title: 'Schedule',
    description: 'Important, Not Urgent',
    color: 'quadrant-q2',
    urgency: false, // <5 for low urgency
    importance: true, // 5+ for high importance
    bgColor: '#FEF3C7',
    borderColor: '#D97706',
    textColor: '#92400E',
  },
  q3: {
    id: 'q3',
    title: 'Delegate',
    description: 'Urgent, Not Important',
    color: 'quadrant-q3',
    urgency: true, // 5+ for high urgency
    importance: false, // <5 for low importance
    bgColor: '#DBEAFE',
    borderColor: '#2563EB',
    textColor: '#1E40AF',
  },
  q4: {
    id: 'q4',
    title: 'Eliminate',
    description: 'Neither Urgent nor Important',
    color: 'quadrant-q4',
    urgency: false, // <5 for low urgency
    importance: false, // <5 for low importance
    bgColor: '#D1FAE5',
    borderColor: '#059669',
    textColor: '#047857',
  },
}

// Helper functions for 1-10 scale
export const isHighUrgency = (urgency: number): boolean => urgency >= 5
export const isHighImportance = (importance: number): boolean => importance >= 5

// Smart defaults for quadrant moves
export const getSmartDefaults = (fromQuadrant: Quadrant, toQuadrant: Quadrant): { urgency: number; importance: number } => {
  const config = QUADRANT_CONFIG[toQuadrant]
  
  // If moving to a quadrant that requires high urgency/importance, use 7
  // If moving to a quadrant that requires low urgency/importance, use 2
  return {
    urgency: config.urgency ? 7 : 2,
    importance: config.importance ? 7 : 2
  }
}