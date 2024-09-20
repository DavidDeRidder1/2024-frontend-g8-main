import { useAuth } from "../contexts/Auth.context";
import { Link, useLocation, NavLink } from "react-router-dom";
import {
	Image,
	Box,
	Flex,
	Spacer,
	Link as ChakraLink,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton,
	Badge,
	Tag,
} from "@chakra-ui/react";
import ToegangLeverancier from "./ToegangLeverancier";
import { BellIcon } from "@chakra-ui/icons";
import useSWR from "swr";
import { getAll } from "../api";

function Navbar() {
	const { isAuthed } = useAuth();

	const {
		data: { items: notificaties = [] } = {},
		isLoading,
		error,
	} = isAuthed
		? useSWR(`notificaties/recent`, getAll, {
				refreshInterval: 1000, //Elke seconde refreshen
			})
		: { data: {}, isLoading: false, error: null };

	return (
		<Flex
			marginBottom={5}
			marginTop={2}
			marginLeft={2}
			marginRight={2}
			minWidth="max-content"
			alignItems="center"
			gap="1"
			data-cy="navbar"
		>
			<Box>
				<Box mr={4}>
					<NavLink to="/producten">
						<Image
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Delaware-logo.svg/1200px-Delaware-logo.svg.png"
							alt="Delaware Logo"
							boxSize="auto"
							height="40px"
							width="auto"
						/>
					</NavLink>
				</Box>
			</Box>

			<Box p="2" ml="5">
				<NavLink to="/producten">Producten</NavLink>
			</Box>

			<ToegangLeverancier>
				<Box p="2" ml="5">
					<NavLink to="/bestellingen">Bestellingen</NavLink>
				</Box>
			</ToegangLeverancier>
			<ToegangLeverancier>
				<Box p="2" ml="5">
					<NavLink to="/profiel">Profiel</NavLink>
				</Box>
			</ToegangLeverancier>

			<Spacer />
			{isAuthed ? (
				<Box p="2" display="flex" alignItems="center">
					<NavLink data-cy="logout_btn" className="nav-link" to="/logout">
						Log uit
					</NavLink>
					<Box ml={2}>
						<Menu>
							<MenuButton
								as={IconButton}
								aria-label="Meldingen"
								data-cy="notification_btn"
								icon={<BellIcon w={6} h={6} />}
							/>
							<MenuList>
								<Link to={`/notificaties`} data-cy="notification_all_link">
									<MenuItem fontWeight="bold">Toon alle</MenuItem>
								</Link>
								{notificaties.map((notification, index) => (
									<Link
										key={index}
										to={`/bestellingen/${notification.ORDER_ID}`}
									>
										<MenuItem
											display="flex"
											alignItems="center"
											data-cy={`notification_${index}`}
										>
											<Tag colorScheme="yellow" mr="2">
												{notification.TYPE}
											</Tag>
											<Box flex="1" overflow="hidden">
												{notification.TEXT.length > 40
													? notification.TEXT.substring(0, 40) + "..."
													: notification.TEXT}
											</Box>
											<Badge
												ml="2"
												borderRadius="full"
												px="2"
												colorScheme={
													notification.STATUS === "NIEUW"
														? "green"
														: notification.STATUS === "ONGELEZEN"
															? "blue"
															: "gray"
												}
											>
												{notification.STATUS}
											</Badge>
										</MenuItem>
									</Link>
								))}
							</MenuList>
						</Menu>
					</Box>
				</Box>
			) : (
				<>
					<Box p="2" display="flex" alignItems="center">
						<NavLink className="nav-link" to="/login">
							Login
						</NavLink>
					</Box>
				</>
			)}
		</Flex>
	);
}

export default Navbar;
