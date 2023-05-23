import React, { useRef, useState, useEffect } from "react";
import DashboardAdminLayoutCSS from '@/Layouts/DashboardAdminLayoutCSS';
import Jodit from '@/Components/TextEditor/Jodit';
import { useForm } from "@inertiajs/inertia-react";
import route from "ziggy-js";
import { asset } from "@/Models/Helper";

interface IProgramCommitte {
  content: string,
  type: string
}

interface Props {
  id: string,
  programCommitte: IProgramCommitte
}

const Edit = ({ id, programCommitte }: Props) => {
  const editorRef = useRef();
  const [editorContent, setEditorContent] = useState(programCommitte.content);
  const [images, setImages] = useState<string[]>([]);
  console.log(programCommitte.content);
  const form = useForm({
    editorContent: '',
    images: [] as string[]
  })

  useEffect(() => {
    form.setData('images', images)
  }, [images])


  const submitHandler = () => {
    form.clearErrors();
    form.put(route('proc.put', id), {
      onError: (err) => console.log(err),
      onSuccess: () => console.log("success"),
    })
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <DashboardAdminLayoutCSS redirectTo={route("proc.home")} headerTitle="Edit Program Committe" />
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
        <button style={{ marginTop: "12px", backgroundColor: "red", borderWidth: 1, borderColor: "#FFA500", padding: "12px 24px", fontSize: "14px", borderRadius: "16px", marginLeft: '10px', color: "white", fontWeight: "bold" }}>Hapus</button>
      </div>
    </div>

  );
}



export default Edit;