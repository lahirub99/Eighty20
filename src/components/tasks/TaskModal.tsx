'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Label } from '@/components/ui/Label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { CreateTaskData } from '@/types'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CreateTaskData) => void
}

export function TaskModal({ isOpen, onClose, onSubmit }: TaskModalProps) {
  const [formData, setFormData] = useState<CreateTaskData>({
    title: '',
    description: '',
    urgency: 1,
    importance: 1,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: '',
        description: '',
        urgency: 1,
        importance: 1,
      })
      onClose()
    }
  }

  const handleUrgencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 1 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 4) {
      setFormData({ ...formData, urgency: numValue })
    }
  }

  const handleImportanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 1 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 4) {
      setFormData({ ...formData, importance: numValue })
    }
  }

  const getQuadrantDescription = (urgency: number, importance: number) => {
    if (urgency >= 3 && importance >= 3) {
      return "Do First - Urgent & Important"
    }
    if (importance >= 3 && urgency < 3) {
      return "Schedule - Important, Not Urgent"
    }
    if (urgency >= 3 && importance < 3) {
      return "Delegate - Urgent, Not Important"
    }
    return "Eliminate - Neither Urgent nor Important"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
          <CardDescription>
            Create a new task and assign it to the appropriate quadrant
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urgency">Urgency (1-4)</Label>
                <Input
                  id="urgency"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.urgency}
                  onChange={handleUrgencyChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  1=Low, 2=Medium, 3=High, 4=Critical
                </p>
              </div>
              <div>
                <Label htmlFor="importance">Importance (1-4)</Label>
                <Input
                  id="importance"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.importance}
                  onChange={handleImportanceChange}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  1=Low, 2=Medium, 3=High, 4=Critical
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined 
                })}
              />
            </div>

            {/* Quadrant Preview */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700">
                This task will be placed in:
              </p>
              <p className="text-sm text-gray-600">
                {getQuadrantDescription(formData.urgency, formData.importance)}
              </p>
            </div>

            <div className="flex gap-2">
              <Button type="submit">Create Task</Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}