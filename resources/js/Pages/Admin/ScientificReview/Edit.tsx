import React, { useRef, useState, useEffect } from "react";
import DashboardAdminLayoutCSS from '@/Layouts/DashboardAdminLayoutCSS';
import Jodit from '@/Components/TextEditor/Jodit'; 
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";
interface IProgramCommitte {
  content: string,
  type: string
}

interface Props {
  id: string,
  scientificReview: IProgramCommitte,
}
const Edit = ({ id, scientificReview }: Props) => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState(scientificReview.content);
  const [images, setImages] = useState<string[]>([]);
  const form = useForm({
    editorContent: '',
    images: [] as string[]
  })

  useEffect(() => {
    form.setData('images', images)
  }, [images])


  const submitHandler = () => {
    form.clearErrors();
    console.log(route('sci-rev.put', id));
    form.put(route('sci-rev.put', id), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log("success"),
    })
};

  const deleteHandler = () => {
    form.delete(route('sci-rev.delete', id));
  }

  return (
    <div style={{ overflow: "hidden" }}>
      <DashboardAdminLayoutCSS redirectTo={route("sci-rev.home")} headerTitle="Edit Program Committe" />
      <div style={{ all: "initial" }}></div>
      <div style={{ width: "80%", margin: "32px auto" }}>
        <Jodit
          contentValue={editorContent}
          contentValueHandler={(value: unknown) => form.setData('editorContent', value as string)}
          imageValue={form.data.images}
          imageValueHandler={setImages}
          editorRef={editorRef}
        />

        <button style={{ marginTop: "12px", backgroundColor: "lightgreen", borderWidth: 1, borderColor: "green", padding: "12px 24px", fontSize: "14px", borderRadius: "16px" }} onClick={submitHandler}>Simpan</button>
        <button style={{ marginTop: "12px", backgroundColor: "red", borderWidth: 1, borderColor: "#FFA500", padding: "12px 24px", fontSize: "14px", borderRadius: "16px", marginLeft: '10px', color: "white", fontWeight: "bold" }} onClick={deleteHandler}>Hapus</button>
      </div>
    </div>

  );
}

export default Edit;