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
    urgency: 5,
    importance: 5,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title.trim()) {
      onSubmit(formData)
      setFormData({
        title: '',
        description: '',
        urgency: 5,
        importance: 5,
      })
      onClose()
    }
  }

  const handleUrgencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 5 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setFormData({ ...formData, urgency: numValue })
    }
  }

  const handleImportanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numValue = value === '' ? 5 : parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 10) {
      setFormData({ ...formData, importance: numValue })
    }
  }

  const getQuadrantDescription = (urgency: number, importance: number) => {
    if (urgency >= 5 && importance >= 5) {
      return "Do First - Urgent & Important"
    }
    if (importance >= 5 && urgency < 5) {
      return "Schedule - Important, Not Urgent"
    }
    if (urgency >= 5 && importance < 5) {
      return "Delegate - Urgent, Not Important"
    }
    return "Eliminate - Neither Urgent nor Important"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl border-0">
        <CardHeader className="bg-white border-b border-gray-200">
          <CardTitle className="text-xl font-bold text-gray-900">Add New Task</CardTitle>
          <CardDescription className="text-gray-600">
            Create a new task and assign it to the appropriate quadrant
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-sm font-semibold text-gray-700 block mb-2">
                Task Title *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter task title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-semibold text-gray-700 block mb-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="urgency" className="text-sm font-semibold text-gray-700 block mb-2">
                  Urgency (1-10)
                </Label>
                <Input
                  id="urgency"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.urgency}
                  onChange={handleUrgencyChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  1=Very Low, 5=Medium, 10=Critical
                </p>
              </div>
              <div>
                <Label htmlFor="importance" className="text-sm font-semibold text-gray-700 block mb-2">
                  Importance (1-10)
                </Label>
                <Input
                  id="importance"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.importance}
                  onChange={handleImportanceChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  1=Very Low, 5=Medium, 10=Critical
                </p>
              </div>
            </div>

            <div>
              <Label htmlFor="dueDate" className="text-sm font-semibold text-gray-700 block mb-2">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate ? new Date(formData.dueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined 
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>

            {/* Quadrant Preview */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-1">
                This task will be placed in:
              </p>
              <p className="text-sm font-medium text-blue-700">
                {getQuadrantDescription(formData.urgency, formData.importance)}
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-colors"
              >
                Create Task
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold px-6 py-2 rounded-md transition-colors"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}