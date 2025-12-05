import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
  User,
  UserCheck2,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { userManagementApi } from "@/api/user-management-api";
import { usePathname } from "next/navigation";

// Sidebar menu items
const items = [
  {
    title: "Student",
    url: "#",
    icon: UserCheck2,
    subItems: [
      {
        title: "Student",
        url: "/student-management/student/get-student-list-data",
        // icon: User,
      },
      // {
      //   title: "Student Subject Enrolment",
      //   url: "/student-management/student-subject-enrolment/get-student-subject-enrolment-list-data",
      //   // icon: User,
      // },
    ],
  },
  {
    title: "Program",
    url: "#",
    icon: BookOpen,
    subItems: [
      {
        title: "Paper Class",
        url: "/program-management/paper-class/get-paper-class-list-data",
        // icon: User,
      },
      {
        title: "Paper Class Student Enrolment",
        url: "/program-management/paper-class-student-enrolment/get-paper-class-student-enrolment-list-data",
        // icon: User,
      },
      {
        title: "Paper Set",
        url: "/program-management/paper-set/get-paper-set-list-data",
        // icon: User,
      },
    ],
  },
  {
    title: "Lecturers",
    url: "#",
    icon: User,
    subItems: [
      {
        title: "Lecturer Time Schedule",
        url: "/lecturer-management/lecturer-time-schedule/get-lecturer-time-schedule-list-data",
        // icon: User,
      },
    ],
  },
];

const TSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [openedParentMenuTitle, setOpenedParentMenuTitle] = React.useState<
    string | null
  >(null);
  useEffect(() => {
    items.map((item) => {
      item.subItems.find((obj: { url: string }) => obj.url == pathname) &&
        setOpenedParentMenuTitle(item.title);
    });
  }, [pathname]);
  return (
    <Sidebar className="w-[300px] h-full overflow-y-auto mt-[65px] bg-[#e9e9e9]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) =>
                item.subItems ? (
                  // Collapsible Menu Item
                  <Collapsible
                    key={item.title}
                    // defaultOpen={false}
                    onClick={() => setOpenedParentMenuTitle(item.title)}
                    open={item.title === openedParentMenuTitle}
                    className="group/collapsible cursor-pointer"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="flex justify-between items-center w-full">
                          <div className="flex items-center gap-2">
                            <item.icon className="w-5 h-5 text-blue-500" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((sub) => (
                            <SidebarMenuSubItem key={sub.title}>
                              <Link href={sub.url}>
                                <SidebarMenuButton
                                  className="cursor-pointer"
                                  tooltip={sub.title}
                                  isActive={sub.url == pathname ? true : false}
                                >
                                  <span>{sub.title}</span>
                                </SidebarMenuButton>
                              </Link>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  // Normal Menu Item
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        href={item.url}
                        className="flex items-center gap-2 hover:bg-gray-200 rounded-md px-2 py-1 transition-colors"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default TSidebar;
