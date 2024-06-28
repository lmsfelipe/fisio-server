import type { FastifyRequest } from "fastify";

export type TBodyRequest<TBody> = FastifyRequest<{
  Body: TBody;
}>;
