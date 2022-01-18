import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { PrimaryLoader } from '../../../components/Helpers/Loaders';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/forms/CategoryForm';
import { getCategories } from '../../../functions/category';
import {
  updateSubcategory,
  getSubcategory,
} from '../../../functions/subcategory';

const SubcategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parent, setParent] = useState('');
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadCategories();
    loadSubcategory();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategories = () =>
    getCategories()
      .then((res) => {
        setCategories(res.data);
        setParent(res.data.parent);
      })
      .catch((err) => console.log(err));

  const loadSubcategory = () =>
    getSubcategory(slug)
      .then((res) => {
        setName(res.data.name);
        setParent(res.data.parent);
      })
      .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubcategory(slug, { name, parent }, user.token)
      .then((result) => {
        setLoading(false);
        setName('');
        toast.success(`Subcategory ${name} Updated !`);
        history.push('/admin/subcategory');
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
          {loading ? <PrimaryLoader /> : <h4>Update Subcategory</h4>}

          <div className='form-group'>
            <label>Parent Category</label>
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
              value={parent}
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
          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            placeholder='Subcategory Name'
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default SubcategoryUpdate;
