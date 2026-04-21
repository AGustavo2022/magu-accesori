"use server"

import cloudinary from "./cloudinary"



export async function uploadImage(file: File) {

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const result: any = await new Promise((resolve, reject) => {

    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    )

    stream.end(buffer)
  })

  return result
}

export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result; // Devuelve { result: 'ok' } si se borró bien
  } catch (error) {
    console.error("Error al eliminar en Cloudinary:", error);
    throw new Error("No se pudo eliminar la imagen antigua");
  }
}