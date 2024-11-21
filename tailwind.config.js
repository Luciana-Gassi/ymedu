/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				controllerfour: ["ControllerFour", "sans-serif"],
				orbitron: ["Orbitron", "sans-serif"],
				proximanova: ["Proxima Nova", "sans-serif"],
				exo: ['"Exo 2"', "sans-serif"],
			},
			colors: {
				"ymf-primary": "#1B365D",
				"ymf-secondary": "#228B22",
				"ymf-primary-light": "#2C5494",
				"ymf-secondary-light": "#2EA62E",
				"ymf-gray": "#4a4a4a",
				"ymf-light": "#f8f9fa",
			},
		},
	},
	plugins: [],
};
