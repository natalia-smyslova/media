// TODO: write code here

import TimelineWidget from './TimelineWidget';
import TimelineTable from './TimelineTable';

const container = document.querySelector('.container');
const table = document.querySelector('.table');

const timeLineWidget = new TimelineWidget(container);

timeLineWidget.bindToDom();

const timelineTable = new TimelineTable(table);

timelineTable.bindToDom();