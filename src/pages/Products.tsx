import React, { useEffect, useState } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
} from '@syncfusion/ej2-react-grids';
import productApi from '../services/productApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Product } from '../models/Product';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  const productGridImage = ({ image }: Product) => {
    return (
      <div className="image flex justify-center">
        <img className="rounded-full w-10 h-10" src={image} alt="tour" />
      </div>
    );
  };

  const productsGrid = [
    { type: 'checkbox', width: '50' },
    {
      headerText: t('products.image'),
      width: '100',
      template: productGridImage,
      textAlign: 'Center',
    },

    {
      field: 'name',
      headerText: t('products.name'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'price',
      headerText: t('products.price'),
      width: '100',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'quantity',
      headerText: t('products.quantity'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'description',
      headerText: t('products.description'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'category',
      headerText: t('products.category'),
      width: '120',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllProducts = async () => {
      const res = await productApi.getListProducts();
      const allProducts = res.data.data.edges;
      setProducts(allProducts);
    };

    getAllProducts();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('products.products')} />
      <GridComponent
        dataSource={products}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {productsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Products;
