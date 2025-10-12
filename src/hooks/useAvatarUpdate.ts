import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

export const useAvatarUpdate = () => {
  const { user } = useAuth();
  const [avatarTimestamp, setAvatarTimestamp] = useState(Date.now());

  useEffect(() => {
    setAvatarTimestamp(Date.now());
  }, [user?.avatar]);

  return {
    avatarKey: `avatar-${user?.avatar || "default"}-${avatarTimestamp}`,
    avatar: user?.avatar,
  };
};
