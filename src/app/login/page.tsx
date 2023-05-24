import { getProviders } from 'next-auth/react';
import { EmailCheck } from './_components/EmailCheck';

export default async function LoginPage() {
  const providers = await getProviders();
  console.log(providers);

  return <EmailCheck providers={providers} />;
}
