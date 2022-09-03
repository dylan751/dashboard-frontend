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
import reviewApi from '../services/reviewApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Review } from '../models/Review';

const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<any>([]);

  const reviewsGrid = [
    { type: 'checkbox', width: '50' },

    {
      field: 'name',
      headerText: t('reviews.name'),
      width: '100',
      textAlign: 'Center',
    },
    {
      field: 'email',
      headerText: t('reviews.email'),
      width: '150',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'tourId',
      headerText: t('reviews.tourId'),
      width: '80',
      textAlign: 'Center',
    },

    {
      field: 'rating',
      headerText: t('reviews.rating'),
      width: '80',
      textAlign: 'Center',
    },

    {
      field: 'content',
      headerText: t('reviews.content'),
      width: '150',
      textAlign: 'Center',
    },
  ];

  const getAllReviews = async () => {
    const res = await reviewApi.getListReviews();
    const allReviews = res.data.data.edges;
    setData({ result: allReviews, count: allReviews.length });
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  const dataStateChange = (args: any) => {
    if (args.action.action !== 'edit') {
      getAllReviews();
    }
  };

  const dataSourceChanged = async (state: any) => {
    if (state.action === 'add') {
      // Add request
      try {
        await reviewApi.addReview(state.data);
        state.endEdit();
      } catch (err) {
        state.endEdit();
        throw new Error();
      }
    } else if (state.action === 'edit') {
      // Update request
      try {
        await reviewApi.updateReview(
          (state.data as Review).reviewId,
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
        await reviewApi.deleteReview(state.data[0].reviewId);
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
        <title>Reviews</title>
        <meta name="reviews-description" content="Reviews" />
      </Helmet>
      <Header category={t('app.page')} title={t('reviews.reviews')} />
      <GridComponent
        id="reviews"
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
          {reviewsGrid.map((item, index) => (
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

export default Reviews;
