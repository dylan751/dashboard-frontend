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
import bookingFormApi from '../services/bookingFormApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { BookingForm } from '../models/BookingForm';

const BookingForms: React.FC = () => {
  const { t } = useTranslation();
  const [bookingForm, setBookingForms] = useState<BookingForm[]>([]);

  const bookingFormsGrid = [
    { type: 'checkbox', width: '50' },

    {
      field: 'userId',
      headerText: t('bookingForm.userId'),
      width: '120',
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
      field: 'email',
      headerText: t('bookingForm.email'),
      width: '100',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'tourId',
      headerText: t('bookingForm.tourId'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'rating',
      headerText: t('bookingForm.rating'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'content',
      headerText: t('bookingForm.content'),
      width: '120',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllBookingForms = async () => {
      const res = await bookingFormApi.getListBookingForms();
      const allBookingForms = res.data.data.edges;
      setBookingForms(allBookingForms);
    };

    getAllBookingForms();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')}title={t('bookingForm.bookingForm')}/>
      <GridComponent
        dataSource={bookingForm}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {bookingFormsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default BookingForms;
