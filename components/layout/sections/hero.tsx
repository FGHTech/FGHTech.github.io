"use client";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamic import for Three.js component (client-side only)
const FlowingMediaScene = dynamic(
	() =>
		import("@/components/three/FlowingMediaScene").then(
			(mod) => mod.FlowingMediaScene
		),
	{
		ssr: false,
		loading: () => (
			<div className="w-full h-[700px] md:h-[800px] bg-gradient-to-b from-background via-primary/5 to-background flex items-center justify-center">
				<div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
			</div>
		),
	}
);

export const HeroSection = () => {
	return (
		<section className="w-full overflow-hidden relative h-[700px] md:h-[800px]">
			{/* Three.js Hero Scene - full background */}
			<div className="absolute inset-0 w-full h-full">
				<FlowingMediaScene />
			</div>

			{/* Text content - overlaid on top of 3D scene */}
			<div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
				<div className="container">
					<div className="text-center space-y-6 max-w-screen-xl mx-auto">
						<Badge
							variant="outline"
							className="text-sm py-2 pointer-events-auto"
						>
							<span className="mr-2 text-primary">
								<Badge>New project.</Badge>
							</span>
							<span> In progress. </span>
						</Badge>

						<div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
							<h1 className="drop-shadow-lg">
								A new age of
								<span className="text-transparent px-2 bg-gradient-to-r from-[#9b7bbd] to-primary bg-clip-text">
									workflows.
								</span>
							</h1>
						</div>

						<p className="max-w-screen-sm mx-auto text-xl text-muted-foreground drop-shadow-md">
							{`It's more than just a tool, stay tuned...`}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
