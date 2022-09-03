import React from 'react';
import { Helmet } from 'react-helmet';
import {
  KanbanComponent,
  ColumnsDirective,
  ColumnDirective,
  DialogFieldsModel,
  CardRenderedEventArgs,
} from '@syncfusion/ej2-react-kanban';

import { kanbanData } from '../data/dummy';
import { Header } from '../components';
import { useTranslation } from 'react-i18next';
import { addClass } from '@syncfusion/ej2-base';

const fields: DialogFieldsModel[] = [
  { text: 'ID', key: 'Title', type: 'TextBox' },
  { key: 'Status', type: 'DropDown' },
  { key: 'Assignee', type: 'DropDown' },
  { key: 'RankId', type: 'TextBox' },
  { key: 'Tags', type: 'DropDown' },
  { key: 'Summary', type: 'TextArea' },
];

const cardRendered = (args: CardRenderedEventArgs): void => {
  const val: string = args.data?.Priority as string;
  addClass([args.element], val);
};

const columnTemplate = (props: { [key: string]: string }): JSX.Element => {
  return (
    <div className="header-template-wrap">
      <div className={'header-icon e-icons ' + props.keyField}></div>
      <div className="header-text">{props.headerText}</div>
    </div>
  );
};

const kanbanGrid = [
  {
    headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true,
    columnTemplate: columnTemplate,
  },

  {
    headerText: 'In Progress',
    keyField: 'InProgress',
    allowToggle: true,
    columnTemplate: columnTemplate,
  },

  {
    headerText: 'Review',
    keyField: 'Review',
    allowToggle: true,
    columnTemplate: columnTemplate,
  },

  {
    headerText: 'Testing',
    keyField: 'Testing',
    allowToggle: true,
    columnTemplate: columnTemplate,
  },

  {
    headerText: 'Done',
    keyField: 'Close',
    allowToggle: true,
    columnTemplate: columnTemplate,
  },
];

const Kanban: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Helmet>
        <title>Kanban</title>
        <meta name="kanban-description" content="Kanban" />
      </Helmet>
      <Header category={t('kanban.app')} title={t('kanban.kanban')} />
      <KanbanComponent
        id="kanban"
        cssClass="kanban-overview"
        dataSource={kanbanData}
        keyField="Status"
        enableTooltip={true}
        swimlaneSettings={{ keyField: 'Assignee' }}
        cardSettings={{
          headerField: 'Id',
          contentField: 'Summary',
          tagsField: 'Tags',
          grabberField: 'Color',
          footerCssField: 'ClassName',
        }}
        dialogSettings={{ fields: fields }}
        cardRendered={cardRendered}
      >
        <ColumnsDirective>
          {kanbanGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
      </KanbanComponent>
    </div>
  );
};

export default Kanban;
