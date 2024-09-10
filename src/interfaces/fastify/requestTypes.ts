import type { FastifyRequest, FastifyReply } from "fastify";

export type { FastifyReply, FastifyRequest };

export type TBodyRequest<TBody> = FastifyRequest<{
  Body: TBody;
}>;

export type TQueryRequest<TQuery> = FastifyRequest<{
  Querystring: TQuery;
}>;

export type TParamsRequest<TParams> = FastifyRequest<{
  Params: TParams;
}>;
