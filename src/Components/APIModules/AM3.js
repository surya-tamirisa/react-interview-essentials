/** TO BE COMPLETED */
/** TO BE COMPLETED */
/** TO BE COMPLETED */


/**
 * Paginated Search Component
 * 
 * Problem Statement:
 * Create a React component that:
 * 1. Includes an input field for typing a search term.
 * 2. Fetches paginated results from the GitHub Users API based on the search term.
 * 3. Displays the list of users (username and profile image) returned from the API.
 * 4. Adds pagination controls (Next and Previous buttons) to navigate through pages of results.
 * 5. Displays appropriate messages for:
 *    - "Loading..." when the API call is in progress.
 *    - "No results found." when no data is returned.
 *    - "Error occurred." when the API call fails.
 * 
 * API Details:
 * - Base URL: https://api.github.com/search/users
 * - Query Parameters:
 *    - q: Search term (e.g., q=charles)
 *    - page: Page number (default is 1)
 *    - per_page: Number of results per page (set to 5 for simplicity)
 * - Example: https://api.github.com/search/users?q=charles&page=1&per_page=5
 * 
 * Requirements:
 * 1. Use `useEffect` to handle the API call with debouncing.
 * 2. Implement pagination controls ("Next" and "Previous" buttons).
 * 3. Manage the following states:
 *    - Loading state when the API call is ongoing.
 *    - Error state when the API call fails.
 *    - List of users fetched from the API.
 * 4. Handle edge cases:
 *    - Disable "Previous" button on the first page.
 *    - Disable "Next" button when there are fewer than 5 results.
 * 
 * Expected Behavior:
 * 1. Typing a search term fetches paginated results (5 users per page).
 * 2. Clicking "Next" or "Previous" fetches the corresponding page of results.
 * 3. If no results are found, display "No results found."
 * 4. Display the username and avatar for each user in the results.
 */

/** TO BE COMPLETED */
/** TO BE COMPLETED */
/** TO BE COMPLETED */

import React, { useEffect, useRef, useState } from 'react'

const GITHUB_API = 'https://api.github.com/search/users';

function AM3() {
    const [searchTerm, setSearchTerm] = useState('');
    const timerRef = useRef(null);
    const [curPage, setCurPage] = useState(1);

    useEffect(() => {
        if(searchTerm){
            timerRef.current = setTimeout(() => {
                const url = new URL(GITHUB_API);
                url.search = new URLSearchParams({
                    q: searchTerm,
                    page: curPage,
                    per_page: 5
                })
                fetch(url)
                    .then((res) => {
                        if(res.ok){
                            return res.json();
                        }
                    })
                    .then((data) => {
                        console.log(data);
                    })
            }, 1000)
        }
        return () => {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, [searchTerm])
    return (
        <div>
            <label>Enter github username to search:</label><input></input>
            {/** list logic */}
            <div>displaying: </div>
            <button>Prev</button>
            <button>Next</button>
        </div>
    )
}

export default AM3

/** TO BE COMPLETED */
/** TO BE COMPLETED */
/** TO BE COMPLETED */

