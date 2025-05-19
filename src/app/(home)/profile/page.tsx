import { getUserSession } from "@/actions/auth-actions"
import ProfilePage from "@/components/home/profile-card"
import { redirect } from "next/navigation"

const Profile = async () => {

  const session = await getUserSession()
  
  // Jika belum login, redirect ke login
  if (!session) {
    redirect("/login")
  }
  
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <ProfilePage />
    </div>
  )
}

export default Profile