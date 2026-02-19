
import LoginForm from '@/components/login-form';
import AcmeLogo from '@/components/navbars/acme-logo';
import { Suspense } from 'react';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-100 flex-col space-y-2.5 p-4 md:-mt-32">
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}