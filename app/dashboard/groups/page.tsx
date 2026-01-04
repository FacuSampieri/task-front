"use client"

import { useState } from "react"
import { useGetGroupsQuery, useCreateGroupMutation, useUpdateGroupMutation } from "@/lib/features/groups/groups-api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"

const COLOR_PALETTE = [
  "#f87171", // red
  "#fbbf24", // yellow
  "#34d399", // green
  "#60a5fa", // blue
  "#a78bfa", // purple
  "#f472b6", // pink
  "#facc15", // gold
]

export default function GroupsPage() {
  const { data: groups = [], isLoading, error } = useGetGroupsQuery()
  const [createGroup] = useCreateGroupMutation()
  const [updateGroup] = useUpdateGroupMutation()
  const [form, setForm] = useState({ name: "", color: COLOR_PALETTE[0] })
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({ name: "", color: COLOR_PALETTE[0] })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return
    await createGroup(form)
    setForm({ name: "", color: COLOR_PALETTE[0] })
  }

  const handleEdit = (group: any) => {
    setEditingId(group.id)
    setEditForm({ name: group.name, color: group.color })
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return
    await updateGroup({ groupId: editingId, data: editForm })
    setEditingId(null)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Grupos</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Crear nuevo grupo</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="flex flex-col gap-4">
            <Input
              placeholder="Nombre del grupo"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <div className="flex gap-2 items-center">
              {COLOR_PALETTE.map(color => (
                <button
                  key={color}
                  type="button"
                  className={`w-7 h-7 rounded-full border-2 ${form.color === color ? "border-black" : "border-transparent"}`}
                  style={{ background: color }}
                  onClick={() => setForm(f => ({ ...f, color }))}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
            <Button type="submit">Crear grupo</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Tus grupos</h2>
      {isLoading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6 text-center">
          <p className="text-destructive">Error al cargar los grupos.</p>
        </div>
      ) : groups.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">No tienes grupos aún.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map(group => (
            <Card key={group.id}>
              <CardContent className="flex items-center gap-4 py-4">
                <div className="w-6 h-6 rounded-full" style={{ background: group.color }} />
                {editingId === group.id ? (
                  <form onSubmit={handleUpdate} className="flex flex-col sm:flex-row gap-2 w-full items-center">
                    <Input
                      value={editForm.name}
                      onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                      required
                      className="w-40"
                    />
                    <div className="flex gap-2 items-center">
                      {COLOR_PALETTE.map(color => (
                        <button
                          key={color}
                          type="button"
                          className={`w-6 h-6 rounded-full border-2 ${editForm.color === color ? "border-black" : "border-transparent"}`}
                          style={{ background: color }}
                          onClick={() => setEditForm(f => ({ ...f, color }))}
                          aria-label={`Color ${color}`}
                        />
                      ))}
                    </div>
                    <Button type="submit" size="sm">Guardar</Button>
                    <Button type="button" size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancelar</Button>
                  </form>
                ) : (
                  <>
                    <span className="font-medium flex-1">{group.name}</span>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(group)}>
                      Editar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
