import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import * as AdminActions from '../../actions/admin-actions'
import Admin from '../admin-container'
import ReportModal from './reportModal'

import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'
import { lighten } from '@material-ui/core/styles/colorManipulator'

import '../Admin.sass'

let counter = 0;
function createData(type, donor, date, open, clear, done, text) {
  counter += 1;
  return { id: counter, type, donor, date, open, clear, done, text };
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnData = [
  { id: 'id', numeric: false, disablePaddin: true, label: 'id' },
  { id: 'type', numeric: false, disablePaddin: true, label: 'type' },
  { id: 'donor', numeric: false, disablePadding: false, label: 'donor' },
  { id: 'date', numeric: false, disablePadding: false, label: 'date' },
  { id: 'open', numeric: false, disablePadding: false, label: 'open' },
  { id: 'clear', numeric: false, disablePadding: false, label: 'clear' },
  { id: 'done', numeric: false, disablePadding: false, label: 'done' },
  { id: 'text', numeric: false, disablePadding: false, label: 'text' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            Admin Reports
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <Icon>delete</Icon>
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <Icon>filter_list</Icon>
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

@connect((store, ownProps) => {
  	return {
    	report: store.adminN.report
  	};
})
class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
	this.props.dispatch(AdminActions.getReport());

    this.state = {
      order: 'asc',
      orderBy: 'id',
      selected: [],
      page: 0,
      rowsPerPage: 5,
      open: false,
      scroll: 'paper',
      modalContent: {}
    };
  }

  handleClickOpen = scroll => {
   	this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: this.props.report.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  openRepost = n => {
  	this.setState({
  		modalContent: n
  	})
  	this.handleClickOpen('paper');
  }

  handleDelete = id => {
  	let newReport = this.props.report.filter(report => report.realId != id)
  	this.props.dispatch(AdminActions.setReport(newReport));
	this.props.dispatch(AdminActions.deleteRepot(id));
  } 

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes} = this.props;
    const data = this.props.report;
    const { order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
    <div>
      <ReportModal
      	open={this.state.open}
      	scroll={this.state.scroll}
      	handleClose={this.handleClose}
      	content={this.state.modalContent}
       />
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {data
                .sort(getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.openRepost()}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} onClick={() => this.handleClick(event, n.id)} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">{n.id}</TableCell>
                      <TableCell numeric>{n.type}</TableCell>
                      <TableCell numeric>{n.donor}</TableCell>
                      <TableCell numeric>{n.date}</TableCell>
                      <TableCell numeric >{(n.open)? <Icon>highlight_off</Icon>: <Icon onClick={() => this.openRepost(n)}>open_in_browser</Icon>}</TableCell>
                      <TableCell numeric>{(n.clear)? 'true': <Icon onClick={() =>this.handleDelete(n.realId)}>delete</Icon>}</TableCell>
                      <TableCell numeric>{(n.done)? 'true': <Icon>done</Icon>}</TableCell>
                      <TableCell numeric>{(n.text).substring(0, 15)} {(n.text.length > 15)? '...': '' }</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(EnhancedTable);