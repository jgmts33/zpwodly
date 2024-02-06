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
} from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const CompletableTaskItem = ({
  completed,
  title,
  href,
  text,
}: {
  completed: boolean;
  title: string;
  href: string;
  text: string;
}) => (
  <Link href="{ href }" w="100%">
    {/* box-shadow: 0px 0px 2px 1px #0022470D;*/}

    <Box boxShadow="md">
      <HStack>
        {/* background: linear-gradient(206.26deg, #3E51FF 11.82%, #0071EB 75.87%); */}
        <Box w="4px" h="76px" background="blue"></Box>
        <Box w="10%">
          <Box borderRadius="full" background="blue" boxSize="28px" />
        </Box>
        <Box>
          <Heading>{title}</Heading>
          <Text>
            {text}
            {completed ? "" : "→"}
          </Text>
        </Box>
      </HStack>
    </Box>
  </Link>
);

const Dashboard: NextPage = () => {
  return (
    <main>
      {/* weight = 700, size=17, line height = 24, body bold */}
      <Heading>Your Tasks</Heading>
      <Tabs>
        <TabList>
          {/* //styleName: Caption 2 Caps Bold;
                font-family: Nunito Sans;
                font-size: 11px;
                font-style: normal;
                font-weight: 800;
                line-height: 14px;
                letter-spacing: 0.5px;
                text-align: left;
                selected: blue 600, not selected: grey 800

                // below is down arrow

                position: static;
                left: 60.53%;
                right: 18.42%;
                top: 100%;
                bottom: -15.38%;

                blue gradient

                background: linear-gradient(206.26deg, #3E51FF 11.82%, #0071EB 75.87%);
                transform: rotate(-180deg);

                Inside Auto Layout

                flex: none;
                order: 1;
                flex-grow: 0;
                margin: 8px 0px;
            */}
          <Tab>To Do</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <VStack>
              <CompletableTaskItem
                completed={false}
                title="How Upwardli Works"
                text="Go to the Upwardli Basics Guide"
                href="/guides/basics/"
              />
              <CompletableTaskItem
                completed={false}
                title="Activate Credit Action Plan"
                text="Get started building your credit"
                href="/credit/"
              />
              <CompletableTaskItem
                completed={false}
                title="Share Upwardli and Earn"
                text="Share Upwardli and build your rewards"
                href="/share/"
              />
            </VStack>
          </TabPanel>
          <TabPanel>
            <VStack>
              <CompletableTaskItem
                completed={true}
                title="Complete Your Profile"
                href="#"
                text=""
              />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Heading>Your Rewards</Heading>
      <Box boxShadow="md">
        <Progress value={80} />
      </Box>
      <Heading>Explore More Guides</Heading>
      <Text>TODO: Horizontal scrolling list of guides.</Text>
    </main>
  );
};

export default Dashboard;
