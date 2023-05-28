import { NextPage } from "next";

import { ProfileLayout, ProfileMenu } from "~/features/profile/components";

const Profile: NextPage = () => {
  return (
    <ProfileLayout>
      <ProfileMenu />
    </ProfileLayout>
  );
};

export default Profile;
