import dynamic from "next/dynamic";

// dynamic import ensures client-side rendering
const Calculator = dynamic(() => import("./Calculator"), { ssr: false });

export default function Page() {
  return <Calculator />;
}
