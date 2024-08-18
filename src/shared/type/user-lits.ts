export interface UserInfo {
  url: MediaStream | null;
  muted: boolean;
  playing: boolean;
  type: "main" | "visited";
  rol : "admin" | "user"
}
export type UserList = Record<string, UserInfo>;
