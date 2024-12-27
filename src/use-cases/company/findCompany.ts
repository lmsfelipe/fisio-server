import { ICompany } from "../../entities/Company";
import { ICompanyRepository } from "../../repositories/companyRepository";

export class FindCompany {
  companyRepository: ICompanyRepository;

  constructor(companyRepository: ICompanyRepository) {
    this.companyRepository = companyRepository;
  }

  async execute(companyId: string): Promise<ICompany | null> {
    return await this.companyRepository.findOne(companyId);
  }
}
