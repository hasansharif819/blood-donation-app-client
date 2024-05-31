import { USER_ROLE } from "@/contants/role";
import { DrawerItem, UserRole } from "@/types";

//icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import PersonIcon from "@mui/icons-material/Person";
import KeyIcon from "@mui/icons-material/Key";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  const defaultMenus = [
    {
      title: "Profile",
      path: "profile",
      icon: PersonIcon,
    },
    {
      title: "Change Password",
      path: "change-password",
      icon: KeyIcon,
    },
  ];

  switch (role) {
    // case USER_ROLE.SUPER_ADMIN:
    // roleMenus.push(
    //   {
    //     title: "Dashboard",
    //     path: `${role}`,
    //     icon: DashboardIcon,
    //   },
    //   {
    //     title: "Manage Users",
    //     path: `manage-users`,
    //     icon: GroupIcon,
    //   }
    // );
    // break;

    case USER_ROLE.ADMIN:
      roleMenus.push(
        {
          title: "Dashboard",
          path: "donors",
          icon: DashboardIcon,
        },
        {
          title: "Donors",
          path: "donors",
          icon: BloodtypeIcon,
        }
      );
      break;

    case USER_ROLE.USER:
      // roleMenus.push({
      //   title: "Donors",
      //   path: `donors`,
      //   icon: MedicalInformationIcon,
      // });
      break;

    default:
      break;
  }

  return [...roleMenus, ...defaultMenus];
};
