import App from '@/App'
import DashboardLayout from '@/components/dashboardLayout/DashboardLayout'
import { role } from '@/constants/role'
import Login from '@/pages/Auth/1.Login/Login'
import Register from '@/pages/Auth/2.Register/Register'
import ForgotPassword from '@/pages/Auth/3.ForgotPassword/ForgotPassword'
import Home from '@/pages/public/1.Home/Home'
import About from '@/pages/public/2.About/About'
import Contact from '@/pages/public/3.Contact/Contact'
import Tracking from '@/pages/public/4.Tracking/Tracking'
import type { TRole } from '@/types'
import { generateRoutes } from '@/utils/generateRoutes'
import { withAuth } from '@/utils/withAuth'
import { createBrowserRouter, Navigate } from 'react-router'
import { adminSidebarItems } from './adminRoutes'
import { senderSidebarItems } from './senderRoutes'
import { receiverSidebarItems } from './receiverRoutes'
import { commonUserSidebarItems } from './commonUserRoutes'
import CreateParcel from '@/pages/dashboards/CreateParcel'
import ParcelDetails from '@/pages/public/4.Tracking/ParcelDetails'
import TrackingSearch from '@/pages/public/4.Tracking/TrackingSearch'

export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Home
            },
            {
                path: "about",
                Component: About
            },
            {
                path: "contact",
                Component: Contact
            },
            {
                path: "login",
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "forgot-password",
                Component: ForgotPassword
            },
            {
                Component: CreateParcel,
                path: "/create-parcel"
            },
            {
                path: "track-parcel/:id",
                Component: Tracking
            },
            {
                path: "track-parcel",
                Component: TrackingSearch
            },
            {
                Component: ParcelDetails,
                path: "/parcel-details/:id",
            },
            {
                Component: withAuth(DashboardLayout, role.superAdmin as TRole),
                path: "/admin",
                children: [
                    { index: true, element: <Navigate to="dashboard" /> },
                    ...generateRoutes(adminSidebarItems),
                ]
            },
            {
                Component: withAuth(DashboardLayout, role.sender as TRole),
                path: "/sender",
                children: [
                    { index: true, element: <Navigate to="dashboard" /> },
                    ...generateRoutes(senderSidebarItems),
                ],
            },
            {
                Component: withAuth(DashboardLayout, role.receiver as TRole),
                path: "/receiver",
                children: [
                    { index: true, element: <Navigate to="dashboard" /> },
                    ...generateRoutes(receiverSidebarItems),
                ],
            },
            {
                Component: withAuth(DashboardLayout, [role.sender as TRole, role.receiver as TRole]),
                path: "/common-user",
                children: [
                    { index: true, element: <Navigate to="senderDashboard" /> },
                    ...generateRoutes(commonUserSidebarItems),
                ],
            },
        ]
    }
])