import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData as useLoaderDataDD } from 'react-router-dom'

export const useLoaderData = useLoaderDataDD as <T = any>(
  ...args: any[]
) => T extends (args: LoaderFunctionArgs) => infer TFunc ? Awaited<TFunc> : T
