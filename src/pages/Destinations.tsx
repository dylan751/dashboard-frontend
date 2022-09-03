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

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import destinationApi from '../services/destinationApi';
import { Destination } from '../models/Destination';

const Destinations: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

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
      field: 'image',
      headerText: t('destinations.image'),
      width: '80',
      template: destinationsGridImage,
      textAlign: 'Center',
    },

    {
      field: 'tourId',
      headerText: t('destinations.tourId'),
      width: '80',
      textAlign: 'Center',
      isPrimaryKey: true,
    },

    {
      field: 'tourName',
      headerText: t('destinations.tourName'),
      width: '100',
      textAlign: 'Center',
    },

    {
      field: 'name',
      headerText: t('destinations.name'),
      width: '100',
      textAlign: 'Center',
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
    },
    {
      field: 'content',
      headerText: t('destinations.content'),
      width: '150',
      textAlign: 'Center',
    },
  ];

  const getAllDestinations = async () => {
    const res = await destinationApi.getListDestinations();
    const allDestinations = res.data.data.edges;
    setData({ result: allDestinations, count: allDestinations.length });
  };

  useEffect(() => {
    getAllDestinations();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllDestinations();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await destinationApi.addDestination(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await destinationApi.updateDestination(
          (state.data as Destination).destinationId,
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
        await destinationApi.deleteDestination(state.data[0].destinationId);
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
        <title>Destinations</title>
        <meta name="destinations-description" content="Destinations" />
      </Helmet>
      <Header category={t('app.page')} title={t('destinations.destinations')} />
      <GridComponent
        id="destinations"
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
          {destinationsGrid.map((item, index) => (
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

export default Destinations;
