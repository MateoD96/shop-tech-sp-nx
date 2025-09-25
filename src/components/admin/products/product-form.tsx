"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Categories } from "@/lib/types";
import { productFormSchema } from "@/validations/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { insertNewProduct } from "./actions";

interface ProductFormInterface {
  idProduct?: string;
  updateValues?: z.infer<typeof productFormSchema>;
  categories: Categories[];
  onSubmit: (values: z.infer<typeof productFormSchema>) => void;
  isPending?: boolean;
}

export default function NewProductForm({
  categories,
}: {
  categories: Categories[];
}) {
  const productMutation = useMutation({
    mutationKey: ["newProductMutation"],
    mutationFn: insertNewProduct,
    onSuccess: () => {},
    onError: () => {},
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof productFormSchema>) => {
      productMutation.mutate(values);
    },
    [productMutation]
  );

  return <ProductForm categories={categories} onSubmit={onSubmit} />;
}

////////////////////////////

function ProductForm({
  categories,
  updateValues,
  onSubmit,
  isPending = false,
}: ProductFormInterface) {
  //FIXME:
  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: updateValues ?? {
      name: "",
      description: "",
      categorie: "",
      stock: "",
      price: "",
    },
  });

  return (
    <div className="my-6 p-4 bg-white dark:bg-[#171717] max-w-2xl rounded-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col p-2 gap-2">
            <div className=" relative my-1">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-1">Titulo</FormLabel>
                    <FormControl>
                      <Input
                        className="p-2"
                        {...field}
                        placeholder="ej: Xbox series x"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="my-2">
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-1">Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        className="p-2 resize-none"
                        {...field}
                        placeholder="...."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-2 flex gap-6">
              <FormField
                name="productImages"
                control={form.control}
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel className="my-1">Multimedia</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        className="p-2"
                        multiple
                        onChange={(event) => onChange(event.target.files)}
                        {...fieldProps}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="my-2 flex gap-6">
              <FormField
                name="status"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-1">Status</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Estado del producto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={"borrador"}>Borrador</SelectItem>
                        <SelectItem value={"activo"}>Activo</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {categories.length > 0 && (
                <FormField
                  name="categorie"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="my-1">Categoria</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.name}>
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="my-2 flex gap-6">
              <FormField
                name="price"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-1">Precio</FormLabel>
                    <FormControl>
                      <Input className="p-2" {...field} placeholder="20000" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="stock"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-1">Stock</FormLabel>
                    <FormControl>
                      <Input
                        className="p-2"
                        {...field}
                        placeholder="10 productos en stock"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button
                className="w-full my-2"
                type="submit"
                disabled={isPending}
              >
                {!updateValues ? "Guardar" : "Guardar cambios"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
