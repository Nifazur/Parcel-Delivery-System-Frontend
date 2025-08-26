import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminRoutes";
import { receiverSidebarItems } from "@/routes/receiverRoutes";
import { senderSidebarItems } from "@/routes/senderRoutes";
import { commonUserSidebarItems } from "@/routes/commonUserRoutes";
import type { TRole } from "@/types";

export const getSidebarItems = (
  userRoles: TRole[] = []
):
  | typeof adminSidebarItems
  | typeof senderSidebarItems
  | typeof receiverSidebarItems
  | typeof commonUserSidebarItems => {

  if (
    userRoles.includes(role.superAdmin as TRole) ||
    userRoles.includes(role.admin as TRole)
  ) {
    return [...adminSidebarItems];
  }

  if (
    userRoles.includes(role.sender as TRole) &&
    userRoles.includes(role.receiver as TRole)
  ) {
    return [...commonUserSidebarItems];
  }


  if (userRoles.includes(role.sender as TRole)) {
    return [...senderSidebarItems];
  }


  if (userRoles.includes(role.receiver as TRole)) {
    return [...receiverSidebarItems];
  }

  return [];
};