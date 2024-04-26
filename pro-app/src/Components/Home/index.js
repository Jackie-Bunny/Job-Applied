import React, { useState, useEffect } from 'react';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [searchProducts, setSearchProducts] = useState([]);
    const [query, setQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAllProducts();
    }, [currentPage]); // Update fetchAllProducts when currentPage changes

    const fetchAllProducts = () => {
        fetch(`http://127.0.0.1:8000/api/products?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.status === 'success') {
                    setAllProducts(data.data);
                } else {
                    console.error('Error retrieving products:', data.message);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchSearchProducts = () => {
        fetch(`http://127.0.0.1:8000/api/products/search/${query}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.status === 'success') {
                    setSearchProducts(data.data);
                } else {
                    console.error('Error retrieving search products:', data.message);
                }
            })
            .catch(error => console.error('Error fetching search data:', error));
    };

    const handleSearchChange = (e) => {
        setQuery(e.target.value);
        fetchSearchProducts();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mt-5">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control mb-3"
                    placeholder="Search Product.."
                    value={query}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="container mt-5">
                <h3>All Products</h3>
                <table className="table mt-3 table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>$ {product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                        </li>
                        <li className={`page-item ${currentPage === 5 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </nav>
            </div>
            {query.trim() !== '' && (
                <div className="container mt-5">
                    <h3>Search Results</h3>
                    <table className="table mt-3 table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchProducts.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>$ {product.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;
