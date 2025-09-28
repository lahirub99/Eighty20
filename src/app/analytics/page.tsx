'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useTasks } from '@/hooks/useTasks'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function AnalyticsPage() {
  const { tasks, loading, error } = useTasks()

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Analytics</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
        </div>
      </div>
    )
  }

  // Calculate analytics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress').length
  const pendingTasks = tasks.filter(task => task.status === 'pending').length
  const cancelledTasks = tasks.filter(task => task.status === 'cancelled').length

  // Quadrant distribution using 1-10 scale (5+ for high, <5 for low)
  const q1Tasks = tasks.filter(task => task.urgency >= 5 && task.importance >= 5)
  const q2Tasks = tasks.filter(task => task.importance >= 5 && task.urgency < 5)
  const q3Tasks = tasks.filter(task => task.urgency >= 5 && task.importance < 5)
  const q4Tasks = tasks.filter(task => task.urgency < 5 && task.importance < 5)

  // Completion rate
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  // Overdue tasks
  const today = new Date()
  const overdueTasks = tasks.filter(task => 
    task.dueDate && 
    new Date(task.dueDate) < today && 
    task.status !== 'completed'
  )

  // Recent completions (last 7 days)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentCompletions = tasks.filter(task => 
    task.completedAt && 
    new Date(task.completedAt) >= sevenDaysAgo
  )

  // Chart data preparation
  const quadrantData = [
    { name: 'Do First', value: q1Tasks.length, color: '#EF4444' },
    { name: 'Schedule', value: q2Tasks.length, color: '#F59E0B' },
    { name: 'Delegate', value: q3Tasks.length, color: '#3B82F6' },
    { name: 'Eliminate', value: q4Tasks.length, color: '#10B981' }
  ]

  const statusData = [
    { name: 'Completed', value: completedTasks, color: '#10B981' },
    { name: 'In Progress', value: inProgressTasks, color: '#3B82F6' },
    { name: 'Pending', value: pendingTasks, color: '#F59E0B' },
    { name: 'Cancelled', value: cancelledTasks, color: '#EF4444' }
  ]

  // Weekly completion data (last 7 days)
  const weeklyData = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dayStart = new Date(date.setHours(0, 0, 0, 0))
    const dayEnd = new Date(date.setHours(23, 59, 59, 999))
    
    const dayCompletions = tasks.filter(task => 
      task.completedAt && 
      new Date(task.completedAt) >= dayStart && 
      new Date(task.completedAt) <= dayEnd
    ).length

    weeklyData.push({
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completions: dayCompletions
    })
  }

  // Export functionality
  const exportToCSV = () => {
    const csvContent = [
      ['Title', 'Description', 'Status', 'Urgency', 'Importance', 'Due Date', 'Completed At', 'Created At'],
      ...tasks.map(task => [
        task.title,
        task.description || '',
        task.status,
        task.urgency,
        task.importance,
        task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '',
        task.completedAt ? new Date(task.completedAt).toLocaleDateString() : '',
        new Date(task.createdAt).toLocaleDateString()
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `eighty20-tasks-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights into your productivity and task management patterns
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          📊 Export CSV
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Key Metrics */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {completedTasks} of {totalTasks} tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressTasks}</div>
            <p className="text-xs text-muted-foreground">
              Active tasks
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">
              Past due date
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Eisenhower Matrix Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Eisenhower Matrix Distribution</CardTitle>
            <CardDescription>How your tasks are distributed across quadrants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={quadrantData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {quadrantData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {quadrantData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Task Status Breakdown Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Breakdown</CardTitle>
            <CardDescription>Current status of all your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Completion Trend */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Weekly Completion Trend</CardTitle>
          <CardDescription>Task completions over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="completions" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your productivity over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCompletions.length > 0 ? (
              recentCompletions.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-green-600">
                      Completed on {new Date(task.completedAt!).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge style={{ backgroundColor: '#10B981', color: 'white' }}>
                    ✓ Completed
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                <p>No recent completions</p>
                <p className="text-sm">Complete some tasks to see your progress here!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
