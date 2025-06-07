import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";
import AdminLayout from "@/components/layout/AdminLayout";

const Admin : NextPageWithLayout = () => {
  return (
    <div>
      
    </div>
  )
}

Admin.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};


export default Admin