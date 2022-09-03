import React from 'react';
import { Helmet } from 'react-helmet';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';

import { scheduleData } from '../data/dummy';
import { Header } from '../components';
import { useTranslation } from 'react-i18next';

const Calendar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Helmet>
        <title>Calendar</title>
        <meta name="calendar-description" content="Calendar" />
      </Helmet>
      <Header category={t('app.app')} title={t('calendar.calendar')} />
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date(2022, 0, 10)}
      >
        <Inject
          services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
