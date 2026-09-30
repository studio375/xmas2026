import Head from "next/head";
import dynamic from "next/dynamic";
import { Press_Start_2P, Permanent_Marker } from 'next/font/google';

const press_start = Press_Start_2P({
    weight: '400',
    variable: '--font-press',
    subsets: ['latin'],
});
const permanent_marker = Permanent_Marker({
    weight: '400',
    variable: '--font-marker',
    subsets: ['latin'],
});

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Phaser Nextjs Template</title>
                <meta name="description" content="A Phaser 3 Next.js project template that demonstrates Next.js with React communication and uses Vite for bundling." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={`${press_start.variable} ${permanent_marker.variable}`}>
                <AppWithoutSSR />
            </main>
        </>
    );
}
