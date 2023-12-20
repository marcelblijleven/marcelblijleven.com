import { sortPosts, allCoreContent } from "pliny/utils/contentlayer";
import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import Section from "@/components/section";
import PostPreview, {PostPreviewSmall} from "@/components/blog/preview";
import {getActivities} from "@/lib/strava/utils";
import ActivityTable from "@/components/activities/activity-table";
import {getCoffeeData} from "@/lib/coffee/utils";
import BrewsTable from "@/components/coffee/brews-table";

const MAX_POSTS = 5;
const MAX_ACTIVITIES = 5;
const MAX_BREWS = 5;



export default async function Page() {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);
  const activities = await getActivities(MAX_ACTIVITIES);
  const coffeeData = getCoffeeData();

  return (
    <div className={"flex flex-col space-y-12 divide-y divide-gray-200 dark:divide-gray-700"}>
      <section className={"w-full snap-center"}>
        <div className={"mt-5"}>
          <h1 className={"text-xl md:text-2xl"}>
            <span className={"text-md font-medium"}>Marcel Blijleven</span>
            <p className={"text-balance max-w-xl"}>
              Software engineer creating quality software and automating the boring stuff
            </p>
          </h1>
          <p>
            Get in touch via{" "}
            <a
              className={"link"}
              href={"https://www.linkedin.com/in/marcelblijleven"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Linkedin
            </a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="inline h-5 w-5 gap-x-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
              />
            </svg>
            , or view my{" "}
            <a
              className={"link"}
              href={"https://www.github.com/marcelblijleven"}
              target={"_blank"}
              rel={"noopener noreferrer"}
            >
              Github
            </a>
          </p>
        </div>
      </section>
      <Section title={"Latest writings"}>
        <ul className={"max-w-md divide-y divide-gray-200 dark:divide-gray-700"}>
          {!posts.length && <p className={"ml-auto max-w-lg"}>Nothing here yet</p>}
          {posts.slice(0, MAX_POSTS).map((post) => {
            const { slug, date, title, path, summary, tags } = post;
            return (
              <li key={slug} className={"py-2"}>
                <PostPreviewSmall date={date} title={title} path={path} summary={summary} tags={tags} />
              </li>
            );
          })}
        </ul>
      </Section>
      <Section
        title={"Latest brews"}
      >
        <BrewsTable
          brews={coffeeData.brews}
          beanMapping={coffeeData.beanMapping}
          preperationMapping={coffeeData.preparationMapping}
          grinderMapping={coffeeData.grinderMapping}
          caption={"I keep track of the (specialty) coffee I drink, the data is synced during build time and displayed on the coffee page."}
          limit={MAX_BREWS}
        />
      </Section>
      <Section
        title={"Latest activities"}
      >
        <ActivityTable activities={activities}/>
      </Section>
    </div>
  );
}
