import { IAddress } from "../entities/Address";
import { ICompany } from "../entities/Company";
import { IUser } from "../entities/User";
import Address from "../interfaces/db/sequelize/models/addressModel";
import CompanyModel from "../interfaces/db/sequelize/models/companyModel";
import UserModel from "../interfaces/db/sequelize/models/userModel";

export interface IUserPayload extends IUser {
  address: IAddress;
}

export interface ICompanyPayload extends ICompany {
  address: IAddress;
  user: IUserPayload;
}

export interface ICompanyRepository {
  create(payload: ICompanyPayload): Promise<{ success: boolean; id: string }>;
  findOne(companyId: string): Promise<ICompany | null>;
}

export class CompanyRepository implements ICompanyRepository {
  create(payload: ICompanyPayload): Promise<{ success: boolean; id: string }> {
    return CompanyModel.create(payload, {
      include: [{ model: Address }, { model: UserModel, include: Address }],
    });
  }

  findOne(companyId: string): Promise<ICompany> {
    return CompanyModel.findOne({ where: { companyId } });
  }
}
