import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, User, Building, Shield } from 'lucide-react'

export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const loginOptions = [
    {
      type: 'Members',
      icon: User,
      description: 'Donors and volunteers',
      href: '#member-login'
    },
    {
      type: 'Chapters',
      icon: Building,
      description: 'Chapter leaders',
      href: '#chapter-login'
    },
    {
      type: 'Admins',
      icon: Shield,
      description: 'Global administrators',
      href: '#admin-login'
    }
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        Login
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-gray-900 border border-yellow-400/30 rounded-lg shadow-2xl z-50">
          <div className="p-2">
            {loginOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <a
                  key={option.type}
                  href={option.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-400/20 transition-colors group"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium group-hover:text-yellow-300 transition-colors">
                      {option.type}
                    </div>
                    <div className="text-gray-300 text-sm group-hover:text-gray-200">
                      {option.description}
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

