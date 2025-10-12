export const AVATAR_CONSTANTS = {
  DEFAULT_FILENAME: "defaultProfile.png",
  UPLOADS_BASE_URL:
    import.meta.env.VITE_UPLOADS_URL || "http://localhost:3000/uploads",
  AVATARS_PATH: "/avatars",
};

export const getAvatarUrl = (filename?: string | null): string => {
  const { DEFAULT_FILENAME, UPLOADS_BASE_URL, AVATARS_PATH } = AVATAR_CONSTANTS;
  return `${UPLOADS_BASE_URL}${AVATARS_PATH}/${filename || DEFAULT_FILENAME}`;
};

export const isDefaultAvatar = (filename?: string | null): boolean => {
  return !filename || filename === AVATAR_CONSTANTS.DEFAULT_FILENAME;
};

export const getAvatarFilename = (avatarUrl?: string | null): string | null => {
  if (!avatarUrl) return null;

  if (avatarUrl.includes("/")) {
    return avatarUrl.split("/").pop() || null;
  }

  return avatarUrl;
};
