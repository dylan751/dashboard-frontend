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
import contactApi from '../services/contactApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Contact } from '../models/Contact';

const Contacts: React.FC = () => {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState<Contact[]>([]);

  const contactsGrid = [
    { type: 'checkbox', width: '50' },

    {
      field: 'name',
      headerText: t('contacts.name'),
      width: '100',
      textAlign: 'Center',
    },

    {
      field: 'phoneNumber',
      headerText: t('contacts.phoneNumber'),
      width: '120',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'email',
      headerText: t('contacts.email'),
      width: '150',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'title',
      headerText: t('contacts.title'),
      width: '100',
      textAlign: 'Center',
    },

    {
      field: 'description',
      headerText: t('contacts.description'),
      width: '150',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllContacts = async () => {
      const res = await contactApi.getListContacts();
      const allContacts = res.data.data.edges;
      setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('contacts.contacts')} />
      <GridComponent
        dataSource={contacts}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {contactsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Contacts;
