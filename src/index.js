import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import i18n from "./i18n"; // Importa la configurazione di i18next
import { I18nextProvider } from "react-i18next"; // Importa il provider di i18next

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			{/* {" "} */}
			{/* Avvolgi l'app con il provider */}
			<App />
		</I18nextProvider>
	</React.StrictMode>
);
