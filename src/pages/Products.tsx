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
  Resize,
} from '@syncfusion/ej2-react-grids';
import productApi from '../services/productApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Product } from '../models/Product';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

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
      field: 'image',
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

  const getAllProducts = async () => {
    const res = await productApi.getListProducts();
    const allProducts = res.data.data.edges;
    setData({ result: allProducts, count: allProducts.length });
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllProducts();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await productApi.addProduct(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await productApi.updateProduct(
          (state.data as Product).productId,
          state.data,
        );
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.requestType === 'delete') {
      // Delete request
      try {
        await productApi.deleteProduct(state.data[0].productId);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('products.products')} />
      <GridComponent
        id="products"
        dataSource={data}
        allowPaging={true}
        pageSettings={{ pageSize: 8 }}
        allowSorting={true}
        allowResizing={true}
        toolbar={['Add', 'Edit', 'Delete', 'Update', 'Cancel']}
        editSettings={{
          allowAdding: true,
          allowEditing: true,
          allowDeleting: true,
        }}
        dataSourceChanged={dataSourceChanged}
        dataStateChange={dataStateChange}
        width="auto"
      >
        <ColumnsDirective>
          {productsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject
          services={[Page, Toolbar, Selection, Edit, Sort, Filter, Resize]}
        />
      </GridComponent>
    </div>
  );
};

export default Products;
