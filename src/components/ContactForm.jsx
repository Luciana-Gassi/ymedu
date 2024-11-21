import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

// Regole di validazione per entrambe le lingue
const validationRules = {
	name: {
		required: true,
		minLength: 2,
		pattern: /^[a-zA-ZÀ-ÿ\s-]+$/,
		message: {
			en: {
				required: "Name is required",
				minLength: "Name must be at least 2 characters long",
				pattern: "Name can only contain letters",
			},
			it: {
				required: "Il nome è obbligatorio",
				minLength: "Il nome deve contenere almeno 2 caratteri",
				pattern: "Il nome può contenere solo lettere",
			},
		},
	},
	email: {
		required: true,
		pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		message: {
			en: {
				required: "Email is required",
				pattern: "Please enter a valid email address",
			},
			it: {
				required: "L'email è obbligatoria",
				pattern: "Inserisci un indirizzo email valido",
			},
		},
	},
	message: {
		required: true,
		minLength: 10,
		message: {
			en: {
				required: "Message is required",
				minLength: "Message must be at least 10 characters long",
			},
			it: {
				required: "Il messaggio è obbligatorio",
				minLength: "Il messaggio deve contenere almeno 10 caratteri",
			},
		},
	},
	company: {
		minLength: 2,
		message: {
			en: {
				minLength: "Company name must be at least 2 characters long",
			},
			it: {
				minLength: "Il nome dell'azienda deve contenere almeno 2 caratteri",
			},
		},
	},
	phone: {
		pattern: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
		message: {
			en: {
				pattern: "Please enter a valid phone number",
			},
			it: {
				pattern: "Inserisci un numero di telefono valido",
			},
		},
	},
	interest: {
		message: {
			en: {
				required: "Please select an area of interest",
			},
			it: {
				required: "Seleziona un'area di interesse",
			},
		},
	},
};

