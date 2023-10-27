import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
import { BiSolidImageAdd } from "react-icons/bi"
import { useThreads } from "../hooks/useThreads"

export default function FormThread() {
  const { handlePost, handleChange, fileInputRef, handleButtonClick } = useThreads()

  return (
    <form onSubmit={handlePost} encType="multipart/form-data">
      <FormControl 
        display={"flex"} 
        flexDirection={"column"} 
        gap={2} 
        bg={"transparent"}  
        color={"white"}
      >
        <FormLabel>Content</FormLabel>
        <Input 
          placeholder="isikan apa yang kamu pikirkan..." 
          name="content" 
          onChange={handleChange} 
        />
        <Button
          variant={"ghost"}
          color={"brand.green"}
          onClick={handleButtonClick}
        >
          <BiSolidImageAdd
            style={{
              height: "50px",
              width: "50px",
            }}
          />
        </Button>
        <Input
          type="file"
          name="image"
          onChange={handleChange}
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <Box display={"flex"} justifyContent={"end"}>
          <Button 
            backgroundColor={"green"} 
            color={"white"} 
            colorScheme="green" 
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </FormControl>
    </form>
  )
}
// import { useState, ChangeEvent } from "react"
// import { FormControl, FormLabel, Input, Box, Button } from "@chakra-ui/react"
// import { API } from "@/lib/api"
// import { useMutation } from "@tanstack/react-query"

// type ThreadPost = {
//   content?: string,
//   image?: string
// }


// export default function FormThread({refetch}: {refetch: () => void}) {
//   const [form, setForm] = useState<ThreadPost>({
//     content: "",
//     image: "",
//   })

//   function handleChange(event: ChangeEvent<HTMLInputElement>) {
//     setForm({
//       ...form,
//       [event.target.name]: event.target.value
//     })
//   }


//   const mutation = useMutation({
//     mutationFn: async () => {await API.post("/thread", form)},
//     onSuccess: () => {
//       console.log("hahahaah");
//       refetch()
//     }
//   })

//   return (
//     <FormControl 
//       display={"flex"} 
//       flexDirection={"column"} 
//       gap={2} 
//       bg={"transparent"}  
//       color={"white"}
//       // onSubmit={() => mutation.mutate()}
//     >
//       <FormLabel>Content</FormLabel>
//       <Input 
//         placeholder="isikan apa yang kamu pikirkan..." 
//         name="content" 
//         onChange={handleChange} 
//       />
//       <Input 
//         placeholder="image..." 
//         name="image" 
//         onChange={handleChange} 
//       />
//       <Box display={"flex"} justifyContent={"end"}>
//         <Button 
//           backgroundColor={"green"} 
//           color={"white"} 
//           colorScheme="green" 
//           onClick={() => mutation.mutate()}
//           // type="submit"
//         >
//           Submit
//         </Button>
//       </Box>
//     </FormControl>
//   )
// }