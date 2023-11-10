import React, { useState, useEffect } from "react";
import { API_PATHS } from "API/api_paths";
import axios from "axios";
import { useAuthContext } from "hooks/useAuthContext";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { IconButton } from "@chakra-ui/react"
import { AddIcon, DeleteIcon, MinusIcon } from '@chakra-ui/icons'
import {
    Box,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    useColorModeValue,
    Heading,
    Text,
} from "@chakra-ui/react";

function CartTable() {
    const { user } = useAuthContext();
    const Authorization = `Bearer ${user.token}`;
    const [cart, setCart] = useState([]);
    const [medicine, setMedicine] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    const textColor = useColorModeValue("gray.700", "white");

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        // Fetch all cart items.
        axios
            .get(API_PATHS.viewCart, {
                headers: { Authorization },
            })
            .then((response) => {
                console.log(response);
                setCart(response.data.cart);
                setMedicine(response.data.medicine);
                console.log(medicine);
            })
            .catch((error) => {
                console.error("Error fetching cart:", error);
            });
    };

    const deleteItem = async (medicineId) => {
        try {
            console.log(medicineId);
            const url = API_PATHS.deleteItem + `?Medicine=${medicineId}`;
            console.log(url);
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const incrementItem = async (medicineId) => {
        try {
            console.log(medicineId);
            const url = API_PATHS.addItemToCart + `?Medicine=${medicineId}`;
            console.log(url);
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            console.error("Error incrementing item:", error);
        }
    };

    const decrementItem = async (medicineId) => {
        try {
            console.log(medicineId);
            const url = API_PATHS.decrementItem + `?Medicine=${medicineId}`;
            console.log(url);
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            setCart(response.data);
            fetchCart();
        } catch (error) {
            console.error("Error decrementing item:", error);
        }
    }

    const checkout = async () => {
        try {
            const url = API_PATHS.checkout;
            const response = await axios.post(url, null, {
                headers: { Authorization },
            });
            console.log(response);
            fetchCart();
        } catch (error) {
            console.error("Error checking out:", error);
        }
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openModal = () => {
        setModalOpen(true);
    };

    return (
        <Box pt="20px">
            <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="flex-start"
                pt="50px"
            >
                <Card my={{ base: "22px", md: "0" }} mr={{ base: "0", md: "16px" }} overflowX={{ sm: "scroll", xl: "hidden" }} flex="3">
                    <CardHeader p="6px 0px 22px 0px">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                color={textColor}
                                fontWeight="bold"
                                pb=".5rem"
                            >
                                Cart
                            </Text>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Medicine Name</Th>
                                    <Th>Quantity</Th>
                                    <Th>Price</Th>
                                    <Th>Total Price</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {medicine.map((med) => (
                                    <Tr
                                        key={med._id}
                                    >
                                        <Td>
                                            {med && med.Name
                                                ? med.Name
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.Quantity
                                                ? med.Quantity
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.Price
                                                ? med.Price
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            {med && med.TotalPrice
                                                ? med.TotalPrice
                                                : "N/A"}
                                        </Td>
                                        <Td>
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="teal"
                                                aria-label="Increment Item"
                                                icon={<AddIcon />}
                                                onClick={() => incrementItem(med.id)}
                                            />
                                            <IconButton
                                                variant="ghost"
                                                colorScheme="teal"
                                                aria-label="Decrement Item"
                                                icon={<MinusIcon />}
                                                onClick={() => decrementItem(med.id)}
                                            />
                                        </Td>
                                        <Td>
                                            <IconButton
                                                colorScheme="red"
                                                aria-label="Delete Item"
                                                icon={<DeleteIcon />}
                                                onClick={() => deleteItem(med.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                                {/* <Tr>
                                    <Td colSpan="2" />
                                    <Td color="teal.500">Total</Td>
                                    <Td color="teal.500" >{cart.TotalCost}</Td>
                                    <Td><Button colorScheme="teal" variant="solid">
                                        Proceed to Checkout
                                    </Button></Td>
                                    <Td />
                                </Tr> */}
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
                <Card my="22px" flex="1">
                    <CardHeader p="6px 0px 22px 0px">
                        <Flex direction="column">
                            <Text
                                fontSize="lg"
                                fontWeight="bold"
                                pb=".5rem"
                            >
                                Order Summary
                            </Text>
                        </Flex>
                    </CardHeader>
                    <CardBody>
                        <Table variant="simple">
                            <Tbody>
                                <Tr>
                                    <Td textAlign="right">
                                        <Heading as="h3" size="lg" textAlign="right">
                                            Total:
                                        </Heading></Td>
                                    <Td textAlign="left">
                                        <Heading as="h3" size="lg" textAlign="left">
                                            {cart.TotalCost ? cart.TotalCost : 0}
                                        </Heading>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td colSpan="4">
                                        <Button colorScheme="blue" size="lg" variant="solid" onClick={checkout}>
                                            Proceed to Checkout
                                        </Button>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </CardBody>
                </Card>
            </Flex>
        </Box >
    );
}

export default CartTable;
