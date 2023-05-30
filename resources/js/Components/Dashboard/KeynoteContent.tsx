import React from 'react'
import { IHomeKeynoteForm } from '@/Models/Home';
import { InertiaFormProps } from '@inertiajs/inertia-react';

interface Props {
  keynotes: IHomeKeynoteForm,
  removeKeynote: (index: number) => void,
  updateKeynoteValue: (id: number, key: string, value: string | number | File) => void,
}

const KeynoteContent = ({ keynotes, removeKeynote, updateKeynoteValue }: Props) => {
  const [previewImage, setPreviewImage] = React.useState<string | undefined>(keynotes.img_path);

  return (
    <div className="flex flex-row gap-2 h-72">
      <div className="flex flex-col items-start justify-around gap-2 mb-8 h-full">
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Foto : </p>
          <input type="file" name='img' className="rounded-lg w-56 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={(e) => {
            updateKeynoteValue(keynotes.id, 'input_img', e.target.files![0])
            setPreviewImage(URL.createObjectURL(e.target?.files![0]));
          }} />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Name : </p>
          <input type="text" name='name' className="rounded-lg w-56 h-8 text-sm border border-green-900" value={keynotes.name} onChange={(e) => updateKeynoteValue(keynotes.id, 'name', e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Title : </p>
          <input type="text" name='title' className="rounded-lg w-56 h-8 text-sm border border-green-900" value={keynotes.title} onChange={(e) => updateKeynoteValue(keynotes.id, 'title', e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Affiliation : </p>
          <input type="text" name='affiliation' className="rounded-lg w-56 h-8 text-sm border border-green-900" value={keynotes.affiliation} onChange={(e) => updateKeynoteValue(keynotes.id, 'affiliation', e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Rank  : </p>
          <select name="rank" className='h-8 text-xs' defaultValue={1} value={keynotes.rank} onChange={(e) => updateKeynoteValue(keynotes.id, 'rank', e.target.value)}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <button className='text-sm bg-red-500 px-2 py-1 rounded-lg self-end text-gray-900 font-semi-bold' onClick={() => removeKeynote(keynotes.id)}>Hapus</button>
      </div>
      {previewImage || keynotes.img_path ?
        (
          <div className="h-full w-full border border-gray-300 rounded-lg">
            <img src={previewImage || keynotes.img_path} className='w-full h-full object-cover rounded-lg' />
          </div>
        ) :
        (
          <div className="h-full w-full border border-gray-300 rounded-lg flex items-center justify-center">
            <p className='text-sm text-gray-500'>No Image</p>
          </div>
        )}
    </div>
  )
}

export default KeynoteContent