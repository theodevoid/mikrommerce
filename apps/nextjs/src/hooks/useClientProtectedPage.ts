import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export const useClientProtectedPage = () => {
  const user = useUser();
  const supabase = useSupabaseClient();

  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const session = await supabase.auth.getSession();

      if (!session.data.session) {
        void router.push("/");
      }
    }

    void checkSession();
  }, [user, router, supabase.auth]);
};
