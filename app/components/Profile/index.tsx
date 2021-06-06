import { ProfileProvider } from '@/contexts/Profile/ProfileContext'

import HeaderHome from './Header'
import Steps from './Steps'

const ProfileCreation = () => {

  return (
    <ProfileProvider>
      <HeaderHome />
      <Steps />
    </ProfileProvider>
  )
}

export default ProfileCreation
