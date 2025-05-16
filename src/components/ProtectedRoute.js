// src/components/ProtectedRoute.js
import { useAuth } from '@/hook/useAuth';

export default function ProtectedRoute({ children }) {
  useAuth();
  return <>{children}</>;
}
