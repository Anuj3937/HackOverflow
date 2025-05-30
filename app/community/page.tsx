"use client"

import { useState } from "react"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreatePost } from "@/components/community/create-post"
import { CommunityFeed } from "@/components/community/community-feed"
import { Users, Plus } from "lucide-react"

const groups = [
  {
    id: 1,
    name: "Anxiety Support",
    members: 156,
    category: "Anxiety",
    description: "A safe space to discuss anxiety and coping mechanisms",
    isJoined: false,
  },
  {
    id: 2,
    name: "Student Stress Relief",
    members: 234,
    category: "Stress",
    description: "Support group for managing academic pressure",
    isJoined: false,
  },
  {
    id: 3,
    name: "Depression Support",
    members: 189,
    category: "Depression",
    description: "A community for those dealing with depression",
    isJoined: false,
  },
]

export default function Community() {
  const [activeGroups, setActiveGroups] = useState(groups)
  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleJoinGroup = (groupId: number) => {
    setActiveGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
          : group,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="max-w-7xl mx-auto mt-8 p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Safe Circle Community</h1>
          <div className="flex gap-2">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search groups..."
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <Button onClick={() => setShowCreatePost(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </div>
        </div>

        <Tabs defaultValue="groups" className="space-y-4">
          <TabsList>
            <TabsTrigger value="groups">Support Groups</TabsTrigger>
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-2 mt-4 mb-4">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              All Categories
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Anxiety
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Depression
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Stress
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              ADHD
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              Eating Disorders
            </Badge>
          </div>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGroups.map((group) => (
                <Card key={group.id}>
                  <CardHeader>
                    <CardTitle>{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">{group.category}</Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Users className="w-4 h-4 mr-1" />
                          {group.members} members
                        </div>
                      </div>
                      <div className="space-y-2">
                        {group.isJoined ? (
                          <>
                            <Button variant="outline" className="w-full" onClick={() => handleJoinGroup(group.id)}>
                              Leave Group
                            </Button>
                            <Button
                              className="w-full"
                              onClick={() => (window.location.href = `/community/${group.id}`)}
                            >
                              Enter Chat Room
                            </Button>
                          </>
                        ) : (
                          <Button className="w-full" onClick={() => handleJoinGroup(group.id)}>
                            Join Group
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feed">
            <CommunityFeed />
          </TabsContent>

          <TabsContent value="my-groups">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGroups
                .filter((group) => group.isJoined)
                .map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">{group.category}</Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Users className="w-4 h-4 mr-1" />
                            {group.members} members
                          </div>
                        </div>
                        <Button className="w-full" onClick={() => (window.location.href = `/community/${group.id}`)}>
                          Enter Chat Room
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <CreatePost open={showCreatePost} onOpenChange={setShowCreatePost} />
      </main>
    </div>
  )
}

