import ThemeButton from '@/components/shared/ThemeButton'
import { Link } from 'react-router-dom'

const SignupNav = () => {
  return (
    <div className='w-full sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 z-10 px-4 md:px-6 py-3'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Logo and brand name */}
        <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
          <img 
            src='/logo.png' 
            alt='SkillSort Logo' 
            className='w-8 h-8 md:w-10 md:h-10 object-contain'
          />
          <span className="font-bold text-xl md:text-2xl flex items-center">
            <span className="text-red-500">Skill</span>
            <span className="dark:text-white">Sort</span>
          </span>
        </Link>
        
        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Link 
            to="/login" 
            className="text-sm md:text-base font-medium text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 hidden sm:block"
          >
            Log in
          </Link>
          <div className="h-5 w-px bg-gray-300 dark:bg-gray-700 hidden sm:block"></div>
          <Link 
            to="/contact" 
            className="text-sm md:text-base font-medium text-gray-600 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400 hidden sm:block"
          >
            Help
          </Link>
          <ThemeButton />
        </div>
      </div>
    </div>
  )
}

export default SignupNav