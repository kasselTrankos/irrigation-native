import {taggedSum} from 'daggy';

const Pagination = daggy.taggedSum('Pagination', {
  Pages: [],
  Nil: [],
});