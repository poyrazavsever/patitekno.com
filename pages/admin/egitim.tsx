import { ReactElement } from 'react'
import { NextPageWithLayout } from '../_app'
import AdminLayout from '@/components/layout/AdminLayout'

const AdminLesson : NextPageWithLayout = () => {
  return (
    <div>AdminLesson</div>
  )
}

AdminLesson.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminLesson