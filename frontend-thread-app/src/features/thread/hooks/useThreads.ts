// import { IThreadCard, IThreadPost } from "@/types/Thread";
// import { API } from "@/lib/api";
// import { ChangeEvent, useState } from "react";
// import { useQuery, useMutation } from '@tanstack/react-query';


// export function useThreads() {
//   const [form, setForm] = useState<IThreadPost>({
//     content: "",
//     image: ""
//   });
  
//   const { data: getThreads, refetch } = useQuery<IThreadCard[]>({
//     queryKey: ['thread'],
//     queryFn: async () => await API.get('/threads')
//       .then((res) => res.data)
//   });

//   // const handlePost = useMutation({
//   //   mutationFn: async () => {await API.post("/thread", form)},
//   //   onSuccess: () => refetch()
//   // })

//   const handlePost = useMutation({
//     mutationFn: async () => {
//       const formData = new FormData();
//       formData.append("content", form.content);
//       formData.append("image", form.image);

//       await API.post("/thread", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     },
//     onSuccess: () => refetch(),
//   });

//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     setForm({
//       ...form,
//       [event.target.name]: event.target.value,
//     });
//   }

//   return { form, getThreads, handleChange, handlePost };
// }


import { IThreadCard, IThreadPost } from "@/types/Thread";
import { API } from "@/lib/api";
import { ChangeEvent, useEffect, useState, useRef, FormEvent } from "react";

export function useThreads() {
  const [threads, setThreads] = useState<IThreadCard[]>();
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
  });

  async function getThreads() {
    const response = await API.get("/threads");
    console.log("ini threads", response.data);
    setThreads(response.data);
  }

  async function handlePost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // console.log(form);
    console.log("test image", form.image);

    const formData = new FormData();
    formData.append("content", form.content);
    formData.append("image", form.image as File);

    const response = await API.post("/thread", formData);
    console.log("berhasil menambahkan thread", response);
    getThreads();
  }

  useEffect(() => {
    getThreads();
  }, []);
  
  useEffect(() => {
    setThreads(threads);
  }, [threads]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = event.target;
    console.log("testing", name, value, files);

    if (files) {
      console.log("masuk file");
      setForm({
        ...form,
        [name]: files[0],
      });
    } else {
      console.log("masuk biasa");
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  return { handleChange, handlePost, threads, fileInputRef, handleButtonClick };
}

