export interface CategoryRef {
  id: string;
  name: string;
  description?: string;
}

export interface ContentAuthor {
  id: string;
  username: string;
  avatar?: string;
}

export type ContentStatus = "draft" | "published" | "archived";

export interface Content {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images?: string[];
  category: CategoryRef;
  rating?: number;
  downloads?: number;
  views?: number;
  createdAt: string;
  updatedAt?: string;
  author?: ContentAuthor;
  tags?: string[];
  fileCount?: number;
  fileSize?: string;
  status?: ContentStatus;
  collaborator?: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ContentStat {
  id: string;
  title: string;
  price: number;
  downloads: number;
  views: number;
  revenue: number;
  createdAt: string;
  lastDownloadAt?: string;
  collaborator?: {
    id: string;
    username: string;
    email: string;
  };
}

export type ContentSortBy = "Newest" | "Price" | "Title" | "Sold";
export type SortDirection = "Asc" | "Desc";
