import {
  Box,
  Heading,
  Text,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  HStack,
  Progress,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const ServiceCategoryCard = ({
  title,
  href,
}: {
  title: string;
  href: string;
}) => (
  <Link href={href} w="100%">
    <Box boxShadow="md">
      <VStack>
        <Text>TODO: Image Display</Text>
        <Heading>{title}</Heading>
      </VStack>
    </Box>
  </Link>
);

const Offers: NextPage = () => {
  return (
    <main>
      <Heading>Your Matched Service Options</Heading>
      <SimpleGrid columns={2}>
        <ServiceCategoryCard
          href="money-transfer/"
          title="Best Money Transfer Services"
        />
        <ServiceCategoryCard
          href="student-loans/"
          title="Student Loan Refinance Options"
        />
        <ServiceCategoryCard
          href="credit-building-cards/"
          title="Credit Building Credit Card Sets"
        />
        <ServiceCategoryCard
          href="credit-cards/"
          title="Recommended Credit Cards"
        />
        <ServiceCategoryCard
          href="credit-builder/"
          title="Top Credit Builder Products"
        />
        <ServiceCategoryCard
          href="banking/"
          title="Top Bank Accounts for Immigrants"
        />
      </SimpleGrid>
    </main>
  );
};

export default Offers;
