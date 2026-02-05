import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Grid3X3, List, MessageSquare, Info, Github, Sun, Moon } from 'lucide-react'
import type { FC, ElementType } from 'react'

interface NavLink {
  href: string
  icon: ElementType
  label: string
  external?: boolean
}

const navLinks: NavLink[] = [
  { href: '/apps', icon: Grid3X3, label: 'Apps' },
  { href: '/projects', icon: List, label: 'Projects' },
  { href: '/blog', icon: MessageSquare, label: 'Blog' },
  { href: '/about', icon: Info, label: 'About' },
  { href: 'https://github.com/binkoni', icon: Github, label: 'GitHub', external: true },
]

const ThemeToggle: FC = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}

const AppBar: FC = () => {
  return (
    <header className="bg-primary text-white">
      <div className="mx-auto max-w-[600px] px-4">
        <div className="flex justify-center py-4">
          <Link href="/" className="text-3xl font-normal hover:opacity-90 transition-opacity">
            gonnux.com
          </Link>
        </div>
        <hr className="border-white/20" />
        <nav className="flex justify-center py-2 gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label={link.label}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
              >
                <Icon className="h-5 w-5" />
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default AppBar
