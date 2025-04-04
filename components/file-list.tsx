"use client"

import type { FileItem } from "@/types/file"
import { formatFileSize, formatDate } from "@/lib/utils"
import { File, Trash2 } from "lucide-react"

interface FileListProps {
  files: FileItem[]
  onRemoveFile: (id: string) => void
}

export default function FileList({ files, onRemoveFile }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="text-center p-8 border border-gray-200 rounded-lg">
        <p className="text-gray-500">No files uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Uploaded
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {files.map((file) => (
              <tr key={file.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <File className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{file.type || "Unknown"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatFileSize(file.size)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatDate(file.uploadDate)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onRemoveFile(file.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

