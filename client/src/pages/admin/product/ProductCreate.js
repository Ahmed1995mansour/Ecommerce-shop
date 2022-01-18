import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { createProduct } from '../../../functions/product';
import { toast } from 'react-toastify';
import { PrimaryLoader } from '../../../components/Helpers/Loaders';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const initialState = {
  title: '',
  description: '',
  price: '',
  category: '',
  categories: [],
  subs: '',
  shipping: '',
  quantity: '',
  images: '',
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // destructure state values

  const {
    title,
    description,
    price,
    category,
    categories,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  const { user } = useSelector((state) => ({ ...state }));
  const authtoken = user.token;
  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title,
      description,
      price,
      shipping,
      quantity,
      color,
      brand,
    };
    setLoading(true);
    createProduct(product, authtoken)
      .then((res) => {
        console.log(res);

        window.alert(`"${res.data.title}" is created`);
        window.location.reload();

        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.err);
        setLoading(false);
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <PrimaryLoader /> : <h4>Create Product</h4>}
          <hr />
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label>Title</label>
              <input
                className='form-control'
                type='text'
                name='title'
                value={title}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <input
                className='form-control'
                type='text'
                name='description'
                value={description}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Price</label>
              <input
                className='form-control'
                type='number'
                name='price'
                value={price}
                onChange={handleChange}
                step={0.01}
              />
            </div>
            <div className='form-group'>
              <label>Shipping</label>
              <select
                name='shipping'
                className='form-control'
                onChange={handleChange}
              >
                <option>Select Shipping</option>
                <option value='No'>No</option>
                <option value='Yes'>Yes</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Quantity</label>
              <input
                className='form-control'
                type='number'
                name='quantity'
                value={quantity}
                onChange={handleChange}
              />
            </div>
            <div className='form-group'>
              <label>Color</label>
              <select
                name='color'
                className='form-control'
                onChange={handleChange}
              >
                <option>Select Color</option>
                {colors.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label>Brand</label>
              <select
                name='brand'
                className='form-control'
                onChange={handleChange}
              >
                <option>Select Brand</option>
                {brands.map((b, index) => (
                  <option key={index} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <button className='btn btn-info'>Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
