import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import { Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import Logout from "./pages/Logout.jsx";
import NotFound from "./components/Notfound.jsx";
//import ProductPagina from "./pages/producten/ProductPagina.jsx";
import ProductenLijst from "./pages/producten/ProductenLijst.jsx";
import { AuthProvider } from "./contexts/Auth.context";
import PrivateRoute from "./components/PrivateRoute";
import BestellingenLijst from "./pages/bestellingen/BestellingenLijst.jsx";
import BestellingDetails from "./pages/bestellingen/BestellingDetails.jsx";
import ProfielBeherenForm from "./components/bedrijf/ProfielBeherenForm.jsx";
import ProfielDetails from "./pages/bedrijf/ProfielDetails.jsx";
import AanvraagDetails from "./pages/bedrijf/AanvraagDetails.jsx";
import NotificatieLijst from "./pages/notificaties/NotificatieLijst.jsx";
import NotificatieToast from "./components/notificaties/NotificatieToast.jsx";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Navigate replace to="/producten" />,
			},
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/logout",
				element: <Logout />,
			},
			{
				path: "/producten",
				element: <ProductenLijst />,
			},
			{
				path: "/bestellingen",
				element: <PrivateRoute />,
				children: [
					{
						index: true,
						element: <BestellingenLijst />,
					},
					{
						path: ":id",
						element: <BestellingDetails />,
					},
				],
			},
			{
				path: "/profiel",
				element: <PrivateRoute />,
				children: [
					{
						index: true,
						element: <ProfielDetails />,
					},
					{
						path: "beheren/",
						element: <ProfielBeherenForm />,
					},
					{
						path: "aanvraag/:id",
						element: <AanvraagDetails />,
					},
				],
			},
			{
				path: "/notificaties",
				element: <PrivateRoute />,
				children: [
					{
						index: true,
						element: <NotificatieLijst />,
					},
				],
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<ChakraProvider>
				<RouterProvider router={router} />
				<NotificatieToast />
			</ChakraProvider>
		</AuthProvider>
	</React.StrictMode>,
);
