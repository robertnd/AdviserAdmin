import MainWrapper from "@/layouts/wrappers/main-wrapper";
import { Button } from "@/components/ui/button";
export function CustomerPage() {
  return (
    <MainWrapper>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Customer</h1>
        <Button>Add Customer</Button>
      </div>
    </MainWrapper>
  );
}
