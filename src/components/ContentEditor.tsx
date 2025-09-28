import React, { useState, useCallback } from 'react'
import mammoth from 'mammoth'

interface ContentSection {
  id: string
  title: string
  content: string
  type: 'text' | 'list' | 'table'
  editable: boolean
}

interface ContentEditorProps {
  onContentUpdate: (content: ContentSection[]) => void
}

const ContentEditor: React.FC<ContentEditorProps> = ({ onContentUpdate }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [extractedContent, setExtractedContent] = useState<ContentSection[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  // Handle file upload and processing
  const handleFileUpload = useCallback(async (files: FileList) => {
    setIsProcessing(true)
    const newFiles = Array.from(files)
    setUploadedFiles(prev => [...prev, ...newFiles])

    try {
      for (const file of newFiles) {
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
            file.name.endsWith('.docx')) {
          await processDocxFile(file)
        } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
          await processTextFile(file)
        }
      }
    } catch (error) {
      console.error('Error processing files:', error)
    } finally {
      setIsProcessing(false)
    }
  }, [])

  // Process .docx files using mammoth
  const processDocxFile = async (file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer()
      const result = await mammoth.extractRawText({ arrayBuffer })

      // Split content into logical sections
      const sections = splitIntoSections(result.value, file.name)
      setExtractedContent(prev => [...prev, ...sections])
      onContentUpdate([...extractedContent, ...sections])
    } catch (error) {
      console.error('Error processing .docx file:', error)
    }
  }

  // Process plain text files
  const processTextFile = async (file: File) => {
    try {
      const text = await file.text()
      const sections = splitIntoSections(text, file.name)
      setExtractedContent(prev => [...prev, ...sections])
      onContentUpdate([...extractedContent, ...sections])
    } catch (error) {
      console.error('Error processing text file:', error)
    }
  }

  // Smart content splitting logic
  const splitIntoSections = (text: string, fileName: string): ContentSection[] => {
    const sections: ContentSection[] = []

    // Split by common newsletter section patterns
    const lines = text.split('\n').filter(line => line.trim().length > 0)
    let currentSection: ContentSection | null = null

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim()

      // Detect section headers (uppercase, short lines, or common newsletter terms)
      const isHeader = isLikelyHeader(line)

      if (isHeader && line.length < 100) {
        // Save previous section
        if (currentSection && currentSection.content.trim()) {
          sections.push(currentSection)
        }

        // Start new section
        currentSection = {
          id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: line,
          content: '',
          type: 'text',
          editable: true
        }
      } else if (currentSection) {
        // Add content to current section
        currentSection.content += line + '\n'
      } else {
        // Create a general section if no header found yet
        currentSection = {
          id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: `Content from ${fileName}`,
          content: line + '\n',
          type: 'text',
          editable: true
        }
      }
    }

    // Add the last section
    if (currentSection && currentSection.content.trim()) {
      sections.push(currentSection)
    }

    return sections
  }

  // Detect likely section headers
  const isLikelyHeader = (line: string): boolean => {
    const upperRatio = (line.match(/[A-Z]/g) || []).length / line.length
    const newsletterTerms = [
      'who we are', 'calendar', 'membership', 'construction', 'donations',
      'update', 'message', 'committee', 'board', 'events', 'news', 'announcement'
    ]

    return (
      upperRatio > 0.5 || // Mostly uppercase
      newsletterTerms.some(term => line.toLowerCase().includes(term)) ||
      line.length < 50 && line.includes(':')
    )
  }

  // Update section content
  const updateSectionContent = (sectionId: string, newContent: string) => {
    const updatedSections = extractedContent.map(section =>
      section.id === sectionId ? { ...section, content: newContent } : section
    )
    setExtractedContent(updatedSections)
    onContentUpdate(updatedSections)
  }

  // Update section title
  const updateSectionTitle = (sectionId: string, newTitle: string) => {
    const updatedSections = extractedContent.map(section =>
      section.id === sectionId ? { ...section, title: newTitle } : section
    )
    setExtractedContent(updatedSections)
    onContentUpdate(updatedSections)
  }

  // Remove section
  const removeSection = (sectionId: string) => {
    const updatedSections = extractedContent.filter(section => section.id !== sectionId)
    setExtractedContent(updatedSections)
    onContentUpdate(updatedSections)
  }

  // Add new section
  const addNewSection = () => {
    const newSection: ContentSection = {
      id: `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: 'New Section',
      content: 'Enter your content here...',
      type: 'text',
      editable: true
    }
    const updatedSections = [...extractedContent, newSection]
    setExtractedContent(updatedSections)
    onContentUpdate(updatedSections)
    setActiveSection(newSection.id)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-sgc-green mb-4">Content Editor</h2>
        <p className="text-gray-600 mb-4">
          Upload documents (.docx, .txt) or create content manually for your newsletter
        </p>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-sgc-green rounded-lg p-8 text-center mb-6 hover:bg-gray-50 transition-colors"
          onDrop={(e) => {
            e.preventDefault()
            if (e.dataTransfer.files) {
              handleFileUpload(e.dataTransfer.files)
            }
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <div className="text-sgc-green mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-lg font-medium text-sgc-green mb-2">
            Drop your documents here or click to browse
          </p>
          <p className="text-gray-500 mb-4">
            Supports .docx and .txt files
          </p>
          <input
            type="file"
            multiple
            accept=".docx,.txt"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-sgc-green hover:bg-opacity-90 cursor-pointer transition-colors"
          >
            Choose Files
          </label>
        </div>

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-sgc-green mr-3"></div>
            <span className="text-sgc-green font-medium">Processing documents...</span>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Uploaded Files:</h3>
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <svg className="h-5 w-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                  </svg>
                  <span className="flex-1 text-gray-700">{file.name}</span>
                  <span className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800">
            Content Sections ({extractedContent.length})
          </h3>
          <button
            onClick={addNewSection}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sgc-green hover:bg-opacity-90 transition-colors"
          >
            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Section
          </button>
        </div>

        {extractedContent.map((section) => (
          <div
            key={section.id}
            className={`border rounded-lg p-4 transition-all ${
              activeSection === section.id ? 'border-sgc-green ring-2 ring-sgc-green ring-opacity-20' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSectionTitle(section.id, e.target.value)}
                className="text-lg font-semibold text-gray-800 bg-transparent border-none outline-none flex-1 mr-4"
                onFocus={() => setActiveSection(section.id)}
              />
              <button
                onClick={() => removeSection(section.id)}
                className="text-red-500 hover:text-red-700 p-1"
                title="Remove section"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <textarea
              value={section.content}
              onChange={(e) => updateSectionContent(section.id, e.target.value)}
              onFocus={() => setActiveSection(section.id)}
              className="w-full p-3 border border-gray-200 rounded-md resize-vertical min-h-[120px] focus:border-sgc-green focus:ring-2 focus:ring-sgc-green focus:ring-opacity-20 transition-colors"
              placeholder="Enter content for this section..."
            />

            <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
              <span>{section.content.length} characters</span>
              <span>Type: {section.type}</span>
            </div>
          </div>
        ))}

        {extractedContent.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No content yet</h3>
            <p className="text-gray-500 mb-4">Upload documents or add sections manually to get started</p>
            <button
              onClick={addNewSection}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sgc-green hover:bg-opacity-90"
            >
              Create First Section
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContentEditor