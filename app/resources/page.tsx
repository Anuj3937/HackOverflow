"use client"

import { useState, useEffect } from "react"
import { Nav } from "@/components/nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Star,
  Clock,
  Video,
  Phone,
  Mail,
  GraduationCap,
  Languages,
  Heart,
  CheckCircle,
  Filter,
} from "lucide-react"
import Link from "next/link"

// Enhanced therapist data with more details
const therapists = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specialization: "Anxiety & Depression",
    approach: "Cognitive Behavioral Therapy (CBT)",
    experience: "12 years",
    education: "Ph.D. in Clinical Psychology, AIIMS Delhi",
    languages: ["English", "Hindi"],
    acceptingNewPatients: true,
    rating: 4.9,
    reviews: 124,
    image: "/placeholder.svg",
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      address: "123 Therapy Street, Connaught Place, New Delhi",
      distance: 2.3
    },
    insurance: ["Star Health", "ICICI Lombard", "HDFC ERGO"],
    nextAvailable: "Tomorrow",
    sessionTypes: ["in-person", "video"],
    price: 1500,
    bio: "Dr. Sharma specializes in helping individuals manage anxiety and depression through evidence-based CBT approaches. Her empathetic style creates a safe environment for exploring emotional challenges.",
    areas: ["Anxiety", "Depression", "Stress Management", "Academic Pressure", "Life Transitions"]
  },
  {
    id: "2",
    name: "Dr. Arjun Mehta",
    title: "Licensed Therapist",
    specialization: "Stress Management",
    approach: "Mindfulness-Based Stress Reduction (MBSR)",
    experience: "8 years",
    education: "Psy.D. in Clinical Psychology, NIMHANS Bangalore",
    languages: ["English", "Kannada"],
    acceptingNewPatients: true,
    rating: 4.8,
    reviews: 98,
    image: "/placeholder.svg",
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
      address: "46 Wellness Avenue, Indiranagar, Bangalore",
      distance: 3.1
    },
    insurance: ["Apollo Munich", "Max Bupa"],
    nextAvailable: "Today",
    sessionTypes: ["video"],
    price: 1300,
    bio: "Dr. Mehta helps individuals develop practical stress management techniques through mindfulness practices. He specializes in academic stress and performance anxiety, focusing on balancing achievement with well-being.",
    areas: ["Stress", "Anxiety", "Mindfulness", "Academic Performance", "Work-Life Balance"]
  },
  {
    id: "3",
    name: "Dr. Anjali Gupta",
    title: "Counseling Psychologist",
    specialization: "Academic Pressure & Burnout",
    approach: "Solution-Focused Brief Therapy",
    experience: "15 years",
    education: "Ph.D. in Counseling Psychology, Tata Institute of Social Sciences (TISS), Mumbai",
    languages: ["English", "Hindi", "Marathi"],
    acceptingNewPatients: true,
    rating: 4.7,
    reviews: 156,
    image: "/placeholder.svg",
    location: {
      latitude: 19.0760,
      longitude: 72.8777,
      address: "79 Campus Drive, Bandra West, Mumbai",
      distance: 4.5
    },
    insurance: ["Star Health", "Reliance Health"],
    nextAvailable: "In 2 days",
    sessionTypes: ["in-person", "video"],
    price: 1400,
    bio:
      "Dr. Gupta specializes in helping high-achieving students navigate academic pressure and prevent burnout. Her practical, solution-focused approach helps students develop sustainable study habits and self-care practices.",
    areas:
      ["Academic Stress", "Burnout", "Perfectionism", "Time Management", "Self-Care"]
  },
  {
    id: "4",
    name: "Dr. Vikram Singh",
    title: "Clinical Psychologist",
    specialization: "Trauma & PTSD",
    approach: "EMDR & Trauma-Focused CBT",
    experience: "20 years",
    education: "Ph.D., PGIMER Chandigarh",
    languages: ["English", "Hindi", "Punjabi"],
    acceptingNewPatients: false,
    rating: 4.9,
    reviews: 210,
    image: "/placeholder.svg",
    location: {
      latitude: 30.7333,
      longitude: 76.7794,
      address: "321 Healing Boulevard, Sector-17, Chandigarh",
      distance: 1.8
    },
    insurance: ["ICICI Lombard", "Star Health"],
    nextAvailable: "In 3 weeks",
    sessionTypes: ["in-person", "video"],
    price: 1750,
    bio: "Dr. Singh specializes in trauma treatment using EMDR and CBT techniques to help clients process traumatic experiences effectively and develop resilience.",
    areas: ["Trauma", "PTSD", "Anxiety", "Depression", "Grief & Loss"]
  },
  {
    id: "5",
    name: "Dr. Neha Kulkarni",
    title: "Licensed Psychologist",
    specialization: "Eating Disorders",
    approach: "Integrative & Health at Every Size",
    experience: "10 years",
    education: "Psy.D., SNDT University Mumbai",
    languages: ["English", "Hindi", "Marathi"],
    acceptingNewPatients: true,
    rating: 4.8,
    reviews: 87,
    image: "/placeholder.svg",
    location: {
      latitude: 18.5204,
      longitude: 73.8567,
      address: "55 Wellness Way, Koregaon Park, Pune",
      distance: 2.7
    },
    insurance: ["Bajaj Allianz Health Insurance"],
    nextAvailable: "In 1 week",
    sessionTypes: ["in-person", "video"],
    price: 1300,
    bio: "Dr. Kulkarni treats eating disorders and body image concerns with compassion and a non-judgmental approach, helping clients build a positive relationship with themselves.",
    areas: ["Eating Disorders", "Body Image Issues", "Self-Esteem", "Anxiety", "Depression"]
  }
];

// Educational resources
const resources = [
  {
    category: "Mental Health Basics",
    items: [
      {
        title: "Understanding Mental Health",
        type: "article",
        description: "An introduction to mental health concepts and the importance of mental wellness.",
        link: "/resources/understanding-mental-health",
      },
      {
        title: "Signs of Common Mental Health Conditions",
        type: "video",
        description: "Learn to recognize symptoms of anxiety, depression, and other common conditions.",
        link: "/resources/mental-health-signs",
      },
    ],
  },
  {
    category: "Self-Help Tools",
    items: [
      {
        title: "Stress Management Techniques",
        type: "guide",
        description: "Practical strategies to manage stress in academic settings.",
        link: "/resources/stress-management",
      },
      {
        title: "Mindfulness Meditation for Beginners",
        type: "audio",
        description: "Guided meditations to help reduce anxiety and improve focus.",
        link: "/resources/mindfulness-meditation",
      },
    ],
  },
  {
    category: "Academic Success",
    items: [
      {
        title: "Balancing Academics and Mental Health",
        type: "article",
        description: "Strategies for maintaining well-being while pursuing academic excellence.",
        link: "/resources/academic-balance",
      },
      {
        title: "Overcoming Test Anxiety",
        type: "workshop",
        description: "Techniques to manage anxiety before and during exams.",
        link: "/resources/test-anxiety",
      },
    ],
  },
]

export default function Resources() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null)
  const [selectedSessionType, setSelectedSessionType] = useState<"in-person" | "video">("video")
  const [searchQuery, setSearchQuery] = useState("")
  const [specialization, setSpecialization] = useState<string>("")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showInsuranceOnly, setShowInsuranceOnly] = useState(false)
  const [selectedInsurance, setSelectedInsurance] = useState<string>("")
  const [distanceRange, setDistanceRange] = useState(10)
  const [acceptingNewPatients, setAcceptingNewPatients] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("")

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserLocation(position),
        (error) => console.error("Error getting location:", error),
      )
    }
  }, [])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Apply all filters
  const filteredTherapists = therapists
    .filter(
      (therapist) =>
        // Search query filter
        therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.areas.some((area) => area.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .filter(
      (therapist) =>
        // Specialization filter
        !specialization ||
        therapist.specialization.includes(specialization) ||
        therapist.areas.some((area) => area.includes(specialization)),
    )
    .filter(
      (therapist) =>
        // Price range filter
        therapist.price >= priceRange[0] && therapist.price <= priceRange[1],
    )
    .filter(
      (therapist) =>
        // Insurance filter
        !showInsuranceOnly ||
        (selectedInsurance ? therapist.insurance.includes(selectedInsurance) : therapist.insurance.length > 0),
    )
    .filter(
      (therapist) =>
        // Distance filter
        !userLocation || therapist.location.distance <= distanceRange,
    )
    .filter(
      (therapist) =>
        // New patients filter
        !acceptingNewPatients || therapist.acceptingNewPatients,
    )
    .filter(
      (therapist) =>
        // Language filter
        !selectedLanguage || therapist.languages.includes(selectedLanguage),
    )
    .filter((therapist) =>
      // Session type filter
      therapist.sessionTypes.includes(selectedSessionType),
    )
    .sort((a, b) => (a.location.distance || 0) - (b.location.distance || 0))

  const handleSchedule = (therapist: any) => {
    // Here you would typically make an API call to schedule the session
    console.log("Scheduling session with:", therapist, "on:", selectedDate)
  }

  // Get unique languages from all therapists
  const allLanguages = Array.from(new Set(therapists.flatMap((t) => t.languages)))

  // Get unique insurance providers
  const allInsuranceProviders = Array.from(new Set(therapists.flatMap((t) => t.insurance)))

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto p-4 space-y-6">
        <Tabs defaultValue="therapists" className="space-y-6">
          <TabsList>
            <TabsTrigger value="therapists">Find a Therapist</TabsTrigger>
            <TabsTrigger value="resources">Educational Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="therapists" className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Find a Therapist</h1>
                <p className="text-muted-foreground">
                  Connect with licensed professionals who specialize in student mental health
                </p>
              </div>
              <div className="flex gap-4">
                <Input
                  placeholder="Search therapists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-[300px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <Card className="lg:col-span-1 h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Specialization</Label>
                    <Select value={specialization} onValueChange={setSpecialization}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any specialization" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any specialization">Any specialization</SelectItem>
                        <SelectItem value="Anxiety">Anxiety</SelectItem>
                        <SelectItem value="Depression">Depression</SelectItem>
                        <SelectItem value="Stress">Stress Management</SelectItem>
                        <SelectItem value="Academic">Academic Pressure</SelectItem>
                        <SelectItem value="Trauma">Trauma & PTSD</SelectItem>
                        <SelectItem value="Eating">Eating Disorders</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Range (per session)</Label>
                    <div className="pt-2">
                      <Slider value={priceRange} min={50} max={300} step={10} onValueChange={setPriceRange} />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Insurance</Label>
                    <div className="flex items-center space-x-2 mb-2">
                      <Switch
                        checked={showInsuranceOnly}
                        onCheckedChange={setShowInsuranceOnly}
                        id="insurance-filter"
                      />
                      <Label htmlFor="insurance-filter">Accepts insurance</Label>
                    </div>
                    {showInsuranceOnly && (
                      <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any insurance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Any insurance">Any insurance</SelectItem>
                          {allInsuranceProviders.map((insurance) => (
                            <SelectItem key={insurance} value={insurance}>
                              {insurance}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Distance (miles)</Label>
                    <div className="pt-2">
                      <Slider
                        value={[distanceRange]}
                        min={1}
                        max={50}
                        step={1}
                        onValueChange={(value) => setDistanceRange(value[0])}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <span>1 mile</span>
                        <span>{distanceRange} miles</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={acceptingNewPatients}
                        onCheckedChange={setAcceptingNewPatients}
                        id="new-patients"
                      />
                      <Label htmlFor="new-patients">Accepting new patients</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Any language">Any language</SelectItem>
                        {allLanguages.map((language) => (
                          <SelectItem key={language} value={language}>
                            {language}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Session Type</Label>
                    <Select
                      value={selectedSessionType}
                      onValueChange={(value: "in-person" | "video") => setSelectedSessionType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="video">Video Session</SelectItem>
                        <SelectItem value="in-person">In-Person Session</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchQuery("")
                      setSpecialization("")
                      setPriceRange([0, 200])
                      setShowInsuranceOnly(false)
                      setSelectedInsurance("")
                      setDistanceRange(10)
                      setAcceptingNewPatients(false)
                      setSelectedLanguage("")
                      setSelectedSessionType("video")
                    }}
                  >
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>

              {/* Therapist List */}
              <div className="lg:col-span-3 space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Found {filteredTherapists.length} therapists matching your criteria
                  </p>
                  <Select defaultValue="distance">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distance">Distance</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="availability">Earliest Available</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {filteredTherapists.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-center space-y-2">
                        <h3 className="text-lg font-semibold">No therapists found</h3>
                        <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery("")
                            setSpecialization("")
                            setPriceRange([0, 200])
                            setShowInsuranceOnly(false)
                            setSelectedInsurance("")
                            setDistanceRange(10)
                            setAcceptingNewPatients(false)
                            setSelectedLanguage("")
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  filteredTherapists.map((therapist) => (
                    <Card key={therapist.id} className="overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/4 p-6 flex flex-col items-center justify-center bg-muted/30">
                          <Avatar className="w-32 h-32 mb-4">
                            <AvatarImage src={therapist.image} alt={therapist.name} />
                            <AvatarFallback>
                              {therapist.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="text-xl font-bold text-center">{therapist.name}</h3>
                          <p className="text-center text-muted-foreground mb-2">{therapist.title}</p>
                          <div className="flex items-center mb-4">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 font-medium">{therapist.rating}</span>
                            <span className="ml-1 text-muted-foreground">({therapist.reviews} reviews)</span>
                          </div>
                          {therapist.acceptingNewPatients ? (
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Accepting New Patients
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground">
                              Not Accepting New Patients
                            </Badge>
                          )}
                        </div>
                        <div className="md:w-3/4 p-6">
                          <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary">{therapist.specialization}</Badge>
                              {therapist.areas.slice(0, 3).map((area) => (
                                <Badge key={area} variant="outline">
                                  {area}
                                </Badge>
                              ))}
                              {therapist.areas.length > 3 && (
                                <Badge variant="outline">+{therapist.areas.length - 3} more</Badge>
                              )}
                            </div>

                            <p className="text-sm">{therapist.bio}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span>{therapist.education}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{therapist.experience} experience</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Languages className="h-4 w-4 text-muted-foreground" />
                                <span>{therapist.languages.join(", ")}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{therapist.location.distance.toFixed(1)} miles away</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 items-center">
                              <div className="flex items-center gap-1 text-sm">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>Next available: {therapist.nextAvailable}</span>
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <Heart className="h-4 w-4 text-muted-foreground" />
                                <span>${therapist.price}/session</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              {therapist.sessionTypes.includes("video") && (
                                <Badge className="flex items-center gap-1">
                                  <Video className="h-3 w-3" />
                                  Video Sessions
                                </Badge>
                              )}
                              {therapist.sessionTypes.includes("in-person") && (
                                <Badge className="flex items-center gap-1" variant="outline">
                                  <MapPin className="h-3 w-3" />
                                  In-Person
                                </Badge>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              <Button
                                onClick={() => {
                                  setSelectedTherapist(therapist.id)
                                  // Open scheduling dialog
                                }}
                              >
                                Schedule Session
                              </Button>
                              <Button variant="outline" asChild>
                                <Link href={`/counseling?therapist=${therapist.id}`}>View Full Profile</Link>
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Phone className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Educational Resources</h1>
              <p className="text-muted-foreground">
                Explore our collection of articles, videos, and tools to support your mental health journey
              </p>
            </div>

            {resources.map((category, index) => (
              <div key={index} className="space-y-4">
                <h2 className="text-2xl font-semibold">{category.category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="overflow-hidden">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{item.title}</CardTitle>
                          <Badge>{item.type}</Badge>
                        </div>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button asChild className="w-full">
                          <Link href={item.link}>View Resource</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}

            <Card>
              <CardHeader>
                <CardTitle>Need personalized guidance?</CardTitle>
                <CardDescription>
                  Our counselors can help you navigate these resources and develop a personalized plan
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/counseling">Schedule a Consultation</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

