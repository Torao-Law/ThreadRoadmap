import { IThreadCard, IThreadPost } from "@/types/Thread";
import { API } from "@/lib/api";
import { ChangeEvent, useState } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';


export function useThreads() {
  const [form, setForm] = useState<IThreadPost>({
    content: "",
    image: "",
    user: 1
  });
  
  const { data: getThreads, refetch } = useQuery<IThreadCard[]>({
    queryKey: ['threads'],
    queryFn: async () => await API.get('/threads')
      .then((res) => res.data)
  });

  const handlePost = useMutation({
    mutationFn: async () => {await API.post("/thread", form)},
    onSuccess: () => refetch()
  })

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  return { form, getThreads, handleChange, handlePost };
}
