import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="container flex flex-col items-center justify-center min-h-[70vh] py-20">
			<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
			<h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
			<p className="text-muted-foreground mb-8 text-center max-w-md">
				Sorry, we couldn&apos;t find the page you&apos;re looking for.
			</p>
			<Button asChild>
				<Link href="/">Go back home</Link>
			</Button>
		</div>
	);
}

