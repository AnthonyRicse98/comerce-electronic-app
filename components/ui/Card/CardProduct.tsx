"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
    id: string;
    name: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
    oldPrice?: number;
    image: string;
    isNew?: boolean;
    onSale?: boolean;
}

interface ProductCategoryProps {
    product?: Product;
}

const defaultProduct: Product = {
    id: "1",
    name: "Apple Watch S9",
    category: "Electronics",
    rating: 4.5,
    reviews: 105,
    price: 684,
    oldPrice: 855,
    image: "https://provejec.com/wp-content/uploads/2024/09/PROVEJEC-WEB-13.png",
    onSale: true,
};

const CardProduct = ({ product = defaultProduct }: ProductCategoryProps) => {

    return (
        <div className="flex items-center justify-center">
            <div className="w-77.5   shrink-0">
                <Card className="p-0 ring-0 gap-0 overflow-hidden border border-neutral-100 shadow-sm bg-card rounded-2xl">
                    <div className="relative rounded-t-2xl h-80 overflow-hidden flex items-center justify-center">


                        <div className="relative w-full h-70 overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-100 h-full object-contain transition-transform duration-500 group-hover:scale-110 block"
                            // 'block' elimina el espacio extra que los elementos inline pueden dejar abajo
                            />
                        </div>

                    </div>
                    <CardContent className="p-5 flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-muted-foreground">
                                {product.category}
                            </p>
                            <p className="text-lg font-medium text-foreground line-clamp-1">
                                {product.name}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="w-full h-10 bg-amber-600 text-white rounded-lg font-medium border-border transition-colors duration-300 dark:bg-background dark:border-border cursor-pointer"
                        >
                            Ver más
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CardProduct;