/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import { Model } from "mongoose";

export const PaginationUtility = {
  /**
   * @description Paginate a collection of documents
   * @param model The mongoose model to paginate
   * @param params The query parameters to filter the collection
   * @param limit The number of documents to return per page
   * @param offset The number of documents to skip
   * @returns The paginated collection
   */
  async paginateCollection<
    TParams extends Record<string, unknown>,
    TModel extends Model<any>,
  >(model: TModel, params: TParams, limit: number = 10, offset: number = 0) {
    const totalCount = await model.countDocuments(params);

    const data = await model.find(params).limit(limit).skip(offset);

    const hasNextPage = offset + limit < totalCount;

    return {
      data,
      count: data.length,
      pageInfo: {
        totalCount,
        hasNextPage,
        hasPreviousPage: offset > 0,
        startCursor: offset,
        endCursor: offset + limit,
      },
    };
  },
};
