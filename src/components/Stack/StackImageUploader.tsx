import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash, Upload } from 'react-feather'

import { LoadingSpinner } from '~/components/LoadingSpinner'

export function StackImageUploader({ stack, onImageUploaded }) {
  const [loading, setLoading] = useState(false)
  const [initialImage, setInitialImage] = useState(stack?.image)
  const [previewImage, setPreviewImage] = useState(null)

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

  const onDrop = useCallback(async (acceptedFiles) => {
    setLoading(true)
    const file = acceptedFiles[0]

    const url = await uploadFile({ file })
    if (!url) {
      setLoading(false)
      return console.error('Upload failed')
    }
    setLoading(false)
    setPreviewImage(url)
    return onImageUploaded(url)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxSize: 1000 * 1000, // 1mb
    accept: '.jpg,.png,.jpeg',
    multiple: false,
  })

  if (initialImage || previewImage) {
    return (
      <div className="relative inline-block w-24 h-24 border border-gray-100 rounded-lg dark:border-gray-900">
        <Image
          src={initialImage || previewImage}
          width="96"
          height="96"
          layout="fixed"
          quality={100}
          className={`rounded-lg inline-block`}
        />
        <button
          onClick={() => {
            setInitialImage(false)
            setPreviewImage(null)
            onImageUploaded(null)
          }}
          className="absolute p-2 text-white border-2 border-white rounded-full shadow-md cursor-pointer hover:bg-red-500 dark:bg-gray-700 dark:border-gray-800 -top-3 -right-3 bg-gray-1000 focus:bg-red-500"
        >
          <Trash size={16} />
        </button>
      </div>
    )
  }

  return (
    <div
      {...getRootProps()}
      className={`flex items-center justify-center w-24 h-24 p-6 border border-gray-200 border-dashed rounded-md dark:border-gray-700 bg-gray-100 hover:bg-gray-150 dark:bg-gray-800 dark:hover:border-gray-600 dark:hover:bg-gray-800 text-tertiary cursor-pointer`}
    >
      <input {...getInputProps()} />
      {loading ? <LoadingSpinner /> : <Upload size={16} />}
    </div>
  )
}
