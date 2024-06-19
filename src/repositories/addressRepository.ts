import { IAddress } from "../entities/Address";
import AddressModel from "../frameworks/db/sequelize/addressModel";

export interface IAddressRepository {
  create(payload: IAddress): Promise<{ success: boolean }>;
  findOne(addressId: number): Promise<IAddress | null>;
  update(payload: IAddress): Promise<{ success: boolean }>;
}

export class AddressRepository implements IAddressRepository {
  create(addressPayload: IAddress): Promise<{ success: boolean }> {
    return AddressModel.create(addressPayload);
  }

  findOne(addressId: number): Promise<IAddress> {
    return AddressModel.findOne(addressId);
  }

  update(payload: IAddress): Promise<{ success: boolean }> {
    return AddressModel.findOne(payload);
  }
}
