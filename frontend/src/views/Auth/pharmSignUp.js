// Chakra imports
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React from "react";
import { useState } from "react";
import { API_PATHS } from "API/api_paths";
import axios from 'axios';

function pharmSignUp() {
    const bgColor = useColorModeValue("white", "gray.700");
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [HourlyRate, setHourlyRate] = useState("");
    const [Affiliation, setAffiliation] = useState("");
    const [EducationalBackground, setEducationalBackground] = useState("");
    const [show, setShow] = React.useState(false);

    return (
        <Flex
            direction="column"
            alignSelf="center"
            justifySelf="center"
            overflow="hidden"
        >
            <Box
                position="absolute"
                minH={{ base: "70vh", md: "50vh" }}
                w={{ md: "calc(100vw - 50px)" }}
                borderRadius={{ md: "15px" }}
                left="0"
                right="0"
                bgRepeat="no-repeat"
                overflow="hidden"
                zIndex="-1"
                top="0"
                bgImage={BgSignUp}
                bgSize="cover"
                mx={{ md: "auto" }}
                mt={{ md: "14px" }}
            ></Box>
            <Flex
                direction="column"
                textAlign="center"
                justifyContent="center"
                align="center"
                mt="6.5rem"
                mb="30px"
            >
                <Text fontSize="4xl" color="white" fontWeight="bold">
                    Welcome!
                </Text>
                <Text
                    fontSize="md"
                    color="white"
                    fontWeight="normal"
                    mt="10px"
                    mb="26px"
                    w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
                >
                    Please fill in this registration form to request
                    creating a pharmacist account and access our services!
                </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
                <Flex
                    direction="column"
                    w="445px"
                    background="transparent"
                    borderRadius="15px"
                    p="40px"
                    mx={{ base: "100px" }}
                    bg={bgColor}
                    boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
                >
                    <form
                        id="pharmSignUp"
                        onSubmit={async (e) => {
                            e.preventDefault();
                            const Request = {
                                Username,
                                Name,
                                Email,
                                Password,
                                DateOfBirth,
                                HourlyRate,
                                Affiliation,
                                EducationalBackground,
                            };
                            const response = await fetch(API_PATHS.pharmSignUp, {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(Request),
                            });
                        }}
                    >
                        <FormControl>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Username
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="Enter your username"
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Name
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="Your full name"
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Email
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="Your email"
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Password
                            </FormLabel>
                            <InputGroup size="md">
                                <Input
                                    fontSize="sm"
                                    ms="4px"
                                    borderRadius="15px"
                                    type={show ? "text" : "password"}
                                    placeholder="Your password"
                                    mb="24px"
                                    size="lg"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                        {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Date of Birth
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="date"
                                placeholder="..."
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setDateOfBirth(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Hourly Rate
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="number"
                                placeholder="..."
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setHourlyRate(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Affiliation
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="..."
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setAffiliation(e.target.value)}
                            />
                            <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                                Educational Background
                            </FormLabel>
                            <Input
                                fontSize="sm"
                                ms="4px"
                                borderRadius="15px"
                                type="text"
                                placeholder="..."
                                mb="24px"
                                size="lg"
                                required
                                onChange={(e) => setEducationalBackground(e.target.value)}
                            />
                            <Button
                                type="submit"
                                bg="teal.300"
                                fontSize="10px"
                                color="white"
                                fontWeight="bold"
                                w="100%"
                                h="45"
                                mb="24px"
                                _hover={{
                                    bg: "teal.200",
                                }}
                                _active={{
                                    bg: "teal.400",
                                }}
                            >
                                SUBMIT REQUEST
                            </Button>
                        </FormControl>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    );
}

export default pharmSignUp;
