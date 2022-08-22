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
import reviewApi from '../services/reviewApi';

import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { Review } from '../models/Review';

const Reviews: React.FC = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<Review[]>([]);

  const reviewsGrid = [
    { type: 'checkbox', width: '50' },

    {
      field: 'userId',
      headerText: t('reviews.userId'),
      width: '120',
      textAlign: 'Center',
      isPrimaryKey: true,
    },
    {
      field: 'name',
      headerText: t('reviews.name'),
      width: '120',
      textAlign: 'Center',
    },
    {
      field: 'email',
      headerText: t('reviews.email'),
      width: '100',
      textAlign: 'Center',
      format: 'yMd',
    },

    {
      field: 'tourId',
      headerText: t('reviews.tourId'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'rating',
      headerText: t('reviews.rating'),
      width: '120',
      textAlign: 'Center',
    },

    {
      field: 'content',
      headerText: t('reviews.content'),
      width: '120',
      textAlign: 'Center',
    },
  ];

  useEffect(() => {
    const getAllReviews = async () => {
      const res = await reviewApi.getListReviews();
      const allReviews = res.data.data.edges;
      setReviews(allReviews);
    };

    getAllReviews();
  }, []);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t('app.page')}title={t('reviews.reviews')}/>
      <GridComponent
        dataSource={reviews}
        allowPaging={true}
        allowSorting={true}
        toolbar={['Delete']}
        editSettings={{ allowDeleting: true, allowEditing: true }}
        width="auto"
      >
        <ColumnsDirective>
          {reviewsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}></ColumnDirective>
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
      </GridComponent>
    </div>
  );
};

export default Reviews;
