/**
 * Shared type definitions for the UI app.
 * This file is used to define types that are shared across multiple components or modules in the UI app.
 * It can also be used to re-export types from external libraries (e.g., Prisma) to avoid direct dependencies in other parts of the codebase.
 * This file can be extended in the future to include more types as needed, such as types for API responses, form data, etc.
 */

/**
 * Generated types imported from the backend/server Prisma schema. 
 * This allows us to use the same types in the frontend without having to redefine them, and keeps our type definitions consistent across the codebase.
 * We can also pick only the fields we need for the frontend to avoid exposing unnecessary data.
 * For example, we only pick the 'id' and 'username' fields from the PrismaUser type for the User type used in the frontend.
 * Note: We should be careful when re-exporting types from the backend to ensure that we are 
 * not exposing sensitive information or implementation details that should remain on the server side.
 * 
 * For @prisma/client to have the most current types, make sure to run `pnpm run prisma:gen` 
 * in the ui package after any changes to the Prisma schema in the server package. 
 * The script regenerates the frontend/ui Prisma client and update the types according to the backend/server schema.
 */
import type { User as PrismaUser, Patch, Session } from '@prisma/client';
export type User = Pick<PrismaUser, 'id' | 'username'>;
export type { Patch, Session };
