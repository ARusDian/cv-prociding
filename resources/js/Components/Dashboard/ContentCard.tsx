import React from 'react'
import route from 'ziggy-js';
import { useForm } from '@inertiajs/inertia-react';

interface Props {
  editURL: string
  content: {
    id: number,
    created_at: Date,
    is_active: boolean,
  }
}

const ContentCard = ({ editURL, content }: Props) => {
  const date = new Date(content.created_at);
  const form = useForm();

  const toggleActive = () => {
    form.put(route('proc.toggle_active', content.id), {
      onError: (err) => console.log(err)
    });
  };

  return (
    <div className='flex flex-col w-full h-36 bg-gray-200 rounded-xl p-3 border border-gray-400 justify-between font-bold'>
      <p>Dibuat tanggal : {date.toLocaleDateString()}</p>
      <p>Status : {" "}
        {content.is_active ?
          <span className='text-green-700'>Aktif</span> :
          <span className='text-red-600'>Tidak aktif</span>
        }
      </p>
      <div className="self-end flex flex-row gap-3 font-normal">
          {!content.is_active ?
            <button onClick={toggleActive} className='rounded-lg py-2 w-24 bg-green-400 hover:bg-green-500 hover:text-white'>Aktif</button> :
            <button onClick={toggleActive} className='rounded-lg py-2 w-24 bg-red-500 hover:bg-red-600 hover:text-white'>Non-aktif</button>
          }

        <a href={editURL}><button className='rounded-lg py-2 w-24 bg-yellow-500  hover:bg-yellow-600 hover:text-white'>Tampilkan</button></a>
      </div>
    </div>
  )
}

export default ContentCard;