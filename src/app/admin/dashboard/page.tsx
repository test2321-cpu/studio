
'use client';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/logo";

export default function AdminDashboardPage() {
    const auth = getAuth(app);
    const router = useRouter();
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                router.push('/admin');
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/admin');
    };

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
                    <Logo />
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground hidden md:inline">{user.email}</span>
                        <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
                            <LogOut className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </header>
            <main className="flex-grow p-8">
                <div className="container mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome, Admin!</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>This is where you will manage your articles and match data. This area is under construction.</p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
