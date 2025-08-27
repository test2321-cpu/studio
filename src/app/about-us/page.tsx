
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">About Us</h1>
                    <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
                        <p>Welcome to CricketPulse, your ultimate destination for everything cricket. We are a team of passionate cricket enthusiasts dedicated to bringing you the latest news, live scores, in-depth analysis, and engaging stories from the world of cricket.</p>
                        <p>Our mission is to provide a comprehensive and immersive experience for cricket fans everywhere. Whether you're looking for live updates on a nail-biting T20 match, detailed statistics for your favorite player, or a nostalgic look back at historic moments in the sport, CricketPulse has you covered.</p>
                        <p>We believe in the power of cricket to unite people from all corners of the globe. Our platform is designed to be your one-stop source for all things cricket, created by fans, for fans.</p>
                        <p>Thank you for being a part of our community. Stay tuned, and never miss a beat with CricketPulse!</p>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
