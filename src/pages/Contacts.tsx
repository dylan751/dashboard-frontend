import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
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
import contactApi from '../services/contactApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Contact } from '../models/Contact';

const Contacts: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

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

  const getAllContacts = async () => {
    const res = await contactApi.getListContacts();
    const allContacts = res.data.data.edges;
    setData({ result: allContacts, count: allContacts.length });
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllContacts();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await contactApi.addContact(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await contactApi.updateContact(
          (state.data as Contact).contactId,
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
        await contactApi.deleteContact(state.data[0].contactId);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Helmet>
        <title>Contacts</title>
        <meta name="contacts-description" content="Contacts" />
      </Helmet>
      <Header category={t('app.page')} title={t('contacts.contacts')} />
      <GridComponent
        id="contacts"
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
          {contactsGrid.map((item, index) => (
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

export default Contacts;
