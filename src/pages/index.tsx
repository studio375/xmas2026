import Head from "next/head";
import dynamic from "next/dynamic";
import { Press_Start_2P, Permanent_Marker, Fuzzy_Bubbles } from 'next/font/google';

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
const fuzzy_bubbles = Fuzzy_Bubbles({
    weight: '400',
    variable: '--font-fuzzy',
    subsets: ['latin'],
});

const AppWithoutSSR = dynamic(() => import("@/App"), { ssr: false });

export default function Home() {
    return (
        <>
            <Head>
                <title>Xmas 2026</title>
                <meta name="description" content="Scegli il tuo personaggio, raccogli gli indizi e scopri il colpevole." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <main className={`${press_start.variable} ${permanent_marker.variable} ${fuzzy_bubbles.variable}`}>
                <AppWithoutSSR />
            </main>
        </>
    );
}
