import React from 'react';
import { Link } from '../routes';
import url from 'url';

export default function Pagination({
  query = {}, // URL params
  firstCursor,
  lastCursor,
  firstCursorOfPage,
  lastCursorOfPage,
}) {
  return (
    <div className="wrapper-pager">
      {firstCursor && firstCursor !== firstCursorOfPage ? (
        <Link
          route={url.format({
            query: { ...query, before: firstCursorOfPage, after: undefined },
          })}
        >
          <a className="btn btn-sm btn-secondary"> &laquo; ย้อนกลับ</a>
        </Link>
      ) : (
        ''
      )}
      {lastCursor && lastCursor !== lastCursorOfPage ? (
        <Link
          route={url.format({
            query: { ...query, after: lastCursorOfPage, before: undefined },
          })}
        >
          <a className="btn btn-sm btn-secondary">ต่อไป &raquo;</a>
        </Link>
      ) : (
        ''
      )}
      <style jsx>{`
        .wrapper-pager { 
          margin: 0.5rem 0;
          text-align: right;
        }
      `}</style>
    </div>
  );
}
