import httpService from './http.service';

const furnitureEndpoint = 'furniture/';

const furnitureService = {
  fetchAll: async () => {
    const { data } = await httpService.get(furnitureEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(furnitureEndpoint, payload);
    return data;
  },
  delete: async (furnitureID) => {
    const { data } = await httpService.delete(furnitureEndpoint + furnitureID);
    return data;
  },
  getLastIndex: async () => {
    const { data } = await httpService.get(furnitureEndpoint + 'lastindex');
    return data;
  },
  patch: async (payload) => {
    const { data } = await httpService.patch(
      furnitureEndpoint + payload._id,
      payload
    );
    return data;
  }
};

export default furnitureService;
