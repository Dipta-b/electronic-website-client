import React, { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  Group,
  Avatar,
  UnstyledButton,
  Box,
  ScrollArea,
  ThemeIcon,
} from "@mantine/core";
import {
  IconHome,
  IconUsers,
  IconSettings,
  IconChartPie3,
  IconLogout,
} from "@tabler/icons-react";
import { Link } from 'react-router';
import AdminList from '../../slots/AdminList';
import PendingUsers from '../../slots/PendingUsers';
const SuperAdminDashboard = () => {


      const theme = useMantineTheme();
      const [opened, setOpened] = useState(false);
    
      // ✅ Track which page is active
      const [currentPage, setCurrentPage] = useState("home");
  return (
    <div>
         <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="xs" width={{ sm: 240 }}>
          <Navbar.Section>
            <Text weight={700} size="lg" pl="sm">
              🏢 My Super Admin Dashboard
            </Text>
          </Navbar.Section>

          <Navbar.Section grow mt="md" component={ScrollArea}>
            <Group direction="column" spacing="sm">
              <UnstyledButton onClick={() => setCurrentPage("home")}>
                <Group>
                  <ThemeIcon variant="light" color="blue">
                    <IconHome size={20} />
                  </ThemeIcon>
                  <Text>Home</Text>
                </Group>
              </UnstyledButton>

              <UnstyledButton onClick={() => setCurrentPage("users")}>
                <Group>
                  <ThemeIcon variant="light" color="teal">
                    <IconUsers size={20} />
                  </ThemeIcon>
                  <Text>Users</Text>
                </Group>
              </UnstyledButton>

              <UnstyledButton onClick={() => setCurrentPage("all-admins")}>
                <Group>
                  <ThemeIcon variant="light" color="violet">
                    <IconChartPie3 size={20} />
                  </ThemeIcon>
                  <Text>All Admins</Text>
                </Group>
              </UnstyledButton>

              <UnstyledButton onClick={() => setCurrentPage("settings")}>
                <Group>
                  <ThemeIcon variant="light" color="orange">
                    <IconSettings size={20} />
                  </ThemeIcon>
                  <Text>Settings</Text>
                </Group>
              </UnstyledButton>
            </Group>
          </Navbar.Section>

          <Navbar.Section>
            <UnstyledButton>
              <Group>
                <ThemeIcon variant="light" color="red">
                  <IconLogout size={20} />
                </ThemeIcon>
                <Text>Logout</Text>
              </Group>
            </UnstyledButton>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart" align="center" pl="md" pr="md">
            <Group>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened(!opened)}
                  size="sm"
                  color={theme.colors.gray[6]}
                />
              </MediaQuery>

              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Text size="xl" weight={700}>
                Woodmarts
              </Text>
              </Link>
            </Group>

            <Group>
              <Avatar color="blue" radius="xl" size="md" />
            </Group>
          </Group>
        </Header>
      }
    >
      {/* ✨ MAIN CONTENT */}
      <Box p="md">
        {currentPage === "home" && (
          <Box>
            <Text size="xl" weight={700} mb="md">
              Dashboard Overview
            </Text>
            <Text>Welcome to your dashboard!</Text>
          </Box>
        )}

        {currentPage === "users" && (
          <Box>
            <Text size="xl" weight={700} mb="md">
              Users Management
            </Text>
            <Text>Here you can manage your users.</Text>
            <PendingUsers></PendingUsers>
          </Box>
        )}

        {currentPage === "all-admins" && (
          <Box>

            <Text size="xl" weight={700} mb="md">
              All Admins
            </Text>
            <AdminList></AdminList> 
          </Box>
        )}

        {currentPage === "settings" && (
          <Box>
            <Text size="xl" weight={700} mb="md">
              Settings
            </Text>
            <Text>Manage your settings here.</Text>
          </Box>
        )}
      </Box>
    </AppShell>
    </div>
  )
}

export default SuperAdminDashboard