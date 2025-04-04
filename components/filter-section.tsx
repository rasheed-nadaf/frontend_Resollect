"use client"

import { Upload, Filter, FileType, Image, FileText, FileArchive } from "lucide-react"

interface FilterSectionProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  onUploadClick: () => void
}

export default function FilterSection({ activeFilter, onFilterChange, onUploadClick }: FilterSectionProps) {
  const filters = [
    { id: "all", label: "All Files", icon: FileType },
    { id: "image", label: "Images", icon: Image },
    { id: "text", label: "Documents", icon: FileText },
    { id: "application", label: "Applications", icon: FileArchive },
  ]

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="mb-6">
        <button
          onClick={onUploadClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
        >
          <Upload className="h-4 w-4" />
          Upload Files
        </button>
      </div>

      <div className="mb-3 flex items-center">
        <Filter className="h-5 w-5 mr-2 text-gray-500" />
        <h3 className="font-medium">Filters</h3>
      </div>

      <ul className="space-y-1">
        {filters.map((filter) => {
          const Icon = filter.icon
          return (
            <li key={filter.id}>
              <button
                onClick={() => onFilterChange(filter.id)}
                className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                  activeFilter === filter.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {filter.label}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

