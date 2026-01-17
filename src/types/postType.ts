export interface Category {
  _id?: string;
  name?: string;
}

export interface Author {
  _id?: string;
  name?: string;
  image?: string;
  email?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  image?: string;
  createdAt?: string;
  category?: string | Category;
  author?: Author;

  // ✅ FIX IS HERE
  likes?: string[] | number;
  comments?: string[] | string;
}
