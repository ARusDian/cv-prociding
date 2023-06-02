import React from 'react';
import { FileUploader } from 'react-drag-drop-files';

const GalleryCard = () => {
  const [image, setImage] = React.useState<File | string>('')
  const [imagePreview, setImagePreview] = React.useState<string | undefined>(undefined);

  const dropZoneStyle = (
    <div className='w-full h-[80%] border border-dashed border-black flex flex-col justify-center items-center'>
      <p className='opacity-60'>Drag or drop image here...</p>
    </div>
  )

  const onDragOrDropHandler = (files: File) => {
    setImage(files);
    setImagePreview(URL.createObjectURL(files));
  }

  return (
    <>
      <div className="w-full h-64 bg-red-200 rounded-b-xl">
        <FileUploader children={dropZoneStyle} onDrop={onDragOrDropHandler} onSelect={onDragOrDropHandler} />
        <div className="h-[20%] flex flex-row justify-center items-center gap-5 text-sm">
          <button className='px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 hover:text-white'>Simpan</button>
          <button className='px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:text-white'>Hapus</button>
        </div>
      </div>
    </>
  )
}

export default GalleryCard