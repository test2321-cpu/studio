
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';
import { RankingsSection } from '@/components/rankings-table';

export default function RankingsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">ICC Team Rankings</h1>
                     <div className="max-w-4xl mx-auto">
                        <RankingsSection />
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
