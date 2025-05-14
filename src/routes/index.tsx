import { createBrowserRouter } from "react-router-dom";
import {
  CampaignDetailsPage,
  CampaignsPage,
  CreateCampaignPage,
  DashboardPage,
  DetailError404Page,
  Error404Page,
  HomePage,
  HowItWorksPage,
  LoginPage,
  SignupPage,
} from "../pages";

import { DashboardLayout, PublicLayout } from "../layout";
import DashboardRoute from "./DashboardRoute";
import OverviewPage from "../pages/adminPanel/OverviewPage";
import ProductsPage from "../pages/adminPanel/ProductsPage";
import UsersPage from "../pages/adminPanel/UsersPage";
import SalesPage from "../pages/adminPanel/SalesPage";
import OrdersPage from "../pages/adminPanel/OrdersPage";
import AnalyticsPage from "../pages/adminPanel/AnalyticsPage";
import SettingsPage from "../pages/adminPanel/SettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout compressedNav />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "",
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
    errorElement: <Error404Page />,
  },
  {
    path: "signup",
    element: <SignupPage />,
    errorElement: <Error404Page />,
  },
  {
    path: "how-it-works",
    element: <PublicLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "",
        index: true,
        element: <HowItWorksPage />,
      },
    ],
  },
  {
    path: "campaigns",
    element: <PublicLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <CampaignsPage />,
        errorElement: <Error404Page />,
      },
      {
        path: ":id",
        element: <CampaignDetailsPage />,
        errorElement: <DetailError404Page />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "",
        index: true,
        element: <DashboardPage />,
      },
    ],
  },

  {
    path: "create-campaign",
    element: <DashboardLayout />,
    errorElement: <Error404Page />,
    children: [
      {
        path: "",
        index: true,
        element: <CreateCampaignPage />,
      },
    ],
  },

  {
    path: "adminPanel",
    element: <DashboardRoute />,
    errorElement: <Error404Page />,
    children: [
      { index: true, element: <OverviewPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "sales", element: <SalesPage /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "analytics", element: <AnalyticsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);

export default router;
