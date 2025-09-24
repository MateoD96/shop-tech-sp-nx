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
import { productSchema } from "@/validations/product-schema";
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

interface ProductFormInterface {
  idProduct?: string;
  updateValues?: z.infer<typeof productSchema>;
  categories: Categories[];
  onSubmit: (values: z.infer<typeof productSchema>) => void;
  isPending?: boolean;
}

export default function NewProductForm({
  categories,
}: {
  categories: Categories[];
}) {
  const onSubmit = (values: z.infer<typeof productSchema>) => {
    console.log(values);
  };

  return <ProductForm categories={categories} onSubmit={onSubmit} />;
}

function ProductForm({
  categories,
  updateValues,
  onSubmit,
  isPending = false,
}: ProductFormInterface) {
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: updateValues ?? {
      name: "",
      description: "",
      status: "activo",
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
                    <FormLabel className="my-1">Title</FormLabel>
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
                    <FormLabel className="my-1">Title</FormLabel>
                    <FormControl>
                      <Textarea className="p-2" {...field} placeholder="...." />
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
