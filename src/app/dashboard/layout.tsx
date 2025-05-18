import { DashboardLayout } from "@/components/dashboard-layout";

interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div>
        <DashboardLayout>{children}</DashboardLayout>
    </div>
  )
}

export default Layout