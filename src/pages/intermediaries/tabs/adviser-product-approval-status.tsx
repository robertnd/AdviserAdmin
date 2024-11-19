import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { getAdviserApprovedProducts } from "@/services/queries";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"

interface Product {
  id: number;
  name: string;
  description: string;
}

interface ProductCategory {
  category_id: number;
  category_name: string;
  category_description: string;
  products: Product[];
}

export default function AdviserProductApprovalStatus() {
  const { intermediaryId } = useParams<{ intermediaryId: string }>();
  const { data: adviserApprovedProducts, isLoading } = getAdviserApprovedProducts(intermediaryId as string);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex justify-center items-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  if (!adviserApprovedProducts || adviserApprovedProducts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6 flex justify-center items-center min-h-[200px]">
          <p className="text-muted-foreground">No approved products found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-6">
          {adviserApprovedProducts?.map((category: ProductCategory) => (
            <div key={category.category_id}>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">{category.category_name}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    {category.products
                      .slice(0, Math.ceil(category.products.length / 2))
                      .map((product) => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product.id}`}
                            disabled
                          />
                          <label htmlFor={`product-${product.id}`}>{product.name}</label>
                        </div>
                      ))}
                  </div>
                  <div className="space-y-4">
                    {category.products
                      .slice(Math.ceil(category.products.length / 2))
                      .map((product) => (
                        <div key={product.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`product-${product.id}`}
                            disabled
                          />
                          <label htmlFor={`product-${product.id}`}>{product.name}</label>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {category.category_id !== adviserApprovedProducts[adviserApprovedProducts.length - 1].category_id && (
                <Separator className="my-6" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
