import React from 'react'
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import { IHomeKeynote, IHomeKeynoteForm } from '@/Models/Home';
import KeynoteContent from '@/Components/Dashboard/KeynoteContent';
import { useForm } from '@inertiajs/inertia-react';

interface Props {
  keynotes: IHomeKeynote[]
}

const Keynote = ({ keynotes }: Props) => {
  const keynotesForm = useForm<IHomeKeynoteForm[]>(
    keynotes.length > 0 ?
      keynotes as IHomeKeynoteForm[] : [
        {
          id: 0,
          name: '',
          title: '',
          affiliation: '',
          rank: 1,
          img_path: '',
          input_img: "",
        }
      ])

  const addKeynote = () => {
    keynotesForm.setData((data) => [
      ...data,
      {
        id: 0,
        name: '',
        title: '',
        affiliation: '',
        rank: 1,
        img_path: '',
        input_img: "",
      }
    ])
  }

  const keynoteContentHandler = (index: number, target: string, value: string | number | File) => {
    keynotesForm.setData((data) => {
    //@ts-ignore
      data[index][target] = value
      return data
    })
  }

  const submitAddNote = () => {
    console.log(keynotesForm.data);
  }

  return (
    <MainDashboardAdminTailwind>
      <div className="overflow-hidden font-roboto flex flex-col gap-4 mt-4 px-2">
        <div className="flex flex-row items-center gap-3">
          <h1 className='font-bold text-3xl'>Keynote</h1>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={submitAddNote}>Simpan</button>
          <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full' onClick={addKeynote}>+</button>
        </div>
        <hr className='border-b border-b-black' />
        <div className="grid grid-cols-3 gap-10">
          {keynotesForm.data.map((_keynote, index) => (
            //@ts-ignore
            <KeynoteContent key={index} keynotesForm={keynotesForm} handler={keynoteContentHandler} index={index} />
          ))}
        </div>
      </div>
    </MainDashboardAdminTailwind>
  )
}

export default Keynote