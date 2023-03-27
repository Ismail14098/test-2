import React, { useState } from 'react';
import AddProductInfo from '../addProductInfo';

import BarcodeInputField from '../barcodeInputField';

import './productNotFound.css';

const ProductNotFound = (props) => {
  const { location } = props;

  const [ code ] = useState(new URLSearchParams(location.search).get('code'));

    return (<div className="productNotFound__container">
      <h2 className="productDisplay__title not-found">Продукт не найден <span role="img" aria-label="crying emoji">😢</span></h2>
      <p>Штрих-код: {code} не дало никаких результатов!</p>
      <p>Вы также можете ввести штрихкод ниже и повторить попытку:</p>
      <BarcodeInputField />
      <AddProductInfo />
    </div>)
};

export default ProductNotFound;
