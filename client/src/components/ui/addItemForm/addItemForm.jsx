import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../../../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Textfield from '../../common/form/textfield';
import validator from '../../../utils/validator';
import SelectField from '../../common/form/selectField';
import { getCategoriesList } from '../../../store/categories';
import FileField from '../../common/form/fileField';
import { toast } from 'react-toastify';
import TextAreaField from '../../common/form/textAreaField';
import Button from '../../common/button';
import furnitureService from '../../../services/furniture.service';
import { addFurniture } from '../../../store/furniture';

const AddItemForm = () => {
  const initialData = {
    index: '',
    name: '',
    quantity: '',
    price: '',
    category: '',
    picture: '',
    about: ''
  };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const categories = useSelector(getCategoriesList());
  const dispatch = useDispatch();

  useEffect(() => {
    validate();
  }, [data]);

  const fetchLastIndex = async () => {
    const { content } = await furnitureService.getLastIndex();
    const { lastIndex } = content;
    setData((prevState) => ({
      ...prevState,
      index: (Number(lastIndex) + 1).toString()
    }));
    setErrors({});
  };

  useEffect(fetchLastIndex, []);

  useEffect(() => {
    setErrors({});
  }, []);

  const validatorConfig = {
    name: {
      isRequired: { message: 'Please fill in this input' },
      min: { message: 'Should be at least 3 symbols length', value: 3 }
    },
    price: {
      isRequired: { message: 'Please fill in this input' },
      isNumber: { message: 'Should be the number' }
    },
    quantity: {
      isRequired: { message: 'Please fill in this input' },
      isInteger: { message: 'Should be the integer number' }
    },
    category: {
      isRequired: { message: 'Please select a category' }
    },
    about: {
      isRequired: { message: 'Please fill in this input' },
      min: { message: 'Should be at least 30 symbols length', value: 30 }
    },
    picture: {
      isURL: { message: 'Please make sure url is valid' }
    }
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = ({ name, value }) => {
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUploadPicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const imageRef = ref(storage, `/furniture_pictures/pic_${data.index}`);
      await uploadBytes(imageRef, file);
      const imageURL = await getDownloadURL(imageRef);
      setData((prevState) => ({ ...prevState, picture: imageURL }));
    } catch (e) {
      toast(e.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) return;
    dispatch(addFurniture(data));
    setData({ ...initialData, index: Number(data.index) + 1 });
  };

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <h2 className="mb-2">Add new item</h2>
      <Textfield
        name="index"
        label="Catalog #"
        value={data.index}
        onChange={handleChange}
        error={errors.index}
        disabled={true}
      />
      <Textfield
        name="name"
        label="Name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <SelectField
        name="category"
        label="Category"
        options={categories}
        onChange={handleChange}
        value={data.category}
        error={errors.category}
      />
      <Textfield
        name="price"
        label="Price"
        value={data.price}
        onChange={handleChange}
        error={errors.price}
      />
      <Textfield
        name="quantity"
        label="Quantity"
        value={data.quantity}
        onChange={handleChange}
        error={errors.quantity}
      />
      <div className="mb-2">
        <Textfield
          name="picture"
          label="Picture link"
          value={data.picture}
          error={errors.picture}
          onChange={handleChange}
        />
      </div>
      <div className="mb-2">
        <FileField
          size="flex-lg"
          label="Upload picture"
          onChange={handleUploadPicture}
          type="button"
        />
      </div>
      <TextAreaField
        label="About"
        name="about"
        value={data.about}
        onChange={handleChange}
        error={errors.about}
        rows={6}
        placeholder="Description here"
      />
      <Button
        size="flex-lg"
        content="Add item"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default AddItemForm;
