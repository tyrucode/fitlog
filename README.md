Welcome to FitLog! 
For anyone looking at this repository, it is a work on progress.
This project is meant as a way for me to learn Supabase, TypeScript, and Next.Js
while also building a functioning, useful applicstion with real world implications.

blueprint stage one : https://www.figma.com/design/dBgbvUTsyADgcMQRt1ukHs/Untitled?node-id=0-1&t=6hOpEdddalzPxZHS-1

users will see home page
when user tries to click anything they get told to sign up using supabase, probably google/github signins.
once user is signed in they can use anything on the home page. 
at first it will jsut be a way for users to log workouts
this will work by allowing users to do a form, the form will ask users what muscle they worked, what workout, duration, 
and optionally the amount of weight they used. This information will be displayed and saved to the database, 
users will then get a timeline graph of their strength and how its progressed.

users can see their friends profiles and stats for comparisons, users will have profiles, minimal information though just a @ for them to
be found by, and you will be able to see your friends graphs and what they worked out.

expect app to take a month or more

eventually find ways to implement vercel ai sdk too


use 'https://dribbble.com/shots/24797232-Fitness-tracking-app' for layout ideas, build off of this, round angles, accents of salmon, 
but mainly black/white for easier dark mode / light mode integration and less time spent on styling





<!-- IDEAS  -->
Track workouts, diet, and weight over time with charts and AI recommendations.

💡 Key Features:
Log workouts, sets, weight, meals
Charts for strength/weight over time
Supabase auth
Optionally: GPT-generated workout or meal plans
Public progress profile (shareable)

🧠 Skills You’ll Build:
Time-series data handling with Prisma

Data visualization (e.g., using Recharts or Chart.js)

Conditional rendering, complex state

Optional GPT integration

Scoped user data (only see your own logs)

STACK:
Next.js (App Router)
Prisma ORM
Supabase (Auth + DB or Storage)
Tailwind CSS + shadcn/ui (most of the styling)
Hover.Dev + Aceturnity for animations (focus less)
TypeScript

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
