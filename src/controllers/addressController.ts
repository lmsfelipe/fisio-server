import { AddressRepository } from "../repositories/addressRepository";
import { CreateAddress } from "../use-cases/address/createAddress";

const addressRepository = new AddressRepository();

export const addressController = {
  async createAddress(req: any, res: any) {
    const createAddress = new CreateAddress(addressRepository);

    try {
      await createAddress.execute(req.body);

      res.type("application/json").code(200);
      return { success: true };
    } catch (error) {
      res.type("application/json").code(400);

      return { error };
    }
  },
};
