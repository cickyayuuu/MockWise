import React from 'react';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';
// import  Image from 'next/image';
  import { dummyInterviews } from '@/constants';
import InterviewCard from '@/components/InterviewCard';
// import { getCurrentUser } from "@/lib/actions/auth.action";
// import {
//   getInterviewsByUserId,
//   getLatestInterviews,
// } from "@/lib/actions/general.action";
const Home = () => {
  // const user = await getCurrentUser();

  // const [userInterviews, allInterview] = await Promise.all([
  //   getInterviewsByUserId(user?.id!),
  //   getLatestInterviews({ userId: user?.id! }),
  // ]);

  // const hasPastInterviews = userInterviews?.length! > 0;
  // const hasUpcomingInterviews = allInterview?.length! > 0;
  return (
    <>
      <section className="card-cta relative overflow-hidden">
        <div className="flex flex-col gap-6 max-w-lg z-10 relative">
          <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
          <p className="text-lg">
            Practice real interview questions & get instant feedback
          </p>

          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        <Image alt='image' width={200} height={100} src="/stark.png"/>
      </section>


      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews❤️ </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id}/>
          ))}
        </div>
      </section>
      


      <section className="flex flex-col gap-6 mt-8">
        <h2>Take An Interviews ↗️ </h2>

        <div className="interviews-section">
          {dummyInterviews.map((interview)=>(
            <InterviewCard {...interview} key={interview.id}/>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
