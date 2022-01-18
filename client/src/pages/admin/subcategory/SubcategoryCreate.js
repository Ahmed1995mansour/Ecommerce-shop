import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { PrimaryLoader } from '../../../components/Helpers/Loaders';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getCategories } from '../../../functions/category';
import {
  createSubcategory,
  getSubcategories,
  removeSubcategory,
} from '../../../functions/subcategory';
import LocalSerach from '../../../components/forms/LocalSearch';

const SubcategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  const loadSubcategories = () => {
    getSubcategories()
      .then((res) => {
        setSubcategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCategories = () =>
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubcategory({ name, parent: category }, user.token)
      .then((result) => {
        loadSubcategories();
        setLoading(false);
        setName('');
        toast.success(`Category ${name} created !`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  const handleRemove = (slug) => {
    if (window.confirm('Are you sure you want to delete ?')) {
      removeSubcategory(slug, user.token)
        .then((res) => {
          toast.success(`Category ${res.data.name} Deleted`);
          loadSubcategories();
        })
        .catch((err) => {
          console.log(err);
          toast.error('Removing Operation Failed');
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <PrimaryLoader /> : <h4>Create Subcategory</h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            placeholder='Subcategory Name'
          />

          <div className='form-group'>
            <label>Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please select category</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <LocalSerach keyword={keyword} setKeyword={setKeyword} />

          {subcategories.filter(searched(keyword)).map((sub) => (
            <div key={sub._id} className='alert alert-secondary'>
              {sub.name}
              <span
                onClick={() => handleRemove(sub.slug)}
                className='btn btn-light p-1 m-0 ml-2 float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/subcategory/${sub.slug}`}>
                <span className='btn btn-light p-1 m-0 float-right'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubcategoryCreate;
