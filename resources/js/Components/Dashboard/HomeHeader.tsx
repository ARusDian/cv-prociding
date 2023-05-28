import { InertiaFormProps } from '@inertiajs/inertia-react'
import React from 'react'
import route from 'ziggy-js'
import { IHomeHeader } from '@/types'
import { RequestPayload } from '@inertiajs/inertia'
import axios from 'axios'

interface Props {
  headerForm: InertiaFormProps<IHomeHeader>,
  header: IHomeHeader
}

const HomeHeader = ({ headerForm, header }: Props) => {
  const headSubmit = () => {
    if (!header) {
      headerForm.post(route('home.header.store'), {
        onError: (err) => console.error(err),
      });
    } else {
      axios.put(route('home.header.put', headerForm.data.id), headerForm.data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data"
        }
      }).then(res => console.log(res))
      .catch(err => console.error(err));
    }
  }

  return (
    <div id='head-content' className="flex flex-row">
      <div className="flex flex-col gap-4 items-start px-2 w-[50%]">
        <h1 className='font-semibold text-2xl'>Header</h1>
        <div className="flex flex-row items-center gap-6">
          <p className='w-[100px]'>Logo : </p>
          <input type="file" name='logo_path' className="rounded-lg w-96 border border-green-900 file:bg-green-500 file:py-2 file:px-4 file:mr-4 file:border-none file:hover:cursor-pointer file:placeholder:" accept='.jpg, .jpeg, .png' onChange={(e) => headerForm.setData("input_logo_path", e.target?.files![0])} />
        </div>
        <div className="flex flex-row items-center gap-6">
          <p className='w-[100px]'>Date Stamp : </p>
          <input type="date" name='date_stamp' className='w-96 rounded-lg' value={headerForm.data.date_stamp} onChange={(e) => headerForm.setData("date_stamp", e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-6">
          <p className='w-[100px]'>Title : </p>
          <input type="text" name='title' className='w-96 rounded-lg' placeholder='Title....' value={headerForm.data.title} onChange={(e) => headerForm.setData("title", e.target.value)} />
        </div>
        <div className="flex flex-row items-center gap-6">
          <p className='w-[100px]'>Sub-title : </p>
          <input type="text" name='subtitle' className='w-96 rounded-lg' placeholder='Sub-title....' value={headerForm.data.subtitle} onChange={(e) => headerForm.setData("subtitle", e.target.value)} />
        </div>
        <button className='px-4 py-2 bg-green-500 rounded-lg text-slate-100 border border-green-600 hover:opacity-80 duration-300 ease-out' onClick={headSubmit}>Simpan</button>
      </div>
      <div className="flex flex-col gap-4 items-start px-2 w-[50%]">
        <h1 className='font-semibold text-2xl'>Logo Picture</h1>
        <img src={ headerForm.data.logo_path } alt="" className='h-64 object-contain' />
      </div>
    </div>
  )
}

export default HomeHeader