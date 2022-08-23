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
import tourApi from '../services/tourApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Tour } from '../models/Tour';

const Tours: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

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
      field: 'image',
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
      width: '100',
      textAlign: 'Center',
    },

    {
      field: 'description',
      headerText: t('tours.description'),
      width: '120',
      textAlign: 'Center',
    },
  ];

  const getAllTours = async () => {
    const res = await tourApi.getListTours();
    const allTours = res.data.data.edges;
    setData({ result: allTours, count: allTours.length });
  };

  useEffect(() => {
    getAllTours();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllTours();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await tourApi.addTour(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await tourApi.updateTour((state.data as Tour).tourId, state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.requestType === 'delete') {
      // Delete request
      try {
        await tourApi.deleteTour(state.data[0].tourId);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')} title={t('tours.tours')} />
      <GridComponent
        id="tours"
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
          {toursGrid.map((item, index) => (
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

export default Tours;
