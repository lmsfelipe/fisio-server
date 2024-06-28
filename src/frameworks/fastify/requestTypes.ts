import type { FastifyRequest } from "fastify";

export type TBodyRequest<TBody> = FastifyRequest<{
  Body: TBody;
}>;

export type TParamsRequest<TParams> = FastifyRequest<{
  Params: TParams;
}>;
