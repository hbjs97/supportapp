import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  router.push("/map");

  return <></>;
};

export default Index;
