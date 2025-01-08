import { IAddress } from "../entities/Address";
import { ICompany } from "../entities/Company";
import { IUser } from "../entities/User";
import sequelize from "../interfaces/db/sequelize";
import AddressModel from "../interfaces/db/sequelize/models/addressModel";
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
  create(payload: ICompanyPayload): Promise<{ success: boolean }>;
  findOne(companyId: string): Promise<ICompany | null>;
}

export class CompanyRepository implements ICompanyRepository {
  async create(payload: ICompanyPayload): Promise<{ success: boolean }> {
    let success = false;

    try {
      await sequelize.transaction(async (transaction: any) => {
        const { user, ...companyPayload } = payload;

        const companyResp: ICompany = await CompanyModel.create(
          {
            companyName: companyPayload.companyName,
            cnpj: companyPayload.cnpj,
          },
          {
            transaction,
          }
        );

        const companyId = companyResp.id;

        await AddressModel.create(
          { ...companyPayload.address, companyId, addressableId: companyId },
          { transaction }
        );

        const userPayload = {
          ...user,
          companyId,
          address: { ...user.address, companyId },
        };

        await UserModel.create(userPayload, {
          transaction,
          include: [AddressModel],
        });
      });

      success = true;
    } catch (error) {
      throw new Error("Não foi possível criar o agendamento", { cause: error });
    }

    return { success };
  }

  findOne(companyId: string): Promise<ICompany> {
    return CompanyModel.findOne({ where: { id: companyId } });
  }
}
