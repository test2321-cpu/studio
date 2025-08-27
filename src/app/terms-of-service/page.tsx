
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';

export default function TermsOfServicePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">Terms of Service</h1>
                    <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
                        <h2 className="text-xl font-bold text-foreground">1. Terms</h2>
                        <p>By accessing the website at CricketPulse, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.</p>
                        <h2 className="text-xl font-bold text-foreground">2. Use License</h2>
                        <p>Permission is granted to temporarily download one copy of the materials (information or software) on CricketPulse's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose, or for any public display (commercial or non-commercial); attempt to decompile or reverse engineer any software contained on CricketPulse's website; remove any copyright or other proprietary notations from the materials; or transfer the materials to another person or "mirror" the materials on any other server. This license shall automatically terminate if you violate any of these restrictions and may be terminated by CricketPulse at any time.</p>
                        <h2 className="text-xl font-bold text-foreground">3. Disclaimer</h2>
                        <p>The materials on CricketPulse's website are provided on an 'as is' basis. CricketPulse makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        <h2 className="text-xl font-bold text-foreground">4. Limitations</h2>
                        <p>In no event shall CricketPulse or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on CricketPulse's website, even if CricketPulse or a CricketPulse authorized representative has been notified orally or in writing of the possibility of such damage.</p>
                        <h2 className="text-xl font-bold text-foreground">5. Governing Law</h2>
                        <p>These terms and conditions are governed by and construed in accordance with the laws of the applicable country and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
