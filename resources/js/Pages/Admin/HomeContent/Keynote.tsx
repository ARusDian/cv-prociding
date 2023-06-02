import React, { useState } from 'react'
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import { IHomeKeynote, IHomeKeynoteForm } from '@/Models/Home';
import KeynoteContent from '@/Components/Dashboard/KeynoteContent';
import { useForm } from '@inertiajs/inertia-react';
import route from 'ziggy-js';

interface Props {
  keynotes: IHomeKeynote[]
}

const Keynote = ({ keynotes }: Props) => {
  const keynotesForm = useForm<IHomeKeynoteForm[]>(keynotes.length > 0 ? keynotes as IHomeKeynoteForm[] : [{
    id: 0,
    name: '',
    title: '',
    affiliation: '',
    rank: 1,
    img_path: '',
    input_img: "",
  }]);
  const [error, setError] = useState<string[]>([]);

  const addKeynote = () => {
    if (keynotesForm.data.length >= 6) {
      return;
    }
    const newID = keynotesForm.data.length > 0 ? keynotesForm.data[keynotesForm.data.length - 1].id + 1 : 1;
    keynotesForm.setData((data) => [
      ...data,
      {
        id: newID,
        name: '',
        title: '',
        affiliation: '',
        rank: 1,
        img_path: '',
        input_img: "",
      }
    ])
  }

  const updateKeynoteValue = (id: number, key: string, value: string | number | File) => {
    keynotesForm.setData((data) => {
      return data.map((k) => {
        if (k.id === id) {
          return {
            ...k,
            [key]: value,
          }
        }
        return k
      });
    });
  }

  const removeKeynote = (id: number) => {
    const filteredKeynotes = keynotesForm.data.filter((k) => k.id !== id);
    keynotesForm.setData(filteredKeynotes);
  }

  const submitAddNote = () => {
    keynotesForm.clearErrors();
    keynotesForm.post(route('home.keynote.store'), {
      onError: (errors) => {
        console.log(errors);
        const listError: string[] = [];
        for (const property in errors) {
          listError.push(errors[property]);
        }

        setError(listError);
      }
    })
  }

  return (
    <MainDashboardAdminTailwind>
      <div className="overflow-hidden font-roboto flex flex-col gap-4 mt-4 px-2">
        <div className="flex flex-row items-center gap-3">
          <h1 className='font-bold text-3xl'>Keynote</h1>
          <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={submitAddNote}>Simpan</button>
          <button className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full' onClick={addKeynote}>+</button>
          <div className="flex flex-col text-xs">
            {error.length > 0 && error.map(err => (
              <p className='text-red-500'>{err.split('.')[1]}</p>
            ))}
          </div>
        </div>
        <hr className='border-b border-b-black' />
        <div className="grid grid-cols-3 gap-10">
          {keynotesForm.data.map((keynote, index) => (
            <KeynoteContent key={keynote.id} keynotes={keynote} removeKeynote={removeKeynote} updateKeynoteValue={updateKeynoteValue} />
          ))}
        </div>
      </div>
    </MainDashboardAdminTailwind >
  )
}

export default Keynote