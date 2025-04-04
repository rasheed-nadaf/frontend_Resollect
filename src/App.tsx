"use client"

import { useState } from "react"
import FileUploader from "./components/FileUploader"
import FileList from "./components/FileList"
import FilterSection from "./components/FilterSection"
import type { FileItem } from "./types/file"
import "./App.css"

function App() {
  const [files, setFiles] = useState<FileItem[]>([])
  const [filteredFiles, setFilteredFiles] = useState<FileItem[]>([])
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const handleFileUpload = (newFiles: FileItem[]) => {
    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    applyFilter(activeFilter, updatedFiles)
  }

  const applyFilter = (filterType: string, fileList = files) => {
    setActiveFilter(filterType)

    if (filterType === "all") {
      setFilteredFiles(fileList)
      return
    }

    const filtered = fileList.filter((file) => file.type.includes(filterType))
    setFilteredFiles(filtered)
  }

  const removeFile = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id)
    setFiles(updatedFiles)
    applyFilter(activeFilter, updatedFiles)
  }

  return (
    <div className="app-container">
      <h1 className="app-title">File Management System</h1>

      <div className="app-content">
        <div className="sidebar">
          <FilterSection
            activeFilter={activeFilter}
            onFilterChange={applyFilter}
            onUploadClick={() => document.getElementById("fileUploader")?.click()}
          />
        </div>

        <div className="main-content">
          <FileUploader onFileUpload={handleFileUpload} />
          <FileList files={filteredFiles} onRemoveFile={removeFile} />
        </div>
      </div>
    </div>
  )
}

export default App

