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

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import destinationApi from '../services/destinationApi';
import { Destination } from '../models/Destination';

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const [destinations, setDestinations] = useState<Destination[]>([]);

  const destinationsGridImage = ({ image }: Destination) => {
    return (
      <div className="image flex justify-center">
        <img className="rounded-full w-10 h-10" src={image} alt="destination" />
      </div>
    );
  };

  const destinationsGrid = [
    { type: 'checkbox', width: '50' },
    {
      headerText: t('destinations.image'),
      width: '80',
      template: destinationsGridImage,
      textAlign: 'Center',
    },

    {
      field: 'tourId',
      headerText: t('destinations.tourId'),
      width: '70',
      textAlign: 'Center',
      isPrimaryKey: true,
    },

    {
      field: 'name',
      headerText: t('destinations.name'),
      width: '120',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
    {
      field: 'address',
      headerText: t('destinations.address'),
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'description',
      headerText: t('destinations.description'),
      width: '150',
      textAlign: 'Center',
      format: 'yMd',
    },
    {
      field: 'content',
      headerText: t('destinations.content'),
      width: '150',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllDestinations = async () => {
      const res = await destinationApi.getListDestinations();
      const allDestinations = res.data.data.edges;
      setDestinations(allDestinations);
    };

    getAllDestinations();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('destinations.destinations')}/>
      <GridComponent
        dataSource={destinations}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {destinationsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Destinations;
