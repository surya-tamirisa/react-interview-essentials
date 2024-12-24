/**
 * React Counter with Local Storage
 * 
 * Problem Statement:
 * Create a React component that:
 * 1. Displays a counter on the screen.
 * 2. Includes two buttons:
 *    - Increment: Increases the counter by 1.
 *    - Reset: Resets the counter to 0.
 * 3. Stores the counter value in localStorage so that:
 *    - When the page is refreshed, the counter displays the last saved value from localStorage.
 *    - If localStorage is empty, the counter starts from 0.
 * 
 * Requirements:
 * 1. Use `useEffect` to load the counter value from localStorage when the component mounts.
 * 2. Update localStorage whenever the counter changes.
 * 3. Avoid unnecessary re-renders.
 * 
 * Bonus:
 * 1. Add a button to "Clear Local Storage," which resets both the counter and localStorage.
 * 
 * Expected Behavior:
 * 1. Clicking "Increment" increases the counter by 1 and updates localStorage.
 * 2. Clicking "Reset" sets the counter to 0 and updates localStorage.
 * 3. Refreshing the page retains the last counter value from localStorage.
 */
