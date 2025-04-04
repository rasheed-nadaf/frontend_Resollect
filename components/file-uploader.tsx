"use client"

import type React from "react"

import { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import type { FileItem } from "@/types/file"
import { Upload } from "lucide-react"

interface FileUploaderProps {
  onFileUpload: (files: FileItem[]) => void
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const processFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = []

    Array.from(fileList).forEach((file) => {
      newFiles.push({
        id: uuidv4(),
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadDate: new Date().toISOString(),
      })
    })

    onFileUpload(newFiles)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files)
      // Reset the input value so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center transition-colors ${
        isDragging ? "border-primary bg-primary/5" : "border-gray-300"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="fileUploader"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />

      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />

      <p className="text-lg font-medium mb-1">Drag and drop files here</p>
      <p className="text-sm text-gray-500 mb-4">or</p>

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
      >
        Browse Files
      </button>
    </div>
  )
}

