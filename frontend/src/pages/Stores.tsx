import React from 'react';
import { ShoppingBag, Tag, PlusCircle, Search } from 'lucide-react';

const products = [
    { id: 1, name: 'Pro Soccer Ball', price: 45.00, category: 'Equipment', image: '⚽' },
    { id: 2, name: 'Elite Running Shoes', price: 120.00, category: 'Footwear', image: '👟' },
    { id: 3, name: 'Performance Jersey', price: 55.00, category: 'Apparel', image: '👕' },
    { id: 4, name: 'Digital Stopwatch', price: 25.00, category: 'Accessories', image: '⏱️' },
    { id: 5, name: 'Heavy Duty Kettlebell', price: 65.00, category: 'Fitness', image: '🏋️' },
    { id: 6, name: 'Training Cones (Set of 10)', price: 15.00, category: 'Training', image: '⛽' },
];

const Stores: React.FC = () => {
    return (
        <div className="stores-container">
            <header className="stores-header">
                <div className="header-left">
                    <h2 className="title">Council Store</h2>
                    <p className="subtitle">Official sports equipment and apparel</p>
                </div>
                <div className="search-bar">
                    <Search size={18} />
                    <input type="text" placeholder="Search products..." />
                </div>
            </header>

            <div className="category-filters">
                <button className="filter-btn active">All Items</button>
                <button className="filter-btn">Equipment</button>
                <button className="filter-btn">Apparel</button>
                <button className="filter-btn">Accessories</button>
            </div>

            <div className="product-grid">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            <span role="img" aria-label={product.name}>{product.image}</span>
                        </div>
                        <div className="product-info">
                            <span className="product-category"><Tag size={12} /> {product.category}</span>
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-footer">
                                <span className="product-price">${product.price.toFixed(2)}</span>
                                <button className="add-btn">
                                    <ShoppingBag size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Add Section */}
            <div className="quick-add-banner">
                <div className="banner-content">
                    <h3>Got Gear to List?</h3>
                    <p>Sports Council members can add new items to the store.</p>
                </div>
                <button className="banner-btn">
                    <PlusCircle size={20} /> List New Product
                </button>
            </div>

            <style>{`
        .stores-container {
          padding: 20px 0;
          color: #fff;
          font-family: 'Inter', sans-serif;
        }

        .stores-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 40px;
          gap: 20px;
        }

        .stores-header .title {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .stores-header .subtitle {
          color: #8892b0;
        }

        .search-bar {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10px 15px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          width: 300px;
        }

        .search-bar input {
          background: transparent;
          border: none;
          color: #fff;
          outline: none;
          width: 100%;
        }

        .category-filters {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #8892b0;
          padding: 8px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .filter-btn.active, .filter-btn:hover {
          background: rgba(0, 242, 255, 0.1);
          color: #00f2ff;
          border-color: rgba(0, 242, 255, 0.2);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .product-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 242, 255, 0.2);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .product-image {
          height: 200px;
          background: rgba(255, 255, 255, 0.01);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 80px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .product-info {
          padding: 20px;
        }

        .product-category {
          color: #00f2ff;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-bottom: 10px;
        }

        .product-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 1.25rem;
          font-weight: 800;
          color: #fff;
        }

        .add-btn {
          background: #00f2ff;
          color: #000;
          border: none;
          padding: 10px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .add-btn:hover {
          background: #33f5ff;
          transform: scale(1.1);
        }

        .quick-add-banner {
          background: linear-gradient(90deg, rgba(0, 242, 255, 0.1) 0%, rgba(0, 242, 255, 0.02) 100%);
          border: 1px solid rgba(0, 242, 255, 0.1);
          padding: 30px;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 30px;
        }

        .banner-content h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .banner-content p {
          color: #8892b0;
        }

        .banner-btn {
          background: transparent;
          border: 1px solid #00f2ff;
          color: #00f2ff;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .banner-btn:hover {
          background: #00f2ff;
          color: #000;
        }

        @media (max-width: 768px) {
          .stores-header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .search-bar {
            width: 100%;
          }

          .quick-add-banner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </div>
    );
};

export default Stores;
