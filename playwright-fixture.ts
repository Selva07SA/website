import { test as baseTest, expect } from '@playwright/test';

// Re-export the base fixture from the package
// Override or extend test/expect here if needed
export const test = baseTest;
export { expect };
