
import { Box, Pagination } from '@mui/material'

export default function PaginationNav({ totalPage, page, setPage, inUrl = false }) {


    const handlePageChange = (event, newPage) => {
        const currentUrl = new URL(window.location.href);
        const queryParams = new URLSearchParams(currentUrl.search);
    
        // Set the new page query parameter
        queryParams.set('page', newPage);
    
        // Reconstruct the URL with the updated query parameters
        const newUrl = `${currentUrl.pathname}?${queryParams.toString()}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    
        // Update the page state
        setPage(newPage);
    };
    


    return (
        <>
            <div className="pagination">
                <Box>
                    <Pagination onChange={handlePageChange} count={totalPage} page={page} color="primary" size="large" />
                </Box>
            </div>
        </>


    )
}
