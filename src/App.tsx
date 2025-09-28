import React, { useState } from 'react'
import NewsletterTemplate from './components/NewsletterTemplate'
import ContentEditor from './components/ContentEditor'
import './index.css'

interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'list' | 'table'
  editable: boolean
}

function App() {
  const [contentSections, setContentSections] = useState<ContentSection[]>([])
  const [currentView, setCurrentView] = useState<'editor' | 'preview' | 'both'>('both')

  const handleContentUpdate = (sections: ContentSection[]) => {
    setContentSections(sections)
  }

  const exportToPDF = () => {
    window.print()
  }

  const exportToWeb = () => {
    // Future: Export as HTML/web-ready format
    const htmlContent = document.getElementById('newsletter-preview')?.innerHTML
    if (htmlContent) {
      const blob = new Blob([htmlContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'newsletter.html'
      link.click()
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-sgc-green mb-2">NewsBetter V2</h1>
              <p className="text-xl text-gray-600">Professional Newsletter Generator</p>
              <p className="text-lg text-gray-500">SGC Template Matching - September 2025</p>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentView('editor')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'editor'
                      ? 'bg-white text-sgc-green shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Editor
                </button>
                <button
                  onClick={() => setCurrentView('both')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'both'
                      ? 'bg-white text-sgc-green shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setCurrentView('preview')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === 'preview'
                      ? 'bg-white text-sgc-green shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Export Controls */}
              <div className="flex space-x-2">
                <button
                  onClick={exportToPDF}
                  className="inline-flex items-center px-4 py-2 border border-sgc-green text-sm font-medium rounded-md text-sgc-green bg-white hover:bg-sgc-green hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Print/PDF
                </button>
                <button
                  onClick={exportToWeb}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sgc-green hover:bg-opacity-90 transition-colors"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  Export Web
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={`grid gap-8 ${currentView === 'both' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {/* Content Editor */}
          {(currentView === 'editor' || currentView === 'both') && (
            <div className="space-y-6">
              <ContentEditor onContentUpdate={handleContentUpdate} />
            </div>
          )}

          {/* Newsletter Preview */}
          {(currentView === 'preview' || currentView === 'both') && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-sgc-green">Newsletter Preview</h2>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Sections: {contentSections.length}</span>
                    <span>•</span>
                    <span>Template: SGC</span>
                  </div>
                </div>

                <div id="newsletter-preview" className="newsletter-container">
                  <NewsletterTemplate customContent={contentSections} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span>Status: Ready</span>
              <span>•</span>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
              <span>•</span>
              <span>Auto-save: On</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Template: SGC Newsletter</span>
              <span>•</span>
              <span>Pages: 8</span>
              <span>•</span>
              <span>Content Sections: {contentSections.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
