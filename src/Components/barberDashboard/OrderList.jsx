import * as React from "react";
import PropTypes from "prop-types";
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function createData(id, name, service, date, time) {
  return { id, name, service, date, time };
}

// const rows = [
//   createData(1, "محمدعلی خسروآبادی", "کوتاهی مو", "1403-03-31", "14:00"),
//   createData(2, "کوشا", "رنگ و کوتاهی مو", "1403-04-22", "10:00"),
//   createData(3, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(4, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(5, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(6, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(7, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(8, "قرهاد", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(9, "آتیلا", "کوتاهی و شست و شوی مو", "1403-04-22", "11:00"),
//   createData(10, "مینا", "کوتاهی و شست و شوی مو", "1403-05-22", "9:00"),
//   createData(11, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
//   createData(12, "آتیلا", "کوتاهی و شست و شوی مو", "1403-05-22", "11:00"),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "نام" },
  { id: "service", numeric: false, disablePadding: false, label: "سرویس" },
  { id: "date", numeric: false, disablePadding: false, label: "تاریخ" },
  { id: "time", numeric: false, disablePadding: false, label: "ساعت" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "انتخاب تمام ردیف ها" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  const theme = useTheme();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} انتخاب
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          سفارش‌ها
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function OrderList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("service");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [rows, setRows] = React.useState([]);
  const { barberID } = useParams();

  useEffect(() => {
    console.log("barberID:", barberID);

    if (barberID) {
      axios
        .get(`https://reserveto-back.onrender.com/api/B_orders/${barberID}`)
        .then((response) => {
          console.log("API Response:", response.data);

          if (response.data && response.data.Services) {
            const servicesArray = response.data.Services.map(
              (serviceString) => {
                const cleanedString = serviceString.replace(
                  /\[OrderedDict\(\[\('name',\s*'([^']+)'\)\]\)\]\s*(\S+)/,
                  '{"name": "$1", "datetime": "$2"}'
                );
                let parsedService;
                try {
                  parsedService = JSON.parse(cleanedString);
                  console.log(parsedService);
                } catch (error) {
                  console.error("Error parsing service string:", error);
                  return null;
                }

                return parsedService;
              }
            ).filter((service) => service !== null);

            const formattedData = servicesArray.map((service, index) => {
              const serviceName = service.name || "";
              const [date, time] = service.datetime.split("T");
              return createData(
                index + 1,
                response.data.Name,
                serviceName,
                date,
                time.split(".")[0]
              );
            });

            setRows(formattedData);
          } else {
            console.error("Error: Services data is not an array");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [barberID]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
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
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => setDense(event.target.checked);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <Box display="flex" flexDirection="column">
                        <Typography variant="caption">
                          {headCells[0].label}
                        </Typography>
                        <Typography>{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" flexDirection="column">
                        <Typography variant="caption">
                          {headCells[1].label}
                        </Typography>
                        <Typography>{row.service}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" flexDirection="column">
                        <Typography variant="caption">
                          {headCells[2].label}
                        </Typography>
                        <Typography>{row.date}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">
                      <Box display="flex" flexDirection="column">
                        <Typography variant="caption">
                          {headCells[3].label}
                        </Typography>
                        <Typography>{row.time}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[8, 16, 24]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="تراکم بیشتر"
      />
    </Box>
  );
}
