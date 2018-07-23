import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import enums from './enums';


export default function Footer(props) {
  const { nowShowing } = props;
  return (
    <footer className="footer">
      <ul className="filters">
        <li>
          <Link
            to="/all"
            className={
              classNames({
                selected: nowShowing !== enums.ACTIVE_TODOS && nowShowing !== enums.COMPLETED_TODOS,
              })
            }
          >
            All
          </Link>
        </li>
        {' '}
        <li>
          <Link
            to="/active"
            className={classNames({ selected: nowShowing === enums.ACTIVE_TODOS })}
          >
            Active
          </Link>
        </li>
      </ul>
    </footer>
  );
}
