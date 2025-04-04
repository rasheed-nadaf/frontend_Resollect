"use client"

import type { FileItem } from "../types/file"
import { formatFileSize, formatDate } from "../utils/helpers"
import "./FileList.css"

interface FileListProps {
  files: FileItem[]
  onRemoveFile: (id: string) => void
}

export default function FileList({ files, onRemoveFile }: FileListProps) {
  if (files.length === 0) {
    return (
      <div className="empty-files">
        <p>No files uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="file-list-container">
      <div className="file-list-wrapper">
        <table className="file-table">
          <thead>
            <tr>
              <th>File</th>
              <th>Type</th>
              <th>Size</th>
              <th>Uploaded</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>
                  <div className="file-name">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className="file-name-text">{file.name}</span>
                  </div>
                </td>
                <td>{file.type || "Unknown"}</td>
                <td>{formatFileSize(file.size)}</td>
                <td>{formatDate(file.uploadDate)}</td>
                <td>
                  <button onClick={() => onRemoveFile(file.id)} className="delete-button" aria-label="Delete file">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
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

