import React from 'react';
import parse from "html-react-parser";
import MasterLayoutCSS from '@/Layouts/MasterLayoutCSS';

interface Props {
  content: any,
  active: string
}

const Home = ({ content, active }: Props) => {
  console.log(content);

  return (
    <MasterLayoutCSS active={active}>
      {content ? parse(content.content) : (<>Tidak ada content</>)}
    </MasterLayoutCSS>
  )
}

export default Home