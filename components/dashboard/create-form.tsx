'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';


import { createProduct } from '@/lib/actions/product.actions';
import { CreateProductState } from '@/lib/types/product.types';
import { Category, Subcategory } from '@/lib/types/definitions';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Plus, Trash2 } from 'lucide-react';
import { title } from 'process';
import { deleteImage } from '@/lib/cloudinary/upload-image';

type Specification = {
  label: string;
  value: string;
};

type ProductImage = {
  image_url: string;
  publicId: string;
};

export default function CreateProductForm({
  categories,
}: {
  categories: Category[];
}) {

  /* -------------------- STATE (SIN CAMBIOS) -------------------- */

  const initialState: CreateProductState = {
    success: false,
    message: null,
    errors: {},
    values: {},
  };

  const [state, formAction] = useActionState(createProduct, initialState);
  const errorState = !state.success ? state : null;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [specifications, setSpecifications] = useState<Specification[]>([{ label: '', value: '' },]);

  const [imageUrl, setImageUrl] = useState(errorState?.values.image_url ?? '');

  const [images, setImages] = useState<ProductImage[]>(() => {
    try {
      const saved = errorState?.values?.images;
      return saved && typeof saved === 'string' ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  /* -------------------- EFFECTS (SIN CAMBIOS) -------------------- */

  useEffect(() => {
    if (!errorState) return;

    if (errorState.values.category) {
      setSelectedCategory(errorState.values.category);

      const category = categories.find(
        c => c.category_id === Number(errorState.values.category)
      );

      setAvailableSubcategories(category?.subcategories ?? []);
    }

    if (errorState.values.subcategory) {
      setSelectedSubcategory(errorState.values.subcategory);
    }
  }, [errorState, categories]);

  /* -------------------- HANDLERS (SIN CAMBIOS) -------------------- */

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);

    const category = categories.find(
      c => c.category_id === Number(value)
    );

    setAvailableSubcategories(category?.subcategories ?? []);
    setSelectedSubcategory('');
  };

  const addSpecification = () => {
    setSpecifications(prev => [...prev, { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const updateSpecification = (
    index: number,
    field: 'label' | 'value',
    value: string
  ) => {
    setSpecifications(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  // Handler para agregar imagen
  const addImage = (imageUrl: string, publicId: string) => {
    setImages(prev => [{ image_url: imageUrl, publicId: publicId }]);
  };

  // Handler para eliminar imagen
  const removeImage = async (index: number) => {
    const img = images[index];
    if (img?.publicId) {
      await deleteImage(img.publicId).catch(console.error);
    }
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const FieldError = ({ errors }: { errors?: string[] }) => {
    if (!errors || errors.length === 0) return null;
    return <p className="text-sm text-red-500 mt-1">{errors[0]}</p>;
  };


  /* -------------------- RENDER -------------------- */



  return (
    <form action={formAction} className="bg-gray-50 rounded-xl p-8 mx-auto my-12 max-w-6xl space-y-12">

      {/* Hidden Specifications */}
      <input
        type="hidden"
        name="specifications"
        value={JSON.stringify(
          specifications.filter(
            s => s.label.trim() !== '' && s.value.trim() !== ''
          )
        )}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">
          Crear producto
        </h1>
      </div>

      {/* CONTENIDO */}
      <div className="grid gap-16 lg:grid-cols-3">

        {/* ================= CONTENIDO ================= */}
        <div className="lg:col-span-2 space-y-10">

          {/* TÍTULO */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              name="title"
              defaultValue={errorState?.values.title ?? ''}
            // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
            <FieldError errors={errorState?.errors?.title} />
          </div>

          {/* DESCRIPCIÓN CORTA */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción corta</label>
            <Textarea
              name="shortDescription"
              rows={2}
              maxLength={150}
              defaultValue={errorState?.values.shortDescription ?? ''}
            // className="resize-none border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
            <FieldError errors={errorState?.errors?.shortDescription} />

          </div>

          {/* DESCRIPCIÓN LARGA */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción larga</label>
            <Textarea
              name="longDescription"
              rows={4}
              maxLength={300}
              defaultValue={errorState?.values.longDescription ?? ''}
            // className="resize-none border-0 border-b rounded-none px-0 focus-visible:ring-0"
            />
            <FieldError errors={errorState?.errors?.longDescription} />
          </div>

          {/* PRECIO / STOCK / DESCUENTO */}
          <div className="grid grid-cols-3 gap-8">

            <div className="space-y-2">
              <label className="text-sm font-medium">Precio</label>
              <Input
                name="price"
                type="number"
                step="0.01"
                defaultValue={errorState?.values.price ?? ''}
              // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
              <FieldError errors={errorState?.errors?.price} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cantidad</label>
              <Input
                name="stock"
                type="number"
                defaultValue={errorState?.values.stock ?? ''}
              // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
              <FieldError errors={errorState?.errors?.stock} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Descuento (%)</label>
              <Input
                name="discount"
                type="number"
                defaultValue={errorState?.values.discount ?? ''}
              // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
              />
              <FieldError errors={errorState?.errors?.discount} />

            </div>

          </div>

          {/* CATEGORÍA / SUBCATEGORÍA */}
          <div className="flex gap-10">

            <div className="w-[45%] space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full border-0 border-b rounded-none px-0 focus:ring-0">
                  <SelectValue placeholder="Seleccione categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem
                      key={cat.category_id}
                      value={cat.category_id.toString()}
                    >
                      {cat.category_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="category" value={selectedCategory} />
              <FieldError errors={errorState?.errors?.category} />
            </div>


            <div className="w-[45%] space-y-2">
              <label className="text-sm font-medium">Subcategoría</label>
              <Select
                value={selectedSubcategory}
                onValueChange={setSelectedSubcategory}
                disabled={!availableSubcategories.length}
              >
                <SelectTrigger className="w-full border-0 border-b rounded-none px-0 focus:ring-0">
                  <SelectValue placeholder="Seleccione subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map(sub => (
                    <SelectItem
                      key={sub.subcategory_id}
                      value={sub.subcategory_id.toString()}
                    >
                      {sub.subcategory_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                name="subcategory"
                value={selectedSubcategory}
              />
              <FieldError errors={errorState?.errors?.subcategory} />
            </div>

          </div>

          {/* ESPECIFICACIONES */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Especificaciones</h2>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addSpecification}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            </div>

            {specifications.map((spec, index) => (
              <div
                key={index}
                className="grid gap-6 md:grid-cols-[1fr_1fr_auto]"
              >
                <Input
                  placeholder="Nombre"
                  value={spec.label}
                  onChange={(e) =>
                    updateSpecification(index, 'label', e.target.value)
                  }
                // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                />

                <Input
                  placeholder="Valor"
                  value={spec.value}
                  onChange={(e) =>
                    updateSpecification(index, 'value', e.target.value)
                  }
                // className="border-0 border-b rounded-none px-0 focus-visible:ring-0"
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  disabled={specifications.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

        </div>

        {/* ================= SECCIÓN DE IMAGEN ================= */}

        <div className="space-y-4">
          <label className="text-sm font-medium">Imagen del Producto</label>

          {/* Inputs ocultos para el Server Action */}
          {/* <input type="hidden" name="image_url" value={imageUrl} />
          <input type="hidden" name="image_public_id" value={imagePublic_id} /> */}

          <input
            type="hidden"
            name="images"
            value={JSON.stringify(images)}
          />


          {/* Contenedor de Previsualización */}
          <div className="aspect-square overflow-hidden rounded-md border bg-muted flex items-center justify-center relative">
            {imageUrl ? (
              <CldImage
                width="800"
                height="800"
                // Si podés, pasale el public_id que guardaste en el estado
                src={imageUrl}
                alt="Preview del producto"
                className="h-full w-full object-cover"
                crop="fill"
                gravity="auto"
                tint="equalize" // Opcional: mejora un poco el contraste de fotos caseras
                format="avif"   // AVIF es incluso más liviano que WebP para web modernas
                quality="auto:good" // Balance perfecto entre peso y detalle
              />
            ) : (
              <div className="text-sm text-muted-foreground text-center p-4">
                No hay imagen seleccionada
              </div>
            )}
          </div>

          {/* Widget de Cloudinary - MODO UNSIGNED */}
          <CldUploadWidget
            uploadPreset="shopRG_products" // Asegúrate que en Cloudinary sea UNSIGNED
            onSuccess={(result) => {
              if (typeof result.info !== 'string' && result.info?.secure_url) {

                // Lógica de limpieza: si ya había una imagen, borramos la anterior
                // if (imagePublic_id) {
                //   deleteImage(imagePublic_id);
                // }

                addImage(result.info.secure_url, result.info.public_id)
                setImageUrl(result.info.secure_url);
                // setImagePublic_id(result.info.public_id);
              }
            }}
            options={{
              maxFiles: 1,
              multiple: false,
              sources: ['local', 'url', 'camera'],
              folder: 'shopRG/products',
              clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "heic"],
              maxImageFileSize: 10000000, // 10MB

              // Las transformaciones se definen aquí para optimizar la imagen al subirla
              styles: {
                transformations: [
                  { width: 1000, height: 1000, crop: "limit", quality: "auto", format: "webp" }
                ]
              },

              // Propiedades válidas de primer nivel
              cropping: true,
              croppingAspectRatio: 1,
              showSkipCropButton: false,
              resourceType: "image",
              tags: ['temporary'],

              // Nota: singleUploadAutoResource y validate_upscale no son necesarios 
              // si ya definiste las transformaciones arriba.
            }}
          >
            {({ open }) => (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => open()}
              >
                {imageUrl ? 'Cambiar Imagen' : 'Subir Imagen'}
              </Button>
            )}
          </CldUploadWidget>

          <FieldError errors={errorState?.errors?.image} />
        </div>

      </div>

      {/* Footer */}
      <div className="flex gap-4 pt-10 border-t mt-10">
        <Link
          href="/dashboard/products"
          className="flex-1"
        >
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 text-base"
          >
            Cancelar
          </Button>
        </Link>

        <Button
          type="submit"
          className="flex-1 h-12 text-base"
        >
          Crear producto
        </Button>
      </div>
    </form>
  )
}