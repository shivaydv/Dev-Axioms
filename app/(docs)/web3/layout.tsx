import CommonLayout from "@/app/(docs)/common-layout";
import { web3 } from "@/lib/source";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return <CommonLayout pageTree={web3.pageTree}>{children}</CommonLayout>;
}
