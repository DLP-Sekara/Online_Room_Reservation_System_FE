import type { ProtectedRouteTypes } from '../types/onBoarding.interfaces';

export default function ProtectedStep({ children }: ProtectedRouteTypes) {
  //protecting logic goes here

  return children;
}
