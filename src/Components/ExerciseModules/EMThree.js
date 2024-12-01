/*
Question: Create a React application to display a paginated list of posts.

Requirements:
1. The application should:
   - Display a list of posts with each post containing an ID, title, and description.
   - Paginate the posts with user-configurable chunk sizes.

2. Pagination functionality:
   - Allow users to choose the number of posts displayed per page (e.g., 5 or 10).
   - Provide "Previous" and "Next" buttons to navigate between pages.
   - Disable navigation buttons appropriately when the user is on the first or last page.

3. Data handling:
   - Use a fixed set of dummy posts with unique IDs, titles, and descriptions.
   - Dynamically calculate and display the posts for the current page based on the selected chunk size and page number.

4. Display:
   - Ensure a clear and organized layout for the posts and pagination controls.
   - Provide a responsive and user-friendly interface for navigation.
*/

import React, { useState, useMemo } from 'react';
import '../../styles/ExerciseModules/EMThree.css';

const PostCard = React.memo(({post}) => {
    return (
        <div className="post-card-container">
            <div>{post.title}</div>
            <div>{post.id}</div>
            <div>{post.description}</div>
        </div>
    );
})

const dummyPostsfromBE = [
    {
        id: 1,
        title: 'love quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 2,
        title: 'epsum quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: 3,
        title: 'god quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 4,
        title: 'coder quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: 5,
        title: 'docker quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 6,
        title: 'k8s quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: 7,
        title: 'trivy quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 8,
        title: 'amazon quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: 9,
        title: 'jungle quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 10,
        title: 'python quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },
    {
        id: 11,
        title: 'chicken quotes',
        description: 'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...'
    },
    {
        id: 12,
        title: 'egg quotes',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'
    },

]

const EMThree = () => {
    let [postsData, setPostsData] = useState(dummyPostsfromBE);
    let [chunkSize, setChunkSize] = useState(5);
    let [pageNo, setPageNo] = useState(1);
    let filteredData = useMemo(() =>{ 
        console.log('creating chunk...', 'pageNo:', pageNo, 'chunkSize:', chunkSize);
        let start = chunkSize*(pageNo - 1);
        let end = start + chunkSize;
        console.log('slicing from...',  start, ' to ', end)
        return postsData.slice( start, end);
        }, [chunkSize, pageNo])
    
    return (
        <div className='page-container'>
            <header>Sata</header>
            <div className='posts-container'>
                {filteredData.map((post) => <PostCard post={post}></PostCard>)}
            </div>
            <div className='page-handler-functions'>
                <select onChange={(e) => setChunkSize(Number(e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <button disabled={pageNo===1} onClick={() => setPageNo((prev) => prev-1)}>Previous</button>
                <button disabled={pageNo == Math.ceil(postsData.length / chunkSize)} onClick={() => setPageNo((prev) => prev+1)}>Next</button>
                {/* disabled={pageNo < (postsData.length / chunkSize) -1} */}
            </div>
        </div>
    );
}

export default EMThree;