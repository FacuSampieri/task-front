"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  useGetFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} from "@/lib/features/files/files-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Upload, File, Download, Trash2, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface TaskFilesProps {
  taskId: string
}

export function TaskFiles({ taskId }: TaskFilesProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadingFile, setUploadingFile] = useState(false)

  const { data: files = [], isLoading } = useGetFilesQuery(taskId)
  const [uploadFile] = useUploadFileMutation()
  const [deleteFile] = useDeleteFileMutation()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingFile(true)
    try {
      await uploadFile({ taskId, file }).unwrap()
      toast({
        title: "Archivo subido",
        description: "El archivo se ha subido correctamente",
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch (error) {
      toast({
        title: "Error al subir archivo",
        description: "No se pudo subir el archivo. Por favor, intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setUploadingFile(false)
    }
  }

  const handleDownload = (fileId: string, filename: string) => {
    const downloadUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/files/${fileId}/download`
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async (fileId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este archivo?")) return

    try {
      await deleteFile({ taskId, fileId }).unwrap()
      toast({
        title: "Archivo eliminado",
        description: "El archivo se ha eliminado correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el archivo",
        variant: "destructive",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Archivos Adjuntos</CardTitle>
          <Button size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploadingFile}>
            {uploadingFile ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subiendo...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Subir Archivo
              </>
            )}
          </Button>
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Cargando archivos...</p>
        ) : files.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No hay archivos adjuntos</p>
        ) : (
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between gap-4 rounded-lg border bg-background p-3 transition-colors hover:bg-accent/50"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <File className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.filename}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(file.uploadedAt), "d MMM yyyy", { locale: es })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDownload(file.id, file.filename)}
                    className="h-8 w-8"
                  >
                    <Download className="h-4 w-4" />
                    <span className="sr-only">Descargar</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(file.id)}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
