// Chakra imports
import { Button, Flex, Grid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import React from "react";
import MedicineCard from "./MedicineCard";
import { useState, useMemo } from "react";
import { SearchBar } from "components/Navbars/SearchBar/SearchBar";
import axios from "axios";

import MultiSelect from "components/Selections/MultiSelect";

const MedicineGroup = ({
  medicines,
  searchAndFilterParams,
  setSearchAndFilterParams,
}) => {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");

  const [selectedUses, setSelectedUses] = useState([]);

  const medicinalUses = useMemo(() => {
    return Array.from(
      new Set(medicines.map((medicine) => medicine.Medicinal_Use).flat())
    ).map((use) => ({ use: use }));
  }, []); // Empty array means it will only compute the value on the first render

  const handleNameValueChange = (value) => {
    if (typeof value !== "string") return;
    setSearchAndFilterParams({ ...searchAndFilterParams, Name: value });
  };

  const handleMedicinalUseValueChange = () => {
    setSearchAndFilterParams({
      ...searchAndFilterParams,
      Medicinal_Use: selectedUses.map((item) => item.use),
    });
    console.log(searchAndFilterParams);
  };

  const handleMedicinalUseChange = (values) => {
    setSelectedUses(values);
  };

  return (
    <Card p="16px" my="24px" style={{ margin: "80px 0 0 0px" }}>
      <CardHeader p="12px 5px" mb="12px">
        <Flex direction="row" alignItems="flex-start">
          <Flex direction="column">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              "Medicine Group"
            </Text>
            <Text fontSize="sm" color="gray.500" fontWeight="400">
              "Medicine Group Description"
            </Text>
          </Flex>
          <Flex direction={"row"} justifyContent={"flex-end"} marginLeft={20}>
            <Flex direction={"row"} marginLeft="10px">
              <SearchBar
                placeholder="Medicine Name..."
                onChange={handleNameValueChange}
                marginLeft="10px"
              />
              <MultiSelect
                marginLeft={10}
                placeholder="Medicinal Use..."
                initialItems={medicinalUses}
                selectedItems={selectedUses}
                setSelectedItems={setSelectedUses}
                onSelectedItemsChange={handleMedicinalUseChange}
                labelKey="use"
                valueKey="use"
              ></MultiSelect>
              <Button marginLeft={10} onClick={handleMedicinalUseValueChange}>
                Submit
              </Button>
              <Button
                marginLeft={10}
                onClick={() => {
                  setSearchAndFilterParams({
                    Name: "",
                    Medicinal_Use: [],
                  });
                  setSelectedUses([]);
                }}
              >
                Clear
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody px="5px">
        <Grid
          templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
          templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
          gap="24px"
        >
          {medicines &&
            medicines
              .filter((medicine) => medicine.State === "unarchived")
              .map((medicine) => (
                <MedicineCard key={medicine._id} Medicine={medicine} />
              ))}
        </Grid>
      </CardBody>
    </Card>
  );
};

export default MedicineGroup;
