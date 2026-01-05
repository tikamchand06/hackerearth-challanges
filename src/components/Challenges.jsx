import { useEffect, useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChallengeFilter } from "@/components/ChallengeFilter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabs = [
  { key: "mc", label: "Monthly Challenges" },
  { key: "hc", label: "Hiring Challenges" },
  { key: "cc", label: "College Challenges" },
];

export function Challenges() {
  const [challenges, setChallenges] = useState(null);
  const [challengeType, setChallengeType] = useState("all");

  useEffect(() => {
    fetch("https://www.hackerearth.com/chrome-extension/events/")
      .then((response) => response?.json())
      .then(({ response }) => setChallenges(response))
      .catch((error) => console.error("Error fetching challenges:", error));
  }, [setChallenges]);

  return (
    <>
      <ChallengeFilter value={challengeType} onValueChange={setChallengeType} />
      <Tabs defaultValue='mc' className='text-sm text-muted-foreground'>
        <TabsList variant='line' className='gap-4'>
          {tabs?.map(({ key, label }) => (
            <TabsTrigger key={key} value={key}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs?.map(({ key, label }) => (
          <TabsContent key={key} value={key}>
            <ChallengesList challenges={challenges} type={label} status={challengeType} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

function ChallengesList({ challenges, type, status }) {
  const filteredChallenges = useMemo(() => {
    return challenges?.filter(({ challenge_type, status: challengeStatus }) => {
      if (status === "all") return challenge_type === type;
      return challenge_type === type && challengeStatus === status;
    });
  }, [challenges, type, status]);

  if (!challenges) {
    return (
      <div className='grid grid-cols-1 gap-4'>
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (filteredChallenges?.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center mt-10 text-center text-black bg-gray-100 p-10 rounded-lg font-medium text-base'>
        No {status === "all" ? "" : `${status.toLowerCase()} `}challenges available under {type}.
      </div>
    );
  }

  return (
    <div className='mt-4 space-y-4'>
      {filteredChallenges.map(({ url, title, status, subscribe, description, cover_image, start_timestamp, end_timestamp }) => {
        return (
          <div key={title} className='border rounded-lg hover:shadow-md transition-shadow duration-200'>
            <img src={cover_image} alt={title} className='w-full h-40 object-fit rounded-t-lg' />
            <div className='p-4 flex flex-col gap-4'>
              <a href={url} target='_blank' rel='noopener noreferrer'>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-base font-bold text-blue-500'>
                    {title}{" "}
                    <Badge variant='success' appearance='outline'>
                      {status}
                    </Badge>
                  </h3>
                  <p className='text-sm text-gray-700 font-medium'>{description}</p>
                  <p className='text-sm text-gray-500'>Starts at: {start_timestamp}</p>
                  <p className='text-sm text-gray-500'>Ends on: {end_timestamp}</p>
                </div>
              </a>
              <div className='flex items-center gap-4'>
                <a href={subscribe} target='_blank' rel='noopener noreferrer'>
                  <Button>Subscribe</Button>
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className='flex flex-col space-y-3'>
      <Skeleton className='h-[125px] w-full rounded-xl' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full' />
        <Skeleton className='h-4 w-full' />
      </div>
    </div>
  );
}
