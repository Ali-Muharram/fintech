import Link from 'next/link';
import { LoginForm } from './_components/login-form';
import { Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex size-6 items-center justify-center rounded-md bg-foreground text-background">
              <Shield className="size-4" />
            </div>
            ORVIS
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative rounded-lg overflow-hidden hidden m-5 lg:block">
        <img
          src="/images/login.jpg"
          alt="Login Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
