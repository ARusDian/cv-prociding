import React from 'react'
import { IHomeKeynoteForm } from '@/Models/Home';
import { InertiaFormProps } from '@inertiajs/inertia-react';

interface Props {
  keynotesForm: InertiaFormProps<IHomeKeynoteForm>
  index: number,
  handler: (index: number, target:string, value: string | number) => void
}

const KeynoteContent = ({ keynotesForm, handler, index }: Props) => {
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-col items-start justify-around gap-2 mb-8 h-full">
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Foto : </p>
          <input type="file" name='img' className="rounded-lg w-56 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Name : </p>
          <input type="text" name='name' className="rounded-lg w-56 h-8 text-sm border border-green-900" value={keynotesForm.data.name} onChange={(e) => handler(index, "name", e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Title : </p>
          <input type="text" name='title' className="rounded-lg w-56 h-8 text-sm border border-green-900" />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Affiliation : </p>
          <input type="text" name='affiliation' className="rounded-lg w-56 h-8 text-sm border border-green-900" />
        </div>
        <div className="flex flex-row items-center gap-3 text-sm">
          <p className='w-[70px]'>Rank  : </p>
          <select name="rank" className='h-8 text-xs' defaultValue={1}>
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div>
        <button className='text-sm bg-red-500 px-2 py-1 rounded-lg self-end text-gray-900 font-semi-bold'>Hapus</button>
      </div>
      <div className="h-full w-full border border-gray-300 rounded-lg">
        <img src="https://i.pinimg.com/736x/1d/d8/1e/1dd81e7616e52ae56a56b3974b952172.jpg" className='w-fit h-[100%] object-cover rounded-lg' />
      </div>
    </div>
  )
}

export default KeynoteContent