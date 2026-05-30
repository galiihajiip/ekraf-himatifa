/**
 * Admin Layout
 *
 * Provides a sidebar navigation and top bar for the admin panel.
 * Only rendered for authenticated admin users (protected by middleware).
 */

import { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
