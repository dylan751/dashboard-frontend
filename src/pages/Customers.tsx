import React from 'react';
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

import {
  customersData,
  customerGridImage,
  customerGridStatus,
} from '../data/dummy';
import { Header } from '../components';
import { useTranslation } from 'react-i18next';

const Customers: React.FC = () => {
  const { t } = useTranslation();

  const customersGrid = [
    { type: 'checkbox', width: '50' },
    {
      headerText: t('customers.name'),
      width: '150',
      template: customerGridImage,
      textAlign: 'Center',
    },
    {
      field: 'ProjectName',
      headerText: t('customers.projectName'),
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'Status',
      headerText: t('customers.status'),
      width: '130',
      format: 'yMd',
      textAlign: 'Center',
      template: customerGridStatus,
    },
    {
      field: 'Weeks',
      headerText: t('customers.weeks'),
      width: '100',
      format: 'C2',
      textAlign: 'Center',
    },
    {
      field: 'Budget',
      headerText: t('customers.budget'),
      width: '100',
      format: 'yMd',
      textAlign: 'Center',
    },

    {
      field: 'Location',
      headerText: t('customers.location'),
      width: '150',
      textAlign: 'Center',
    },

    {
      field: 'CustomerID',
      headerText: t('customers.customerId'),
      width: '120',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
  ];

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Customers" />
      <GridComponent
        dataSource={customersData}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Customers;
