import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const carouselImages = [
	{
		url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=2000",
		alt: "Team professionale in formazione",
	},
	{
		url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2000",
		alt: "Workshop aziendale",
	},
	{
		url: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=2000",
		alt: "Presentazione business",
	},
];

function YMForm() {
	const { t, i18n } = useTranslation();
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [currentLanguage, setCurrentLanguage] = useState(
		localStorage.getItem("language") || "it"
	);

	const handleLanguageChange = (lang) => {
		i18n.changeLanguage(lang);
		setCurrentLanguage(lang);
		localStorage.setItem("language", lang);
	};

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const savedLanguage = localStorage.getItem("language") || "it";
		i18n.changeLanguage(savedLanguage);
	}, [i18n]);

	return (
		<div className="min-h-screen bg-white">
			{/* Header */}
			<header className="fixed w-full top-0 bg-white/90 backdrop-blur-sm shadow-sm z-50">
				<div className="container-ym py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<img
								src="/images/logo-YMesh-rb.png"
								alt="YM Formation"
								className="h-16"
							/>
						</div>

						<nav className="hidden md:flex items-center space-x-8">
							<a
								href="#servizi"
								className="text-ymf-primary hover:text-ymf-secondary transition-colors"
							>
								{t("header.menu_services")}
							</a>
							<a
								href="#processo"
								className="text-ymf-primary hover:text-ymf-secondary transition-colors"
							>
								{t("header.menu_process")}
							</a>
							<a
								href="#vantaggi"
								className="text-ymf-primary hover:text-ymf-secondary transition-colors"
							>
								{t("header.menu_advantages")}
							</a>
							<a
								href="#contatti"
								className="text-ymf-primary hover:text-ymf-secondary transition-colors"
							>
								{t("header.menu_contact")}
							</a>

							{/* Language Switcher */}
							<div className="flex items-center space-x-4 ml-4">
								<button
									onClick={() => handleLanguageChange("it")}
									className={`flex items-center space-x-2 transition-colors duration-200 
                    ${
											currentLanguage === "it"
												? "text-ymf-secondary font-semibold"
												: "text-ymf-primary hover:text-ymf-secondary"
										}`}
								>
									<img
										src="/images/it-flag.png"
										alt="Italiano"
										className={`w-5 h-5 transition-opacity duration-200 
                      ${
												currentLanguage === "it"
													? "opacity-100"
													: "opacity-70 hover:opacity-100"
											}`}
									/>
									<span>IT</span>
								</button>

								<button
									onClick={() => handleLanguageChange("en")}
									className={`flex items-center space-x-2 transition-colors duration-200
                    ${
											currentLanguage === "en"
												? "text-ymf-secondary font-semibold"
												: "text-ymf-primary hover:text-ymf-secondary"
										}`}
								>
									<img
										src="/images/en-flag.png"
										alt="English"
										className={`w-5 h-5 transition-opacity duration-200
                      ${
												currentLanguage === "en"
													? "opacity-100"
													: "opacity-70 hover:opacity-100"
											}`}
									/>
									<span>EN</span>
								</button>
							</div>

							<button className="btn-primary bg-ymf-secondary hover:bg-ymf-primary">
								{t("header.cta_consultation")}
							</button>
						</nav>
					</div>
				</div>
			</header>

			{/* Hero Section */}
			<section className="pt-24 relative overflow-hidden hero-gradient text-white min-h-[90vh]">
				<AnimatePresence mode="wait">
					<motion.div
						key={currentImageIndex}
						className="absolute inset-0 z-0"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1 }}
					>
						<div className="relative h-full w-full">
							{/* Overlay gradient */}
							<div className="absolute inset-0 bg-gradient-to-b from-ymf-primary/80 to-ymf-primary/90 z-10" />
							{/* Background image */}
							<motion.img
								src={carouselImages[currentImageIndex].url}
								alt={carouselImages[currentImageIndex].alt}
								className="object-cover w-full h-full"
								initial={{ scale: 1.1 }}
								animate={{ scale: 1 }}
								transition={{ duration: 6 }}
							/>
						</div>
					</motion.div>
				</AnimatePresence>
				{/* Carousel Indicators */}
				<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
					{carouselImages.map((_, index) => (
						<button
							key={index}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								index === currentImageIndex ? "bg-white w-4" : "bg-white/50"
							}`}
							onClick={() => setCurrentImageIndex(index)}
						/>
					))}
				</div>

				<div className="container mx-auto px-4 py-20 relative z-10 h-full flex items-center">
					<motion.div
						className="max-w-3xl"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						<h1 className="text-5xl md:text-6xl font-bold mb-6">
							{t("hero.title")}
						</h1>
						<p className="text-xl md:text-2xl mb-8 text-white/90">
							{t("hero.description")}
						</p>
						<div className="flex flex-col sm:flex-row gap-4">
							<button className="bg-ymf-secondary text-white px-8 py-3 rounded-full hover:bg-white hover:text-ymf-primary transition-all">
								{t("hero.cta_primary")}
							</button>
							<button className="bg-white/10 text-white px-8 py-3 rounded-full hover:bg-ymf-secondary hover:text-white transition-all">
								{t("hero.cta_secondary")}
							</button>
						</div>
					</motion.div>
				</div>

				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
			</section>
			{/* Statistiche */}
			<section className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<motion.div
							className="text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<div className="text-4xl font-bold text-ymf-secondary mb-2">
								90%
							</div>
							<div className="text-gray-600">
								{t("stats.success_rate.label")}
							</div>
						</motion.div>

						<motion.div
							className="text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<div className="text-4xl font-bold text-ymf-primary mb-2">
								500+
							</div>
							<div className="text-gray-600">{t("stats.companies.label")}</div>
						</motion.div>

						<motion.div
							className="text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
						>
							<div className="text-4xl font-bold text-ymf-secondary mb-2">
								€10M+
							</div>
							<div className="text-gray-600">{t("stats.funds.label")}</div>
						</motion.div>

						<motion.div
							className="text-center"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.6 }}
						>
							<div className="text-4xl font-bold text-ymf-primary mb-2">
								15+
							</div>
							<div className="text-gray-600">{t("stats.experience.label")}</div>
						</motion.div>
					</div>
				</div>
			</section>

			{/* Servizi */}
			<section id="servizi" className="py-20 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold text-ymf-primary mb-4">
							{t("services.title")}
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							{t("services.description")}
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-8">
						{/* Card 1 - Gestione Fondi */}
						<motion.div
							className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ymf-secondary/20"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
						>
							<div className="w-16 h-16 bg-ymf-secondary/20 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-ymf-secondary"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-ymf-primary mb-4">
								{t("services.fund_management.title")}
							</h3>
							<ul className="space-y-3 text-gray-600">
								{t("services.fund_management.items", {
									returnObjects: true,
								}).map((item, index) => (
									<li key={index} className="flex items-center gap-2">
										<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
										{item}
									</li>
								))}
							</ul>
						</motion.div>

						{/* Card 2 - Formazione Personalizzata */}
						<motion.div
							className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ymf-secondary/20"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.2 }}
						>
							<div className="w-16 h-16 bg-ymf-secondary/20 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-ymf-secondary"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-ymf-primary mb-4">
								{t("services.custom_training.title")}
							</h3>
							<ul className="space-y-3 text-gray-600">
								{t("services.custom_training.items", {
									returnObjects: true,
								}).map((item, index) => (
									<li key={index} className="flex items-center gap-2">
										<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
										{item}
									</li>
								))}
							</ul>
						</motion.div>

						{/* Card 3 - Supporto Completo */}
						<motion.div
							className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-transparent hover:border-ymf-secondary/20"
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: 0.4 }}
						>
							<div className="w-16 h-16 bg-ymf-secondary/20 rounded-full flex items-center justify-center mb-6">
								<svg
									className="w-8 h-8 text-ymf-secondary"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-bold text-ymf-primary mb-4">
								{t("services.full_support.title")}
							</h3>
							<ul className="space-y-3 text-gray-600">
								{t("services.full_support.items", { returnObjects: true }).map(
									(item, index) => (
										<li key={index} className="flex items-center gap-2">
											<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
											{item}
										</li>
									)
								)}
							</ul>
						</motion.div>
					</div>
				</div>
			</section>
			{/* Processo Section */}
			<section id="processo" className="py-20 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-16"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold text-ymf-primary mb-4">
							{t("process.title")}
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							{t("process.description")}
						</p>
					</motion.div>

					<div className="grid md:grid-cols-4 gap-8">
						{[
							{
								icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
								title: t("process.steps.0.title"),
								description: t("process.steps.0.description"),
							},
							{
								icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
								title: t("process.steps.1.title"),
								description: t("process.steps.1.description"),
							},
							{
								icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
								title: t("process.steps.2.title"),
								description: t("process.steps.2.description"),
							},
							{
								icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
								title: t("process.steps.3.title"),
								description: t("process.steps.3.description"),
							},
						].map((step, index) => (
							<motion.div
								key={index}
								className="text-center"
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ delay: index * 0.2 }}
							>
								<div className="w-16 h-16 bg-ymf-secondary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
									<svg
										className="w-8 h-8 text-ymf-secondary"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d={step.icon}
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-ymf-primary mb-4">
									{step.title}
								</h3>
								<p className="text-gray-600">{step.description}</p>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Vantaggi Section */}
			<section id="vantaggi" className="py-24 bg-gray-50">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-20"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold text-ymf-primary mb-6">
							{t("advantages.title")}
						</h2>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							{t("advantages.description")}
						</p>
					</motion.div>

					<div className="grid md:grid-cols-2 gap-16">
						<div className="space-y-12">
							{t("advantages.items", { returnObjects: true }).map(
								(advantage, index) => (
									<motion.div
										key={index}
										className="flex gap-6"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ delay: index * 0.2 }}
									>
										<div className="w-12 h-12 rounded-full bg-ymf-secondary/20 flex items-center justify-center flex-shrink-0">
											<svg
												className="w-6 h-6 text-ymf-secondary"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M5 13l4 4L19 7"
												/>
											</svg>
										</div>
										<div>
											<h4 className="text-lg font-bold text-ymf-primary mb-3">
												{advantage.title}
											</h4>
											<p className="text-gray-600">{advantage.description}</p>
										</div>
									</motion.div>
								)
							)}
						</div>

						<div className="relative h-[320px]">
							<motion.div
								className="absolute inset-0 bg-ymf-secondary/10 rounded-lg"
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
							/>
							<motion.img
								src="/images/team-meeting.jpg"
								alt="Team al lavoro"
								className="rounded-lg shadow-xl relative z-10 w-full h-full object-cover"
								initial={{ opacity: 0, scale: 0.95 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true }}
							/>
						</div>
					</div>
				</div>
			</section>
			{/* Testimonianze Section */}
			<section className="py-16 bg-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="text-center mb-12"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold text-ymf-primary mb-3">
							{t("testimonials.title")}
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							{t("testimonials.description")}
						</p>
					</motion.div>

					<div className="grid md:grid-cols-3 gap-6">
						{t("testimonials.items", { returnObjects: true }).map(
							(testimonial, index) => (
								<motion.div
									key={index}
									className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-transparent hover:border-ymf-secondary/20"
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ delay: index * 0.2 }}
								>
									<div className="mb-4">
										<svg
											className="w-6 h-6 text-ymf-secondary"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M14.417 6.679C15.447 7.773 16 9.103 16 10.689c0 3.187-2.533 5.217-4.778 6.307-1.024.493-2.132.826-3.272 1.004-.227.036-.439-.144-.439-.376 0-.191.137-.355.322-.397.893-.201 1.736-.48 2.544-.881 1.446-.719 2.427-1.811 2.427-3.716 0-.925-.327-1.641-.967-2.203-.185-.163-.219-.445-.079-.646l.525-.757c.114-.165.327-.231.517-.156zM8.417 6.679C9.447 7.773 10 9.103 10 10.689c0 3.187-2.533 5.217-4.778 6.307-1.024.493-2.132.826-3.272 1.004-.227.036-.439-.144-.439-.376 0-.191.137-.355.322-.397.893-.201 1.736-.48 2.544-.881 1.446-.719 2.427-1.811 2.427-3.716 0-.925-.327-1.641-.967-2.203-.185-.163-.219-.445-.079-.646l.525-.757c.114-.165.327-.231.517-.156z" />
										</svg>
									</div>
									<p className="text-gray-600 text-sm mb-4">
										{testimonial.quote}
									</p>
									<div>
										<p className="font-bold text-ymf-primary text-sm">
											{testimonial.author}
										</p>
										<p className="text-gray-500 text-xs">{testimonial.role}</p>
										<p className="text-ymf-secondary text-xs">
											{testimonial.company}
										</p>
									</div>
								</motion.div>
							)
						)}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 bg-gradient-to-r from-ymf-primary to-ymf-primary/90 text-white">
				<div className="container mx-auto px-4">
					<motion.div
						className="max-w-4xl mx-auto text-center"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
					>
						<h2 className="text-4xl font-bold mb-6">{t("cta.title")}</h2>
						<p className="text-xl mb-8 text-white/80">{t("cta.description")}</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<button className="bg-ymf-secondary text-white px-8 py-3 rounded-full hover:bg-white hover:text-ymf-primary transition-all">
								{t("cta.primary_button")}
							</button>
							<button className="bg-transparent border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-ymf-primary transition-all">
								{t("cta.secondary_button")}
							</button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-900 text-white py-12">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							<img
								src="/images/logo-white.png"
								alt="YM Formation"
								className="h-12 mb-4"
							/>
							<p className="text-gray-400">{t("footer.company_description")}</p>
						</div>

						<div>
							<h4 className="font-semibold mb-4">
								{t("footer.services.title")}
							</h4>
							<ul className="space-y-2 text-gray-400">
								{t("footer.services.items", { returnObjects: true }).map(
									(item, index) => (
										<li
											key={index}
											className="hover:text-ymf-secondary transition-colors"
										>
											{item}
										</li>
									)
								)}
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">
								{t("footer.useful_links.title")}
							</h4>
							<ul className="space-y-2 text-gray-400">
								{t("footer.useful_links.items", { returnObjects: true }).map(
									(item, index) => (
										<li
											key={index}
											className="hover:text-ymf-secondary transition-colors"
										>
											{item}
										</li>
									)
								)}
							</ul>
						</div>

						<div>
							<h4 className="font-semibold mb-4">
								{t("footer.contact.title")}
							</h4>
							<ul className="space-y-2 text-gray-400">
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
									{t("footer.contact.email")}
								</li>
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
									{t("footer.contact.phone")}
								</li>
								<li className="flex items-center gap-2">
									<span className="w-1.5 h-1.5 bg-ymf-secondary rounded-full"></span>
									{t("footer.contact.address")}
								</li>
							</ul>
						</div>
					</div>

					<div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
						<p>{t("footer.copyright")}</p>
						<div className="flex justify-center gap-4 mt-4">
							{/* Altri social media icons se necessari */}
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}

export default YMForm;
