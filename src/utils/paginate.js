import _ from 'lodash';

export default function Paginate (items, currentPageNumber, pageSize){
    //items >> movies list
    const startIndex= ( currentPageNumber -1 ) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
}