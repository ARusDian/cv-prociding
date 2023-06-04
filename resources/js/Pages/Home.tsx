import React from 'react';
import parse from "html-react-parser";
import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';
import "../../css/app.css";

interface Props {
  content: any,
  active: string
}

const Home = ({ content, active }: Props) => {
  console.log(content);

  return (
    <MasterLayoutCSS active={active}>
      <div className="w-[70%] mx-auto mt-[70px] pt-4 font-roboto">
        <div className="break-words">
          {content ? parse(content.content) : (<>Tidak ada content</>)}
        </div>
      </div>
    </MasterLayoutCSS>
  )
}

export default Home