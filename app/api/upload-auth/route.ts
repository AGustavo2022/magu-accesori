import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { auth } from "@/auth"; // Tu lógica de sesión (Auth.js / Kinde)

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request: Request) {
  // 1. VALIDACIÓN DE USUARIO (Fundamental para producción)
//   const session = await auth();
//   if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });



  const body = await request.json();
  const { paramsToSign } = body;

  // 2. GENERAR FIRMA (Seguridad)
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET!
  );

return NextResponse.json({ 
  signature,
  timestamp: paramsToSign.timestamp,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY // También debe devolverse aquí
})
}