const ContactForm = () => {
	const { t, i18n } = useTranslation();
	const currentLang = i18n.language;

	const [formData, setFormData] = useState({
		name: "",
		company: "",
		email: "",
		phone: "", // aggiungiamo il telefono perché importante per il follow-up
		interest: "",
		message: "",
	});

	// Aggiungi qui il nuovo state
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState(null);

	const validateField = useCallback(
		(name, value) => {
			const rules = validationRules[name];
			if (!rules) return "";

			if (rules.required && !value) {
				return rules.message[currentLang].required;
			}

			if (value) {
				if (rules.minLength && value.length < rules.minLength) {
					return rules.message[currentLang].minLength;
				}

				if (rules.pattern && !rules.pattern.test(value)) {
					return rules.message[currentLang].pattern;
				}
			}

			return "";
		},
		[currentLang]
	);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setFormData((prev) => ({ ...prev, [name]: value }));

			if (touched[name]) {
				const error = validateField(name, value);
				setErrors((prev) => ({ ...prev, [name]: error }));
			}
		},
		[touched, validateField]
	);

	const handleBlur = useCallback(
		(e) => {
			const { name, value } = e.target;
			setTouched((prev) => ({ ...prev, [name]: true }));
			const error = validateField(name, value);
			setErrors((prev) => ({ ...prev, [name]: error }));
		},
		[validateField]
	);

	const validateForm = useCallback(() => {
		const newErrors = {};
		let isValid = true;

		Object.keys(formData).forEach((key) => {
			if (validationRules[key]?.required || formData[key]) {
				const error = validateField(key, formData[key]);
				if (error) {
					newErrors[key] = error;
					isValid = false;
				}
			}
		});

		setErrors(newErrors);
		return isValid;
	}, [formData, validateField]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Usiamo validateForm invece del controllo base
		const isValid = validateForm();
		if (!isValid) {
			setTouched({
				name: true,
				email: true,
				message: true,
			});
			return;
		}

		try {
			setIsSubmitting(true);

			const submissionData = {
				name: formData.name,
				email: formData.email,
				message: formData.message,
				...(formData.company && { company: formData.company }),
				...(formData.event && { event: formData.event }),
			};

			const response = await fetch("https://formspree.io/f/mwpkqnaw", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(submissionData),
			});

			if (response.ok) {
				// Reset form
				setFormData({
					name: "",
					company: "",
					email: "",
					event: "",
					message: "",
				});
				setTouched({});
				setErrors({});
				setIsSubmitted(true);

				setTimeout(() => {
					setIsSubmitted(false);
				}, 5000);
			} else {
				throw new Error(`Submission failed with status: ${response.status}`);
			}
		} catch (error) {
			console.error("Form submission error:", error);
			setError(t("form.error_message"));
			setTimeout(() => setError(null), 5000);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{/* Success Modal */}
			<AnimatePresence>
				{isSubmitted && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="fixed inset-0 flex items-center justify-center z-50 px-4"
						onClick={() => setIsSubmitted(false)}
					>
						<div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
						<div
							className="bg-white relative rounded-xl shadow-2xl p-8 max-w-md mx-auto cursor-pointer"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setIsSubmitted(false)}
								className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<div className="text-center">
								<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-green-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{t("form.success_title")}
								</h3>
								<p className="text-gray-600">{t("form.success_message")}</p>
								<p className="text-sm text-gray-500 mt-4">
									{t("form.click_anywhere_close")}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Error Modal */}
			<AnimatePresence>
				{error && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="fixed inset-0 flex items-center justify-center z-50 px-4"
						onClick={() => setError(null)}
					>
						<div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
						<div
							className="bg-white relative rounded-xl shadow-2xl p-8 max-w-md mx-auto cursor-pointer"
							onClick={(e) => e.stopPropagation()}
						>
							<button
								onClick={() => setError(null)}
								className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
							>
								<svg
									className="w-6 h-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
							<div className="text-center">
								<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
									<svg
										className="w-8 h-8 text-red-600"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">
									{t("form.error_title")}
								</h3>
								<p className="text-gray-600">{error}</p>
								<p className="text-sm text-gray-500 mt-4">
									{t("form.click_anywhere_close")}
								</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<form className="space-y-6" onSubmit={handleSubmit}>
				{/* Form Fields */}
				<div className="grid grid-cols-2 gap-6">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							{t("form.name")} <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full px-4 py-3 rounded-lg border transition
              ${
								errors.name
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-ymf-primary"
							}
              focus:ring-2 focus:border-transparent`}
							placeholder={t("form.name_placeholder")}
						/>
						{touched.name && errors.name && (
							<p className="mt-1 text-sm text-red-600">{errors.name}</p>
						)}
					</div>

					<div>
						<label
							htmlFor="company"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							{t("form.company")}
						</label>
						<input
							type="text"
							id="company"
							name="company"
							value={formData.company}
							onChange={handleChange}
							onBlur={handleBlur}
							className={`w-full px-4 py-3 rounded-lg border transition
              ${
								errors.company
									? "border-red-500 focus:ring-red-500"
									: "border-gray-300 focus:ring-ymf-primary"
							}
              focus:ring-2 focus:border-transparent`}
							placeholder={t("form.name_placeholder")}
						/>
						{touched.company && errors.company && (
							<p className="mt-1 text-sm text-red-600">{errors.company}</p>
						)}
					</div>
				</div>

				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						{t("form.email")} <span className="text-red-500">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						onBlur={handleBlur}
						className={`w-full px-4 py-3 rounded-lg border transition
            ${
							errors.email
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-ymf-primary"
						}
            focus:ring-2 focus:border-transparent`}
						placeholder={t("form.email_placeholder")}
					/>
					{touched.email && errors.email && (
						<p className="mt-1 text-sm text-red-600">{errors.email}</p>
					)}
				</div>

				<div>
					<label
						htmlFor="event"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						{t("form.event")}
					</label>
					<select
						id="interest"
						name="interest"
						value={formData.interest}
						onChange={handleChange}
						onBlur={handleBlur}
						className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ymf-primary focus:border-transparent transition"
					>
						<option value="">{t("form.interest_options_default")}</option>
						<option value="fondi">{t("form.interest_options_funds")}</option>
						<option value="formazione">
							{t("form.interest_options_training")}
						</option>
						<option value="consulenza">
							{t("form.interest_options_consulting")}
						</option>
						<option value="altro">{t("form.interest_options_other")}</option>
					</select>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						{t("form.message")} <span className="text-red-500">*</span>
					</label>
					<textarea
						id="message"
						name="message"
						rows={4}
						value={formData.message}
						onChange={handleChange}
						onBlur={handleBlur}
						className={`w-full px-4 py-3 rounded-lg border transition
            ${
							errors.message
								? "border-red-500 focus:ring-red-500"
								: "border-gray-300 focus:ring-ymf-primary"
						}
            focus:ring-2 focus:border-transparent`}
						placeholder={t("form.message_placeholder")} // nel file di traduzione: "Descrivi le tue esigenze formative..."
					/>
					{touched.message && errors.message && (
						<p className="mt-1 text-sm text-red-600">{errors.message}</p>
					)}
				</div>

				<div className="text-sm text-gray-500">
					<span className="text-red-500">*</span> {t("form.required_fields")}
				</div>

				<button
					type="submit"
					className={`w-full btn-primary relative ${
						isSubmitting ? "opacity-75" : ""
					}`}
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<div className="flex items-center justify-center">
							<svg
								className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							{t("form.submitting")}
						</div>
					) : (
						t("form.submit")
					)}
				</button>
			</form>
		</>
	);
};
export default ContactForm;
