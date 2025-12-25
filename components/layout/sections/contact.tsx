"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRef } from "react";

const formSchema = z.object({
	firstName: z.string().min(2, "First name is required").max(255),
	lastName: z.string().min(2, "Last name is required").max(255),
	email: z
		.string()
		.min(1, "Email is required")
		.email("Please enter a valid email"),
	message: z.string().min(1, "Message is required"),
});

export const ContactSection = () => {
	const formRef = useRef<HTMLFormElement>(null);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			message: "",
		},
	});

	async function handleClick() {
		// Trigger validation
		const isValid = await form.trigger();
		if (isValid) {
			// Validation passed, submit the form natively to Formspree
			formRef.current?.submit();
		}
	}

	return (
		<section id="contact" className="container py-24 sm:py-32">
			<section className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<div className="mb-4">
						<h2 className="text-lg text-primary mb-2 tracking-wider">
							Contact
						</h2>

						<h2 className="text-3xl md:text-4xl font-bold">Connect with us</h2>
					</div>
					<p className="mb-8 text-muted-foreground lg:w-5/6">
						For questions or inquiries, please use the form below.
					</p>
				</div>

				<Card className="bg-muted/60 dark:bg-card">
					<CardContent className="pt-6">
						<Form {...form}>
							<form
								ref={formRef}
								action="https://formspree.io/f/mznzbovm"
								method="POST"
								className="grid w-full gap-4"
								onSubmit={(e) => e.preventDefault()}
							>
								<div className="flex flex-col md:!flex-row gap-8">
									<FormField
										control={form.control}
										name="firstName"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>First name</FormLabel>
												<FormControl>
													<Input placeholder="John" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="lastName"
										render={({ field }) => (
											<FormItem className="w-full">
												<FormLabel>Last name</FormLabel>
												<FormControl>
													<Input placeholder="Doe" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														type="email"
														placeholder="john@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex flex-col gap-1.5">
									<FormField
										control={form.control}
										name="message"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Message</FormLabel>
												<FormControl>
													<Textarea
														rows={5}
														placeholder="Your message..."
														className="resize-none"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<Button className="mt-4" onClick={handleClick}>
									Send message
								</Button>
							</form>
						</Form>
					</CardContent>
				</Card>
			</section>
		</section>
	);
};
