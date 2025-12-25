import Image from "next/image";

export const Logo = () => {
	return (
		<>
			<Image
				width={1200}
				height={1200}
				className="!w-9 !h-9 mr-2 md:w-[1200px] bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary"
				src={"/logo_white.png"}
				alt="dashboard"
			/>
			<span className="text-lg">FGHTech</span>
		</>
	);
};
