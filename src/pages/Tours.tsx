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
import tourApi from '../services/tourApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Tour } from '../models/Tour';

const Tours: React.FC = () => {
  const { t } = useTranslation();
  const [tours, setTours] = useState([]);

  const tourGridImage = ({ image }: Tour) => {
    return (
      <div className="image flex justify-center">
        <img className="rounded-full w-10 h-10" src={image} alt="tour" />
      </div>
    );
  };

  const toursGrid = [
    { type: 'checkbox', width: '50' },
    {
      headerText: t('tours.image'),
      width: '100',
      template: tourGridImage,
      textAlign: 'Center',
    },

    {
      field: 'title',
      headerText: t('tours.title'),
      width: '120',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
    {
      field: 'duration',
      headerText: t('tours.duration'),
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'startTime',
      headerText: t('tours.startTime'),
      width: '100',
      textAlign: 'Center',
      format: 'yMd',
    },
    {
      field: 'rating',
      headerText: t('tours.rating'),
      width: '100',
      textAlign: 'Center',
    },

    {
      field: 'hotel',
      headerText: t('tours.hotel'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'price',
      headerText: t('tours.price'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'vehicle',
      headerText: t('tours.vehicle'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'type',
      headerText: t('tours.type'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'numberOfPeople',
      headerText: t('tours.numberOfPeople'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'description',
      headerText: t('tours.description'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'numberOfBooking',
      headerText: t('tours.numberOfBooking'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'isTrending',
      headerText: t('tours.isTrending'),
      width: '120',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllTours = async () => {
      const res = await tourApi.getListTours();
      const allTours = res.data.data.edges;
      setTours(allTours);
    };

    getAllTours();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Tours" />
      <GridComponent
        dataSource={tours}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {toursGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Tours;
