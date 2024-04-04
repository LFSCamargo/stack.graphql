import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { StorageUtility } from "../utils";

export function useRequireAuth() {
  const router = useRouter();
  onBeforeMount(() => {
    if (!StorageUtility.getToken()) {
      router.push("/login");
    }
  });
}
