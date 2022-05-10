import http from "./HttpClient";
import endpoints from "@/api/endpoints";

export const getFriendStatus = (friendId) =>
  http().post(endpoints.friendStatus, { friendId });

export const addFriend = (friendId) => http().post(`${endpoints.friendAdd}/${friendId}`)