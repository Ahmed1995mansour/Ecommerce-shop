import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { PrimaryLoader } from '../../../components/Helpers/Loaders';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import { updateCategory, getCategory } from '../../../functions/category';

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategory = () =>
    getCategory(slug)
      .then((res) => {
        setName(res.data.name);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    updateCategory(slug, { name }, user.token)
      .then((result) => {
        setLoading(false);
        setName('');
        toast.success(`Category ${name} created !`);
        history.push('/admin/category');
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data);
      });
  };

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          {loading ? <PrimaryLoader /> : <h4>Update Category</h4>}
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            placeholder='Category Name'
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
