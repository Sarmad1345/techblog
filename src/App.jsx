import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-6">
            <svg 
              className="w-16 h-16 text-indigo-600 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
              />
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slideDown">
          Website Under Maintenance
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          We're currently working on improving your experience. 
          <br />
          <span className="font-semibold text-indigo-600">
            Please wait for a few hours while we make things better.
          </span>
        </p>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <p className="text-gray-500 text-sm">
            Thank you for your patience. We'll be back soon with exciting updates!
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
