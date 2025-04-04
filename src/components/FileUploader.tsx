"use client"

import type React from "react"

import { useState, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import type { FileItem } from "../types/file"
import "./FileUploader.css"

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
      className={`uploader-container ${isDragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="fileUploader"
        type="file"
        multiple
        className="hidden-input"
        onChange={handleFileInputChange}
        ref={fileInputRef}
      />

      <div className="uploader-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <p className="uploader-text">Drag and drop files here</p>
      <p className="uploader-subtext">or</p>

      <button onClick={handleButtonClick} className="uploader-button">
        Browse Files
      </button>
    </div>
  )
}

