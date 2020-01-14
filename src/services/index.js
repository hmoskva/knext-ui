import userService from "./user.service";

const services = {
  users: userService
};

export const ServiceFactory = {
  get: name => services[name]
};
