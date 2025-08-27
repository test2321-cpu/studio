
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionWrapper } from '@/components/section-wrapper';

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <SectionWrapper>
                    <h1 className="text-3xl font-bold mb-8 text-center">Privacy Policy</h1>
                    <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground">
                        <p>Your privacy is important to us. It is CricketPulse's policy to respect your privacy regarding any information we may collect from you across our website.</p>
                        <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
                        <p>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.</p>
                        <p>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</p>
                        <p>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</p>
                        <p>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</p>
                        <p>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</p>
                        <p>This policy is effective as of 29 June 2024.</p>
                    </div>
                </SectionWrapper>
            </main>
            <Footer />
        </div>
    );
}
