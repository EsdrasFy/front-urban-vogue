import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";



export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);
  if (!session) {
    console.log(session);
    redirect("/login");
  }
  return <div className="w-full">{children}</div>;
}
