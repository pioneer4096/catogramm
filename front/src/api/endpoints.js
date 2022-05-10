const endpoints = {
  login: "/auth",
  register: "/register",
  getProfile: "/profile/self",
  updateProfile: "/profile/update",
  friendStatus: "/friends/get/status",
  friendAdd: "/friends/add",
  getFeed: "/feed/get"
};

function endpointsWrapper() {
  if (false) {
    // TODO: add production mode condition
    return endpoints;
  } else {
    const prefix = "/api";
    const prefixedEndpoints = {};
    Object.keys(endpoints).forEach((key) => {
      prefixedEndpoints[key] = prefix + endpoints[key];
    });
    return prefixedEndpoints;
  }
}

export default endpointsWrapper();
