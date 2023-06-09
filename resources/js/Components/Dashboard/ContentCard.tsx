import React from 'react'
import route from 'ziggy-js';
import { useForm } from '@inertiajs/inertia-react';
import moment from 'moment';
import parse from "html-react-parser";

interface Props {
  editURL: string
  content: {
    id: number,
    created_at: Date,
    content: string,
    is_active: boolean
  },
  toggleActiveURL: string
}

const ContentCard = ({ editURL, content, toggleActiveURL }: Props) => {
  const form = useForm();

  const toggleActive = () => {
    form.put(route(toggleActiveURL, content.id), {
      onError: (err) => console.log(err)
    });
  };

  return (
    <div className='flex flex-col gap-2 w-full bg-gray-200 rounded-xl p-3 border border-gray-400 justify-between font-bold'>
      <p>Created at : {moment(content.created_at).format("YYYY-MM-DD, h:mm A")}</p>
      <p>Status : {" "}
        {content.is_active ?
          <span className='text-green-600'>Active</span> :
          <span className='text-red-600'>Inactive</span>
        }
      </p>
      {/* <p className='truncate font-normal text-sm w-[85%] text-left prose'>{parse(content.content)}</p> */}
      <div className="self-end flex flex-row gap-3 font-normal">
        {!content.is_active ?
          <button onClick={toggleActive} className='rounded-lg py-2 w-24 bg-green-500 hover:bg-green-600 hover:text-white'>Active</button> :
          <button onClick={toggleActive} className='rounded-lg py-2 w-24 bg-red-500 hover:bg-red-600 hover:text-white'>Inactive</button>
        }
        <a href={editURL}><button className='rounded-lg py-2 w-24 bg-yellow-500  hover:bg-yellow-600 hover:text-white'>Show</button></a>
      </div>
    </div>
  )
}

export default ContentCard;