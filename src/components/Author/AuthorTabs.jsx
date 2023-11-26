import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Followers, Following, Blogs } from "../index"


function AuthorTabs({authorUUID}) {
  return (
    <Tabs defaultValue="posts" className="w-full">
        <TabsList>
            <TabsTrigger value="posts">posts</TabsTrigger>
            <TabsTrigger value="followers">followers</TabsTrigger>
            <TabsTrigger value="following">following</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
            <Blogs authorUUID={authorUUID}/>
        </TabsContent>
        <TabsContent value="followers">
            <Followers authorUUID={authorUUID}/>
        </TabsContent>
        <TabsContent value="following">
            <Following authorUUID={authorUUID}/>
        </TabsContent>
    </Tabs>
  )
}

export default AuthorTabs