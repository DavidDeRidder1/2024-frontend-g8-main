import React, { useState, useEffect } from "react";
import { Toast, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
	Box,
	Text,
	Badge,
	Divider,
	VStack,
	Flex,
	useColorModeValue,
	Tag,
} from "@chakra-ui/react";

const NotificatieToast = () => {
	const [messages, setMessages] = useState([]);
	const toast = useToast();

	useEffect(() => {
		// const connectWebSocket = () => {
		const ws = new WebSocket("ws://localhost:8080");

		ws.onopen = () => {
			console.log("Connected to WebSocket server");
		};

		ws.onmessage = (event) => {
			const notificaties = JSON.parse(event.data);
			console.log("Live notificaties:", notificaties);
			setMessages((prevMessages) => [...prevMessages, notificaties]);

			// toast({
			// 	title: "Nieuwe notificatie(s)",
			// 	description: "Test",
			// 	status: "info",
			// 	duration: 3000,
			// 	isClosable: "true",
			// });
		};

		ws.onclose = () => {
			console.log("Disconnected from WebSocket server");

			// setTimeout(() => {
			// 	console.log("Attempting to reconnect...");
			// 	connectWebSocket(); // Attempt to reconnect
			// }, 2000); // Retry after 2 seconds
		};

		ws.onerror = (error) => {
			console.error("WebSocket error:", error);
		};
		// };

		// connectWebSocket();
		return () => {
			ws.close();
		};
	}, []);

	return (
		<VStack>
			{messages.map((message, index) => (
				<Box key={index} borderWidth="1px" borderRadius="lg" p="4">
					<Text>{message}</Text>
				</Box>
			))}
		</VStack>
	);
};

export default NotificatieToast;
