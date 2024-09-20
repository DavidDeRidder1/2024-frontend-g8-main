import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import NotificatieToast from "./notificaties/NotificatieToast";
import Footer from "./Footer";

export default function Layout() {
	return (
		<>
			<Navbar />
			<NotificatieToast />
			<Outlet />
      <Footer />
		</>
	);
}
