import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { PrimaryLoader } from '../../../components/Helpers/Loaders';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CategoryForm from '../../../components/forms/CategoryForm';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category';
import LocalSerach from '../../../components/forms/LocalSearch';

const CategoryCreate = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState('');
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((result) => {
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          loadCategories();
          toast.success(`Category ${res.data.name} Deleted`);
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
          {loading ? <PrimaryLoader /> : <h4>Create Category</h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            placeholder='Category Name'
          />

          <LocalSerach keyword={keyword} setKeyword={setKeyword} />

          {categories.filter(searched(keyword)).map((cat) => (
            <div key={cat._id} className='alert alert-secondary'>
              {cat.name}
              <span
                onClick={() => handleRemove(cat.slug)}
                className='btn btn-light p-1 m-0 ml-2 float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${cat.slug}`}>
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

export default CategoryCreate;
