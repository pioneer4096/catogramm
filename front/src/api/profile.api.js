import http from "./HttpClient";
import endpoints from "@/api/endpoints";

export const getProfile = () => http().get(endpoints.getProfile);

export const updateProfileStatus = (status) =>
  http().post(endpoints.updateProfile, {
      profile: {
          status
      }
  });
