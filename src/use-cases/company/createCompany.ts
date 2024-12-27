import { Company } from "../../entities/Company";
import { Permission, User, UserType } from "../../entities/User";
import {
  ICompanyPayload,
  ICompanyRepository,
} from "../../repositories/companyRepository";

export class CreateCompany {
  companyRepository: ICompanyRepository;

  constructor(companyRepository: ICompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(
    payload: ICompanyPayload
  ): Promise<{ success: boolean; id: string }> {
    const { address, cnpj, companyName, logo, user } = payload;

    const company = new Company({ cnpj, companyName, logo, address });
    const userEntity = new User({
      ...user,
      userType: UserType.OWNER,
      permission: Permission.FULL,
    });

    return await this.companyRepository.create({
      ...company.data,
      user: userEntity.data,
    });
  }
}
