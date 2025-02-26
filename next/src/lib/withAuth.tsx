import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/router';
import { ComponentType } from 'react';

function withAuth<P>(WrappedComponent: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { user, isLoading } = useUser();
    const router = useRouter();

    if (isLoading) return <div>Loading...</div>;

    if (!user) {
      const returnTo = router.asPath;
      router.push(`/api/auth/login?returnTo=${encodeURIComponent(returnTo)}`);
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}

export default withAuth;
