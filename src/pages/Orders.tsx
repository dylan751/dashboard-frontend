import React from 'react';
import { Helmet } from 'react-helmet';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from '@syncfusion/ej2-react-grids';

import { gridOrderImage, gridOrderStatus, ordersData } from '../data/dummy';
import { Header } from '../components';
import { useTranslation } from 'react-i18next';

const Orders: React.FC = () => {
  const { t } = useTranslation();

  const ordersGrid = [
    {
      headerText: t('orders.image'),
      template: gridOrderImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'OrderItems',
      headerText: t('orders.item'),
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    {
      field: 'CustomerName',
      headerText: t('orders.customerName'),
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'TotalAmount',
      headerText: t('orders.totalAmount'),
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      headerText: t('orders.status'),
      template: gridOrderStatus,
      field: 'OrderItems',
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'OrderID',
      headerText: t('orders.orderId'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'Location',
      headerText: t('orders.location'),
      width: '150',
      textAlign: 'Center',
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Helmet>
        <title>Orders</title>
        <meta name="orders-description" content="Orders" />
      </Helmet>
      <Header category={t('app.page')} title={t('orders.orders')} />
      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging={true}
        allowSorting={true}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
