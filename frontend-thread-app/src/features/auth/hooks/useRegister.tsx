import { IUserRegister } from '@/types/User';
import { API } from '@/lib/api';
import { useState, ChangeEvent } from 'react'


export function useRegister() {
  const [form, setForm] = useState<IUserRegister>({
    email: "",
    username: "",
    full_name: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister() {
    try {
      const response = await API.post('/auth/register', form)
      console.log("register berhasil", response)
    } catch (err) {
      console.log(err)
    }
  }

  return { handleChange, handleRegister }

}