import { IProfessional } from "../entities/Professional";
import Address from "../frameworks/db/sequelize/addressModel";
import ProfessionalModel from "../frameworks/db/sequelize/professionalModel";

export interface IProfessionalRepository {
  create(
    professional: IProfessional
  ): Promise<{ success: boolean; name: string }>;
  findOne(id: number): Promise<IProfessional | null>;
}

export class ProfessionalRepository implements IProfessionalRepository {
  create(payload: IProfessional): Promise<{ success: boolean; name: string }> {
    return ProfessionalModel.create(payload, { include: [Address] });
  }

  findOne(id: number): Promise<IProfessional> {
    return ProfessionalModel.findByPk(id);
  }
}
