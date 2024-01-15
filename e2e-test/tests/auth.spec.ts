import { test, expect } from '@playwright/test'

const UI_URL = 'http://localhost:5173/' // Update with your actual URL

test('should allow user to sign in', async ({ page }) => {
  await page.goto(UI_URL)

  // Navigate to the login page
  await page.click('text=Sign In')

  // Wait for the login form to be visible
  await page.waitForSelector('form')

  // Fill in the login form
  await page.fill('[name=email]', 'user@example.com')
  await page.fill('[name=password]', 'password123')

  // Submit the form
  await page.click('button:has-text("Login")')

  // Wait for the success message to be visible
  await expect(page.locator('text=Login Successful')).toBeVisible()

  // Wait for navigation to the home page
  await page.waitForURL(UI_URL)
})
const generateUniqueEmail = () => {
  const timestamp = new Date().getTime()
  return `user_${timestamp}@example.com`
}

test('should allow user to register', async ({ page }) => {
  await page.goto(UI_URL)

  await page.getByRole('link', { name: 'Sign In' }).click()
  await page.getByRole('link', { name: 'Create an account here' }).click()

  await expect(
    page.getByRole('heading', { name: 'Create an Account' })
  ).toBeVisible()

  await page.locator('[name=firstName]').fill('Jimmy_test')
  await page.locator('[name=lastName]').fill('patel_test')

  const uniqueEmail = generateUniqueEmail()
  await page.locator('[name=email]').fill(uniqueEmail)

  await page.locator('[name=password]').fill('anshumi')
  await page.locator('[name=confirmPassword]').fill('anshumi')

  await page.getByRole('button', { name: 'Create Account' }).click()

  await expect(page.locator('text=Registration Success!')).toBeVisible()

  // Wait for navigation to the home page
  await page.waitForURL(UI_URL)
})
