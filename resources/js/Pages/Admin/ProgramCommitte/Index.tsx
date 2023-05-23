import ContentCard from '@/Components/Dashboard/ContentCard';
import MainDashboardAdminTailwind from '@/Layouts/MainDashboardAdminTailwind'
import Banner from '@/Components/Jetstream/Banner';
import React from 'react';
import "../../../../css/app.css";
import route from 'ziggy-js';
import { usePage } from '@inertiajs/inertia-react';

const content = [1, 2, 3];

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
          <p className='font-bold text-2xl'>Program Comitte</p>
          <a href={route("proc.create")} className='py-2 px-4 rounded-full text-2xl bg-[#FFA500] hover:bg-[#ffc14d] '>+</a>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          {contents && contents.map((content) => (
            <ContentCard key={content.id} content={content} editURL={route("proc.edit", content.id)} />
          ))}
        </div>
      </MainDashboardAdminTailwind>
    </div>
  )
}

export default Index