'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      href: '/tasks',
      label: 'Tasks',
      icon: '📋'
    },
    {
      href: '/analytics',
      label: 'Analytics',
      icon: '📈'
    }
  ]

  return (
    <nav className="flex items-center space-x-1 bg-gray-100/50 rounded-lg p-1 backdrop-blur-sm">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-white shadow-sm text-gray-900 border border-gray-200'
                : 'text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-sm'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
