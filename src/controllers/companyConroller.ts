import {
  FastifyReply,
  FastifyRequest,
  TBodyRequest,
} from "../interfaces/fastify/requestTypes";
import {
  ICompanyPayload,
  CompanyRepository,
} from "../repositories/companyRepository";
import { CreateCompany } from "../use-cases/company/createCompany";
import { FindCompany } from "../use-cases/company/findCompany";
import { decodeFromAuth } from "../utils/decodeFromAuth";

const companyRepository = new CompanyRepository();

export const companyController = {
  async createCompany(req: TBodyRequest<ICompanyPayload>, res: FastifyReply) {
    const createCompany = new CreateCompany(companyRepository);

    try {
      const response = await createCompany.execute(req.body);

      res.type("application/json").code(201);
      return { success: response.success };
    } catch (error) {
      if (error instanceof Error) {
        // TODO: standardize errors
        res.type("application/json").code(400);
        throw { message: error.message, error: error.cause };
      } else {
        res.type("application/json").code(500);
        throw { error: "Ocorreu um erro" };
      }
    }
  },

  async findCompany(req: FastifyRequest, reply: FastifyReply) {
    const findCompany = new FindCompany(companyRepository);

    try {
      const decodedToken = decodeFromAuth(req.headers.authorization);
      const response = await findCompany.execute(decodedToken.userId);

      reply.type("application/json").code(200);
      return response;
    } catch (error) {
      reply.type("application/json").code(400);

      throw { error };
    }
  },
};
