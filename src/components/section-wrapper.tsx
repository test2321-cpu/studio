import { cn } from "@/lib/utils";

interface SectionWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export function SectionWrapper({ children, className }: SectionWrapperProps) {
    return (
        <section className={cn("container mx-auto max-w-7xl px-4 py-8 md:py-12", className)}>
            {children}
        </section>
    );
}
