import React from 'react'
import { useDropzone } from 'react-dropzone'

import { ActiveDropzone } from './ActiveDropzone'

interface DropzoneProps {
  children: React.ReactNode
  onUploadStarted: () => void
  onUploadComplete: (url?: string) => void
  onUploadFailed: () => void
}

export function Dropzone(props: DropzoneProps) {
  const { children, onUploadComplete, onUploadStarted, onUploadFailed } = props

  async function uploadFile({ file }) {
    const data = new FormData()
    data.append('image', file)
    const url = `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`
    const upload = await fetch(url, {
      method: 'POST',
      body: data,
    }).then((r) => r.json())
    return upload?.data?.url
  }

  const onDropAccepted = React.useCallback(async (acceptedFiles: File[]) => {
    onUploadStarted()

    const file = acceptedFiles[0]

    const url = await uploadFile({ file })
    if (!url) {
      onUploadFailed()
      return console.error('Upload failed')
    }
    return onUploadComplete(url)
  }, [])

  function onDropRejected() {
    alert('File rejected')
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    noKeyboard: true,
    multiple: false,
    noClick: true,
    maxSize: 1000 * 1000 * 3, // 3mb
    accept: ['image/jpeg', 'image/png', 'image/gif'],
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <ActiveDropzone /> : children}
    </div>
  )
}
