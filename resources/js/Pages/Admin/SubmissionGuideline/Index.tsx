import ContentCard from '@/Components/Dashboard/ContentCard';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import React from 'react';
import "../../../../css/app.css";
import { Link } from '@inertiajs/inertia-react';
import route from 'ziggy-js';

interface Props {
  contents: [{
    id: number,
    created_at: Date,
    is_active: boolean,
  }]
  // success?: string
}

const Index = ({ contents }: Props) => {
  return (
    <div className='overflow-hidden font-roboto'>
      <MainDashboardAdminTailwind>
        {/* <Banner /> */}
        <div className="flex flex-row gap-4 items-center">
          <p className='font-bold text-2xl'>Submission Guideline</p>
          <a href={route("sub.create")} className='py-2 px-4 rounded-full text-2xl bg-green-500 hover:bg-[#FFA500] '>+</a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {contents && contents.map((content) => (
            <ContentCard key={content.id} content={content} editURL={route("sub.edit", content.id)} toggleActiveURL='sub.toggle_active' />
          ))}
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}

export default Index