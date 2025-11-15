import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    const arrayBuffer = await file.arrayBuffer()
    const uint8 = new Uint8Array(arrayBuffer)

    // Server-side validation
    const MAX_BYTES = 5 * 1024 * 1024 // 5 MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const fileType = (file as any).type || ''

    if (uint8.length > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 413 })
    }

    if (fileType && !allowedTypes.includes(fileType)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 415 })
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'products')
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

    const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.\-]/g, '_')}`
    const filePath = path.join(uploadsDir, safeName)
    fs.writeFileSync(filePath, uint8)

    const url = `/images/products/${safeName}`
    return NextResponse.json({ url })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Upload error', err)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
