import { useLoggedCardUserTransactionsQuery } from "@ipe.stack/apollo/generated";
import { ref } from "vue";

const ITEMS_PER_PAGE = 10;

export const useCardUserPaginatedTransactions = () => {
  const limit = ref(ITEMS_PER_PAGE);
  const { result, loading, fetchMore } = useLoggedCardUserTransactionsQuery({
    input: {
      limit: ITEMS_PER_PAGE,
    },
  });

  const fetchMoreTransactions = async () => {
    if (result.value?.cardUserTransactions.pageInfo.hasNextPage === false)
      return;

    const cururentLimit = limit.value;

    await fetchMore({
      variables: {
        input: {
          limit: cururentLimit + ITEMS_PER_PAGE,
        },
      },
    });

    limit.value = cururentLimit + ITEMS_PER_PAGE;
  };

  return {
    data: result,
    loading,
    fetchMoreTransactions,
  };
};
