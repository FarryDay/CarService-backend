import { ContextType, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Response } from 'express';
import { GqlContextType } from 'nestjs-prisma';

export default class GuardsUtils {
  public static getRequest(context: ExecutionContext): any {
    let req: null | any = null;

    switch (context.getType<GqlContextType | ContextType>()) {
      case 'http': {
        const httpContext = context.switchToHttp();
        req = httpContext.getRequest();
        break;
      }
      case 'graphql': {
        const graphQLContext = GqlExecutionContext.create(context).getContext();
        req = graphQLContext.req;
        break;
      }
    }

    return req;
  }

  public static getResponse(context: ExecutionContext): Response {
    let res: null | Response = null;

    switch (context.getType<GqlContextType | ContextType>()) {
      case 'http': {
        const httpContext = context.switchToHttp();
        res = httpContext.getResponse() as Response;
        break;
      }
      case 'graphql': {
        const graphQLContext = GqlExecutionContext.create(context).getContext();
        res = graphQLContext.res;
        break;
      }
    }

    return res;
  }
}
