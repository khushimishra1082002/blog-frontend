import conf from "../config/Conf";

export const getImageUrl = (image?: string) => {
  if (!image) return "/default-avatar.png";

  if (image.startsWith("http")) return image;

  return `${conf.BaseURL}/${conf.ImageUploadUrl}/${image}`;
};
