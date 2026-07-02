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
      <h1>hola mundo</h1>
      <p>services</p>
      {
        data?.collection.services.map((item: any, index: number) => (
          <div key={index}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))
      }
    </div>
  );
}