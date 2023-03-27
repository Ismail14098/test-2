import React from 'react';

const DietaryData = (product) => {
  const displayDietaryDataItem = (condition) => {
    let content;

    if (condition === undefined) {
      content = 'Unknown ❓';
    } else {
      content = condition ? 'Yes' : 'No';
    }

    return (<span className="productDisplay__list--value">
      {content}
    </span>)
  }

  return (<div className="productDisplay__section">
    <h3 className="productDisplay__sectionTitle">Special Diets</h3>
    <div className="productDisplay__list--item">
      <span><span role="img" aria-label="plant">🌱</span> Растительная основа:</span>
      {displayDietaryDataItem(product.product.isPlantBased())}
    </div>
    <div className="productDisplay__list--item">
      <span><span role="img" aria-label="wheat">🌾</span> Глютен:</span>
      {displayDietaryDataItem(product.product.containsGluten())}
    </div>
    <div className="productDisplay__list--item">
      <span><span role="img" aria-label="cow">🐄</span> Лактоза:</span>
      {displayDietaryDataItem(product.product.containsLactose())}
    </div>
    <div className="productDisplay__list--item">
      <span><span role="img" aria-label="warning">⚠️</span> Пальмовое масло:</span>
      {displayDietaryDataItem(product.product.containsPalmOil())}
    </div>
  </div>);
};

export default DietaryData;
