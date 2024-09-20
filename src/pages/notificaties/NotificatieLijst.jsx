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
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { getAll, readNotification } from "../../api";
import { formatDate } from "../../utils/utils";

function NotificatieLijst(liveNotificaties = null) {
  const navigate = useNavigate();

  const {
    data: { items: notificaties = [] } = {},
    isLoading,
    error,
  } = useSWR(`notificaties`, getAll);

  const { trigger: triggerReadNotification, error: readNotificationError } =
    useSWRMutation("notificaties", readNotification);

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const unreadNotifications = (notificaties || liveNotificaties).filter(
    (notification) =>
      notification.STATUS === "ONGELEZEN" || notification.STATUS === "NIEUW"
  );

  const handleNotificationClick = async (orderId, notificationId) => {
    navigate(`/bestellingen/${orderId}`);
    await triggerReadNotification(notificationId);
  };

  const sortedNotifications = [...(notificaties || liveNotificaties)].sort(
    (a, b) => new Date(b.DATUM) - new Date(a.DATUM)
  );

  return (
    <Box
      maxW="md"
      mx="auto"
      borderWidth="1px"
      borderRadius="md"
      borderColor={borderColor}
      p="4"
      data-cy="notificatie_lijst"
    >
      <Flex justify="space-between" align="center" mb="4">
        <Text fontWeight="bold" fontSize="lg">
          Notificaties
        </Text>
        <Text fontSize="sm" color={textColor}>
          {unreadNotifications.length} ongelezen
        </Text>
      </Flex>
      <VStack align="stretch" spacing="0">
        {sortedNotifications.map((notification, index) => (
          <Link key={index} to={`/bestellingen/${notification.ORDER_ID}`}>
            <Box
              onClick={() =>
                handleNotificationClick(notification.ORDER_ID, notification.ID)
              }
              cursor="pointer"
              _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
              p="4"
              borderRadius="md"
              data-cy={`notificatie_${index}`}
            >
              <Tag colorScheme="yellow" mr="2">
                {notification.TYPE}
              </Tag>
              <Text>{notification.TEXT}</Text>
              <Text fontSize="sm">
                Bestelling: {notification.bestelling.ORDERID}
              </Text>
              <Flex justify="space-between" align="center" w="100%">
                <Badge
                  mt="2"
                  colorScheme={
                    notification.STATUS === "NIEUW"
                      ? "green"
                      : notification.STATUS === "ONGELEZEN"
                      ? "blue"
                      : "gray"
                  }
                  data-cy="notificatie_status"
                >
                  {notification.STATUS}
                </Badge>
                <Text fontSize="sm" color={textColor}>
                  {formatDate(notification.DATUM)}
                </Text>
              </Flex>
              {index < notificaties.length - 1 && <Divider my="4" />}
            </Box>
          </Link>
        ))}
      </VStack>
    </Box>
  );
}

export default NotificatieLijst;
