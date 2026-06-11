export type UserRole = "user" | "admin" | "collaborator";

export type CollaboratorStatus = "pending" | "approved" | "rejected" | null;

export interface User {
  id: string;
  _id?: string;
  email: string;
  username?: string;
  avatar?: string;
  role?: UserRole;
  collaboratorStatus?: CollaboratorStatus;
  createdAt?: string;
  updatedAt?: string;
}

export type Profile = Required<Pick<User, "id" | "email" | "username">> &
  Pick<User, "role" | "collaboratorStatus"> & {
    createdAt: string;
    updatedAt: string;
  };
