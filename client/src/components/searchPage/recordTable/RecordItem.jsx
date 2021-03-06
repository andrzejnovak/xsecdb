import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sizeMe from 'react-sizeme';
import { discussionLinkColumnName as discussionColumn } from 'Config';

import { isAdmin } from '../../../auth/AuthService';

const style = {
    cell: {
        borderRight: '1px solid #e8e8e8',
        verticalAlign: 'middle',
        textAlign: 'right',
        minWidth: '215px',
        height: '36px'
    }
}

const RecordItem = (props) => {
    const cells = props.columns.reduce((acc, col, i) => {
        //render only visible columns
        if (col.isVisible) {
            //To render discussion column as a clickable link
            let contents;
            if (col.name == discussionColumn) {
                contents = <a href={props.record[col.name]} target="_blank">{props.record[col.name]}</a>;
            } else {
                contents = props.record[col.name];
            }

            acc.push(<td key={i} style={style.cell}>{contents}</td>);
        }
        return acc;
    }, []);

    return (
        <tr>
            {cells}
        </tr>
    )
}

RecordItem.propTypes = {
    //Column information: column name, isVisible
    columns: PropTypes.array.isRequired,
    //xsdb record
    record: PropTypes.object.isRequired
}

//sizeMe make RecordItem component aware of its height
const sizeMeHOC = sizeMe({
    noPlaceholder: true,
    monitorHeight: true,
    monitorWidth: false
})

export default sizeMeHOC(RecordItem);