import React from 'react'
import NewsletterTemplate from './components/NewsletterTemplate'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-sgc-green mb-4">NewsBetter V2</h1>
          <p className="text-xl text-gray-600">Professional Newsletter Generator</p>
          <p className="text-lg text-gray-500">SGC Template Matching - September 2025</p>
        </div>

        <NewsletterTemplate />
      </div>
    </div>
  )
}

export default App
