"use client"

import { useState } from "react"
import FileUploader from "@/components/file-uploader"
import FileList from "@/components/file-list"
import FilterSection from "@/components/filter-section"
import type { FileItem } from "@/types/file"

export default function Home() {
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
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">File Management System</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <FilterSection
            activeFilter={activeFilter}
            onFilterChange={applyFilter}
            onUploadClick={() => document.getElementById("fileUploader")?.click()}
          />
        </div>

        <div className="md:col-span-2">
          <FileUploader onFileUpload={handleFileUpload} />
          <FileList files={filteredFiles} onRemoveFile={removeFile} />
        </div>
      </div>
    </main>
  )
}

