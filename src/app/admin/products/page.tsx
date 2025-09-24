import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div className=" text-white p-6">
      <div className="flex justify-between">
        <div>Admin Products</div>
        <div>
          <Button
            variant={"link"}
            className="dark:bg-white dark:text-black rounded"
          >
            <Link href={"/admin/products/new"}>Agregar producto</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
