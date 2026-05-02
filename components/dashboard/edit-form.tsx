'use client';

import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { updateProduct } from '@/lib/actions/product.actions';
import { UpdateProductState } from '@/lib/types/product.types';
import { EditProductFormProps, Subcategory } from '@/lib/types/definitions';
import { getCategoryIdByName, getSubcategoryIdByName } from '@/lib/utils';
import { deleteImage } from '@/lib/cloudinary/upload-image';

type Specification = {
  label: string;
  value: string;
};

type ProductImage = {
  image_url: string;
  publicId: string;
};

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  
  /* -------------------- STATE -------------------- */

  const initialState: UpdateProductState = {
    success: true,
    message: null,
  };

  const [state, formAction] = useActionState(
    updateProduct.bind(null, product.id),
    initialState
  );

  const errorState = !state.success ? state : null;

  // Lógica de Categorías
  const initialCategoryId = getCategoryIdByName(product.category, categories) ?? '';
  const initialSubcategoryId = getSubcategoryIdByName(product.subcategory, categories) ?? '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId);
  const [availableSubcategories, setAvailableSubcategories] = useState<Subcategory[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(initialSubcategoryId);

  // Estado e Imágenes
  const [status, setStatus] = useState<boolean>(product.status);
  const [images, setImages] = useState<ProductImage[]>(product.image || []);
  const [imageUrl, setImageUrl] = useState(product.image?.[0]?.image_url || '');

  // Especificaciones
  const [specifications, setSpecifications] = useState<Specification[]>(() => {
    // Si el producto ya tiene especificaciones, las usamos, si no, empezamos con una vacía
    if (product.specifications && product.specifications.length > 0) return product.specifications;
    return [{ label: '', value: '' }];
  });

  /* -------------------- EFFECTS -------------------- */

  useEffect(() => {
    const categoryId = Number(selectedCategory);
    const category = categories.find(c => c.category_id === categoryId);
    setAvailableSubcategories(category?.subcategories ?? []);
  }, [selectedCategory, categories]);

  /* -------------------- HANDLERS -------------------- */

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategory('');
  };

  const addSpecification = () => {
    setSpecifications(prev => [...prev, { label: '', value: '' }]);
  };

  const removeSpecification = (index: number) => {
    setSpecifications(prev => prev.filter((_, i) => i !== index));
  };

  const updateSpecField = (index: number, field: 'label' | 'value', value: string) => {
    setSpecifications(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const addImage = (url: string, pId: string) => {
    setImages([{ image_url: url, publicId: pId }]);
    setImageUrl(url);
  };

  const removeImage = async () => {
    if (images[0]?.publicId) {
      await deleteImage(images[0].publicId).catch(console.error);
    }
    setImages([]);
    setImageUrl('');
  };

  const FieldError = ({ errors }: { errors?: string[] }) => {
    if (!errors || errors.length === 0) return null;
    return <p className="text-sm text-red-500 mt-1">{errors[0]}</p>;
  };

  /* -------------------- RENDER -------------------- */

  return (
    <form action={formAction} className="bg-gray-50 rounded-xl p-8 mx-auto my-12 max-w-6xl space-y-12">
      
      {/* Inputs ocultos para enviar al Server Action */}
      <input type="hidden" name="status" value={status ? 'true' : 'false'} />
      <input type="hidden" name="images" value={JSON.stringify(images)} />
      <input type="hidden" name="specifications" value={JSON.stringify(
        specifications.filter(s => s.label.trim() !== '' && s.value.trim() !== '')
      )} />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Editar producto</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">{status ? 'Activo' : 'Inactivo'}</span>
          <Switch checked={status} onCheckedChange={setStatus} />
        </div>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        {/* ================= CONTENIDO PRINCIPAL ================= */}
        <div className="lg:col-span-2 space-y-10">
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input name="title" defaultValue={product.title} />
            <FieldError errors={errorState?.errors?.title} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción corta</label>
            <Textarea name="shortDescription" rows={2} maxLength={150} defaultValue={product.short_description} />
            <FieldError errors={errorState?.errors?.shortDescription} />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción larga</label>
            <Textarea name="longDescription" rows={4} maxLength={300} defaultValue={product.long_description} />
            <FieldError errors={errorState?.errors?.longDescription} />
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-medium">Precio</label>
              <Input name="price" type="number" step="0.01" defaultValue={product.price} />
              <FieldError errors={errorState?.errors?.price} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Cantidad</label>
              <Input name="stock" type="number" defaultValue={product.stock} />
              <FieldError errors={errorState?.errors?.stock} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descuento (%)</label>
              <Input name="discount" type="number" defaultValue={product.discount} />
              <FieldError errors={errorState?.errors?.discount} />
            </div>
          </div>

          <div className="flex gap-10">
            <div className="w-[45%] space-y-2">
              <label className="text-sm font-medium">Categoría</label>
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.category_id} value={cat.category_id.toString()}>
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
              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory} disabled={!availableSubcategories.length}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccione subcategoría" />
                </SelectTrigger>
                <SelectContent>
                  {availableSubcategories.map(sub => (
                    <SelectItem key={sub.subcategory_id} value={sub.subcategory_id.toString()}>
                      {sub.subcategory_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="subcategory" value={selectedSubcategory} />
              <FieldError errors={errorState?.errors?.subcategory} />
            </div>
          </div>

          {/* ESPECIFICACIONES (NUEVO EN EDICIÓN) */}
          <div className="space-y-4 pt-6 border-t">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Especificaciones</h2>
              <Button type="button" variant="ghost" size="sm" onClick={addSpecification}>
                <Plus className="mr-2 h-4 w-4" /> Agregar
              </Button>
            </div>
            {specifications.map((spec, index) => (
              <div key={index} className="grid gap-6 md:grid-cols-[1fr_1fr_auto]">
                <Input placeholder="Nombre (ej: Material)" value={spec.label} onChange={(e) => updateSpecField(index, 'label', e.target.value)} />
                <Input placeholder="Valor (ej: Cuero)" value={spec.value} onChange={(e) => updateSpecField(index, 'value', e.target.value)} />
                <Button type="button" variant="ghost" size="icon" onClick={() => removeSpecification(index)} disabled={specifications.length === 1}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECCIÓN IMAGEN ================= */}
        <div className="space-y-4">
          <label className="text-sm font-medium">Imagen del producto</label>
          <div className="aspect-square overflow-hidden rounded-md border bg-muted flex items-center justify-center relative">
            {imageUrl ? (
              <CldImage
                width="800"
                height="800"
                src={imageUrl}
                alt="Vista previa"
                className="h-full w-full object-cover"
                crop="fill"
              />
            ) : (
              <div className="text-sm text-muted-foreground">Sin imagen seleccionada</div>
            )}
          </div>

          <CldUploadWidget
            uploadPreset="shopRG_products"
            onSuccess={(result) => {
              if (typeof result.info !== 'string' && result.info?.secure_url) {
                addImage(result.info.secure_url, result.info.public_id);
              }
            }}
            options={{ maxFiles: 1, folder: 'shopRG/products', cropping: true, croppingAspectRatio: 1 }}
          >
            {({ open }) => (
              <Button type="button" variant="outline" className="w-full" onClick={() => open()}>
                {imageUrl ? 'Cambiar Imagen' : 'Subir Imagen'}
              </Button>
            )}
          </CldUploadWidget>
          <FieldError errors={errorState?.errors?.image} />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-4 pt-10 border-t mt-10">
        <Link href="/dashboard/products" className="flex-1">
          <Button type="button" variant="outline" className="w-full h-12 text-base">Cancelar</Button>
        </Link>
        <Button type="submit" className="flex-1 h-12 text-base">Guardar Cambios</Button>
      </div>
    </form>
  );
}