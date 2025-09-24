'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { useTasks } from '@/hooks/useTasks'
import { Badge } from '@/components/ui/Badge'

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

  // Quadrant distribution
  const q1Tasks = tasks.filter(task => task.urgency >= 3 && task.importance >= 3)
  const q2Tasks = tasks.filter(task => task.importance >= 3 && task.urgency < 3)
  const q3Tasks = tasks.filter(task => task.urgency >= 3 && task.importance < 3)
  const q4Tasks = tasks.filter(task => task.urgency < 3 && task.importance < 3)

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

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Insights into your productivity and task management patterns
        </p>
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
        {/* Eisenhower Matrix Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Eisenhower Matrix Distribution</CardTitle>
            <CardDescription>How your tasks are distributed across quadrants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FEE2E2' }}>
                <div>
                  <p className="font-medium" style={{ color: '#991B1B' }}>Do First</p>
                  <p className="text-sm" style={{ color: '#991B1B' }}>Urgent & Important</p>
                </div>
                <Badge style={{ backgroundColor: '#DC2626', color: 'white' }}>
                  {q1Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#FEF3C7' }}>
                <div>
                  <p className="font-medium" style={{ color: '#92400E' }}>Schedule</p>
                  <p className="text-sm" style={{ color: '#92400E' }}>Important, Not Urgent</p>
                </div>
                <Badge style={{ backgroundColor: '#D97706', color: 'white' }}>
                  {q2Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#DBEAFE' }}>
                <div>
                  <p className="font-medium" style={{ color: '#1E40AF' }}>Delegate</p>
                  <p className="text-sm" style={{ color: '#1E40AF' }}>Urgent, Not Important</p>
                </div>
                <Badge style={{ backgroundColor: '#2563EB', color: 'white' }}>
                  {q3Tasks.length}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: '#D1FAE5' }}>
                <div>
                  <p className="font-medium" style={{ color: '#047857' }}>Eliminate</p>
                  <p className="text-sm" style={{ color: '#047857' }}>Neither Urgent nor Important</p>
                </div>
                <Badge style={{ backgroundColor: '#059669', color: 'white' }}>
                  {q4Tasks.length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Task Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Task Status Breakdown</CardTitle>
            <CardDescription>Current status of all your tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Completed</span>
                </div>
                <span className="font-medium">{completedTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">In Progress</span>
                </div>
                <span className="font-medium">{inProgressTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Pending</span>
                </div>
                <span className="font-medium">{pendingTasks}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Cancelled</span>
                </div>
                <span className="font-medium">{cancelledTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
