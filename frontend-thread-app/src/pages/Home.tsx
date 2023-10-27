import { Box } from '@chakra-ui/react';
import { ThreadCard } from '@/features/thread';
import FormThread from '@/features/thread/components/FormThread';
import { useThreads } from '@/features/thread/hooks/useThreads';

export default function Home() {
  const { threads } = useThreads()

  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        padding={"20px"}
        width="600px"
        borderRight={"1px solid"}
        borderLeft={"1px solid"}
        borderColor={"brand.grey"}
      >
        <FormThread />

        <Box>
        { threads?.map((item: any) => {
            return (
              <Box key={item.id}>
                <ThreadCard
                  user={item.user}
                  content={item.content}
                  likes_count={item.likes_count}
                  posted_at={item.posted_at}
                  replies_count={item.replies_count}
                  image={item.image}
                  is_liked={item.is_liked}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  )
}