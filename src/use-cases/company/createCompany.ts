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

  async execute(payload: ICompanyPayload): Promise<{ success: boolean }> {
    const { address, cnpj, companyName, logo, user } = payload;

    const company = new Company({ cnpj, companyName, logo, address });
    company.setAddressableType();

    const userEntity = new User(user);
    userEntity.setAddressableType();
    userEntity.setUserType(UserType.OWNER);
    userEntity.setPermission(Permission.FULL);

    return await this.companyRepository.create({
      ...company.data,
      user: userEntity.data,
    });
  }
}
