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
  IconGridDots
} from "@tabler/icons-react";
import PendingUsers from '../../slots/PendingUsers';
import { Link } from 'react-router';
import AdminList from '../../slots/AdminList';
import ProductForm from '../../slots/ProductForm';
import AllProducts from '../../slots/AllProducts';

const AdminDashboard = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  // ✅ Track which page is active
  const [currentPage, setCurrentPage] = useState("allProducts");

  return (
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
              🏢 My Dashboard
            </Text>
          </Navbar.Section>

          <Navbar.Section grow mt="md" component={ScrollArea}>
            <Group direction="column" spacing="sm">
              <UnstyledButton onClick={() => setCurrentPage("allProducts")}>
                <Group>
                  <ThemeIcon variant="light" color="blue">
                    <IconGridDots size={20} />
                  </ThemeIcon>
                  <Text>All Products</Text>
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

              <UnstyledButton onClick={() => setCurrentPage("product-form")}>
                <Group>
                  <ThemeIcon variant="light" color="orange">
                    <IconSettings size={20} />
                  </ThemeIcon>
                  <Text>Product Form</Text>
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
        {currentPage === "allProducts" && (
          <Box>
            <Text size="xl" weight={700} mb="md">
              Dashboard Overview
              <button className="btn btn-active btn-primary">Primary</button>
            </Text>
            <AllProducts></AllProducts>
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

        {currentPage === "product-form" && (
          <Box>
            <Text size="xl" weight={700} mb="md">
              Product Form
            </Text>
            <ProductForm>
            </ProductForm>
          </Box>
        )}
      </Box>
    </AppShell>
  );
};

export default AdminDashboard;