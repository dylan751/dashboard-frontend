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
import bookingFormApi from '../services/bookingFormApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { BookingForm } from '../models/BookingForm';

const BookingForms: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

  const bookingFormsGrid = [
    { type: 'checkbox', width: '50' },

    {
      field: 'tourId',
      headerText: t('bookingForm.tourId'),
      width: '70',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
    {
      field: 'name',
      headerText: t('bookingForm.name'),
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'phoneNumber',
      headerText: t('bookingForm.phoneNumber'),
      width: '100',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'email',
      headerText: t('bookingForm.email'),
      width: '150',
      textAlign: 'Center',
    },

    {
      field: 'numberOfPeople',
      headerText: t('bookingForm.numberOfPeople'),
      width: '80',
      textAlign: 'Center',
    },

    {
      field: 'startTime',
      headerText: t('bookingForm.startTime'),
      width: '80',
      textAlign: 'Center',
    },

    {
      field: 'endTime',
      headerText: t('bookingForm.endTime'),
      width: '80',
      textAlign: 'Center',
    },
  ];

  const getAllBookingForms = async () => {
    const res = await bookingFormApi.getListBookingForms();
    const allBookingForms = res.data.data.edges;
    setData({ result: allBookingForms, count: allBookingForms.length });
  };

  useEffect(() => {
    getAllBookingForms();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllBookingForms();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await bookingFormApi.addBookingForm(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await bookingFormApi.updateBookingForm(
          (state.data as BookingForm).formId,
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
        await bookingFormApi.deleteBookingForm(state.data[0].formId);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('bookingForm.bookingForm')} />
      <GridComponent
        id="booking-form"
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
          {bookingFormsGrid.map((item, index) => (
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

export default BookingForms;
