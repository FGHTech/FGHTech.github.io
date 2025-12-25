import { FooterSection } from "@/components/layout/sections/footer";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Privacy Policy - FGHTech",
	description: "Privacy Policy for FGHTech AB",
};

export default function PrivacyPolicyPage() {
	return (
		<>
			<main className="container max-w-4xl py-20 md:py-32">
				<div className="mb-8">
					<Link
						href="/"
						className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
					>
						<ArrowLeft className="w-4 h-4 mr-2" />
						Back to Home
					</Link>
				</div>

				<div className="bg-card border border-secondary rounded-2xl p-8 md:p-12">
					<div className="space-y-2 mb-8">
						<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-[#9b7bbd] bg-clip-text text-transparent">
							Privacy Policy
						</h1>
						<p className="text-muted-foreground">
							Last updated: December 25, 2025
						</p>
					</div>

					<Separator className="my-8" />

					<div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								1. Introduction
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Welcome to FGHTech AB (&quot;we,&quot; &quot;our,&quot; or
								&quot;us&quot;). We are committed to protecting your personal
								information and your right to privacy. This Privacy Policy
								explains how we collect, use, disclose, and safeguard your
								information when you visit our website or use our services.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Please read this privacy policy carefully. If you do not agree
								with the terms of this privacy policy, please do not access the
								site.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								2. Information We Collect
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We collect information that you voluntarily provide to us when
								you:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Register on our website</li>
								<li>Express interest in our products or services</li>
								<li>Participate in activities on our website</li>
								<li>Contact us directly</li>
							</ul>

							<h3 className="text-xl font-medium text-foreground mt-6">
								Personal Data
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								Depending on your interactions with us, we may collect:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									Name and contact information (email address, phone number)
								</li>
								<li>Billing and payment information</li>
								<li>Account credentials</li>
								<li>Communication preferences</li>
							</ul>

							<h3 className="text-xl font-medium text-foreground mt-6">
								Automatically Collected Information
							</h3>
							<p className="text-muted-foreground leading-relaxed">
								When you visit our website, we may automatically collect certain
								information including:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Device and browser information</li>
								<li>IP address and location data</li>
								<li>Pages visited and time spent</li>
								<li>Referring website addresses</li>
							</ul>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								3. How We Use Your Information
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We use the information we collect for various purposes,
								including:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>Providing and maintaining our services</li>
								<li>Processing transactions and sending related information</li>
								<li>Sending promotional communications (with your consent)</li>
								<li>Responding to inquiries and offering support</li>
								<li>Analyzing usage to improve our services</li>
								<li>Protecting against fraudulent or illegal activity</li>
								<li>Complying with legal obligations</li>
							</ul>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								4. Sharing Your Information
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We may share your information in the following situations:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Service Providers:</strong> We may share your
									information with third-party vendors who perform services on
									our behalf.
								</li>
								<li>
									<strong>Business Transfers:</strong> In connection with any
									merger, sale of company assets, or acquisition.
								</li>
								<li>
									<strong>Legal Requirements:</strong> If required by law or in
									response to valid requests by public authorities.
								</li>
								<li>
									<strong>With Your Consent:</strong> We may disclose your
									information for any other purpose with your consent.
								</li>
							</ul>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								5. Cookies and Tracking Technologies
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We may use cookies, web beacons, and similar tracking
								technologies to collect and store information about your
								interactions with our website. You can control cookies through
								your browser settings and other tools.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								Types of cookies we may use:
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Essential Cookies:</strong> Required for basic website
									functionality.
								</li>
								<li>
									<strong>Analytics Cookies:</strong> Help us understand how
									visitors interact with our website.
								</li>
								<li>
									<strong>Marketing Cookies:</strong> Used to deliver relevant
									advertisements.
								</li>
							</ul>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								6. Data Security
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We implement appropriate technical and organizational security
								measures to protect your personal information. However, no
								electronic transmission over the Internet or information storage
								technology can be guaranteed to be 100% secure.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We strive to use commercially acceptable means to protect your
								personal data, but we cannot guarantee its absolute security.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								7. Your Rights (GDPR)
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								If you are a resident of the European Economic Area (EEA), you
								have certain data protection rights under the General Data
								Protection Regulation (GDPR):
							</p>
							<ul className="list-disc pl-6 space-y-2 text-muted-foreground">
								<li>
									<strong>Right to Access:</strong> Request copies of your
									personal data.
								</li>
								<li>
									<strong>Right to Rectification:</strong> Request correction of
									inaccurate data.
								</li>
								<li>
									<strong>Right to Erasure:</strong> Request deletion of your
									personal data.
								</li>
								<li>
									<strong>Right to Restrict Processing:</strong> Request
									limitation of processing.
								</li>
								<li>
									<strong>Right to Data Portability:</strong> Request transfer
									of your data.
								</li>
								<li>
									<strong>Right to Object:</strong> Object to processing of your
									personal data.
								</li>
							</ul>
							<p className="text-muted-foreground leading-relaxed">
								To exercise any of these rights, please contact us using the
								information provided below.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								8. Data Retention
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We will retain your personal information only for as long as
								necessary to fulfill the purposes outlined in this privacy
								policy, unless a longer retention period is required or
								permitted by law.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								9. Third-Party Links
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Our website may contain links to third-party websites. We are
								not responsible for the privacy practices or content of these
								external sites. We encourage you to read the privacy policy of
								every website you visit.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								10. Children&apos;s Privacy
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								Our services are not directed to individuals under the age of
								16. We do not knowingly collect personal information from
								children under 16. If we become aware that we have collected
								data from a child under 16, we will take steps to delete such
								information.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								11. Changes to This Policy
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								We may update this privacy policy from time to time. We will
								notify you of any changes by posting the new privacy policy on
								this page and updating the &quot;Last updated&quot; date.
							</p>
							<p className="text-muted-foreground leading-relaxed">
								We encourage you to review this privacy policy periodically for
								any changes. Changes to this privacy policy are effective when
								they are posted on this page.
							</p>
						</section>

						<section className="space-y-4">
							<h2 className="text-2xl font-semibold text-foreground">
								12. Contact Us
							</h2>
							<p className="text-muted-foreground leading-relaxed">
								If you have questions or comments about this privacy policy, or
								if you would like to exercise your rights regarding your
								personal information, please contact us:
							</p>
							<div className="bg-secondary/50 rounded-lg p-6 mt-4">
								<p className="font-semibold text-foreground">FGHTech AB</p>
								<p className="text-muted-foreground">Sweden</p>
								<p className="text-muted-foreground mt-2">
									Email:{" "}
									<a
										href="mailto:privacy@fghtech.se"
										className="text-primary hover:underline"
									>
										privacy@fghtech.se
									</a>
								</p>
							</div>
						</section>
					</div>
				</div>
			</main>
			<FooterSection />
		</>
	);
}
