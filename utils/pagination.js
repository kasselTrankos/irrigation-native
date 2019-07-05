import {compose} from './sanctuary';

const not = value => !value;
const first = () => [Object.assign({}, buildPageObject(1), {text: '«'})];
const previous = page => [Object.assign({}, buildPageObject(--page), {text: '‹'})];
const last = pages  => [Object.assign({}, buildPageObject(pages), {text: '»'})];
const next = page => [Object.assign({}, buildPageObject(++page), {text: '›'})];
const buildPageObject  = page => ({current: page, text: String(page)});
const isLessThan = max => value => value < max; 
const isAtEndPostion  = total => size => page => compose(isLessThan(page), getBegin(size))(total);
const getBegin = size => total => total - size;
const getMaxPages = size => pages => isLessThan(size)(pages) ? pages : size; 
const getCountPages = total => size => limit => pages => pages < size ? pages : getSize(total)(limit);
const getStart = page => size => total => 
[isLessThan(total)(size), isAtEndPostion(total)(size)(page)].every(Boolean) ? total - size + 1 : page;
const getPages  = size => start =>  Array.from({length: size}, (_, i) =>  buildPageObject(start + i));
const getSize = total => limit => Math.ceil(total / limit);
const getCountPagination = total => size => limit => compose(getMaxPages(size), getSize(total))(limit);


const gotPaginationLeft = pages => size => page => 
  [pages > size, page > 1].every(Boolean);

const gotPaginationRight = pages => size => page =>
  [pages > size, compose(not, isAtEndPostion(pages)(size))(page)].every(Boolean);

const getPaginationLeft = pages => size => page => 
  gotPaginationLeft(pages)(size)(page) ? [].concat(first(), previous(page)) : [];

const getPaginationRight = pages => size => page => 
  gotPaginationRight(pages)(size)(page) ? [].concat(next(page), last(pages)) : [];

const getPagination = (total = 0) => (size = 6) => (limit = 14) => (page = 1) => {
  const pagination = getCountPagination(total)(size)(limit);
  const pages = getCountPages(total)(size)(limit)(pagination);
  return [].concat(
    getPaginationLeft(pages)(size)(page),
    compose(compose(getPages(pagination), getStart(page)(size)), getSize(total))(limit), 
    getPaginationRight(pages)(size)(page)
  );
}



export {getPagination};
