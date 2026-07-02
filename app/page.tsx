import AuthForm from "@/components/auth/AuthForm";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();

  const { data, error } = await supabase
  .from("HOMEPAGE")
  .select("name, collection")
  .single();

console.log(data?.collection);
  return (
    <div className="pt-12">
      <AuthForm type="sign-in" />
    </div>
  );
}